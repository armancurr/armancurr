import type { ProjectConfig } from "../config/projects";

const githubApiBase = "https://api.github.com";
const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
const requestTimeoutMs = 8000;

export type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  default_branch: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
};

export type GitHubTreeItem = {
  path: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
};

export type GitHubCommit = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
};

export type GitHubPullRequest = {
  number: number;
  state: "open" | "closed";
  title: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  user: {
    login: string;
  } | null;
};

export class GitHubApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GitHubApiError";
    this.status = status;
  }
}

async function requestGitHub<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), requestTimeoutMs);
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (githubToken) {
    headers.Authorization = `Bearer ${githubToken}`;
  }

  try {
    const response = await fetch(`${githubApiBase}${path}`, {
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      const isRateLimited =
        response.status === 403 && response.headers.get("x-ratelimit-remaining") === "0";
      const message = isRateLimited
        ? "GitHub rate limit reached. Add a GitHub token or try again later."
        : response.status === 401
          ? "GitHub authentication failed. Check your GitHub token."
          : `GitHub request failed with status ${response.status}.`;

      throw new GitHubApiError(message, response.status);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new GitHubApiError("GitHub request timed out.", 408);
    }

    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export function fetchRepo(project: ProjectConfig) {
  return requestGitHub<GitHubRepo>(`/repos/${project.owner}/${project.repo}`);
}

export async function fetchTree(project: ProjectConfig, branch: string) {
  const data = await requestGitHub<{ tree: GitHubTreeItem[] }>(
    `/repos/${project.owner}/${project.repo}/git/trees/${branch}?recursive=1`,
  );

  return data.tree.filter((item) => !isIgnoredPath(item.path));
}

export function fetchCommits(project: ProjectConfig, branch: string) {
  return requestGitHub<GitHubCommit[]>(
    `/repos/${project.owner}/${project.repo}/commits?sha=${branch}&per_page=10`,
  );
}

export function fetchPullRequests(project: ProjectConfig, state: "open" | "closed") {
  return requestGitHub<GitHubPullRequest[]>(
    `/repos/${project.owner}/${project.repo}/pulls?state=${state}&per_page=10`,
  );
}

function isIgnoredPath(path: string): boolean {
  const segments = path.split("/");
  const ignoredSegments = new Set(["node_modules", ".next", "dist", "build", ".git"]);
  const ignoredFiles = new Set(["bun.lock", "package-lock.json", "pnpm-lock.yaml", "yarn.lock"]);

  return segments.some((segment) => ignoredSegments.has(segment)) || ignoredFiles.has(path);
}
