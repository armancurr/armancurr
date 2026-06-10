import type { ProjectConfig } from "../config/projects";

const githubApiBase = "https://api.github.com";
const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
const requestTimeoutMs = 8000;

export const githubCacheTimes = {
  commits: 1000 * 60 * 2,
} as const;

export const githubQueryKeys = {
  commits: (project: ProjectConfig, branch: string) => [
    "github",
    "commits",
    project.owner,
    project.repo,
    branch,
  ],
} as const;

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

export class GitHubApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GitHubApiError";
    this.status = status;
  }
}

async function requestGitHub<T>(path: string, signal?: AbortSignal): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), requestTimeoutMs);
  const abortRequest = () => controller.abort();
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (githubToken) {
    headers.Authorization = `Bearer ${githubToken}`;
  }

  signal?.addEventListener("abort", abortRequest, { once: true });

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
    signal?.removeEventListener("abort", abortRequest);
    window.clearTimeout(timeout);
  }
}

export function fetchCommits(project: ProjectConfig, branch: string, signal?: AbortSignal) {
  return requestGitHub<GitHubCommit[]>(
    `/repos/${project.owner}/${project.repo}/commits?sha=${branch}&per_page=10`,
    signal,
  );
}
