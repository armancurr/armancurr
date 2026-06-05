import {
  Cat as CatIcon,
  CaretDown,
  CaretRight,
  File,
  FolderSimple,
  GitCommit as GitCommitIcon,
  GitPullRequest as GitPullRequestIcon,
  GlobeSimple as GlobeSimpleIcon,
} from "phosphor-solid";
import { createEffect, createSignal, For, Show, type JSX } from "solid-js";

import { PageFrame } from "../components/page-frame";
import type { ProjectConfig } from "../config/projects";
import {
  fetchCommits,
  fetchRepo,
  fetchTree,
  type GitHubCommit,
  type GitHubRepo,
  type GitHubTreeItem,
} from "../lib/github";

type RepoTab = "commits" | "pulls";
type LoadState = "loading" | "ready" | "error";

type TreeNode = {
  name: string;
  path: string;
  type: "blob" | "tree";
  size?: number;
  children: TreeNode[];
};

interface ProjectRepoPageProps {
  project: ProjectConfig;
}

export function ProjectRepoPage(props: ProjectRepoPageProps) {
  const [repo, setRepo] = createSignal<GitHubRepo | null>(null);
  const [tree, setTree] = createSignal<GitHubTreeItem[]>([]);
  const [commits, setCommits] = createSignal<GitHubCommit[]>([]);
  const [expandedFolders, setExpandedFolders] = createSignal(new Set<string>([""]));
  const [activeTab, setActiveTab] = createSignal<RepoTab>("commits");
  const [state, setState] = createSignal<LoadState>("loading");
  const [error, setError] = createSignal("");

  createEffect(() => {
    const project = props.project;

    setState("ready");
    setError("");
    setCommits([]);
    setActiveTab("commits");

    void fetchRepo(project)
      .then((repoData) => {
        const branch = repoData.default_branch || project.branch;
        setRepo(repoData);

        void fetchCommits(project, branch)
          .then(setCommits)
          .catch(() => undefined);

        if (branch !== project.branch) {
          void fetchTree(project, branch)
            .then(setTree)
            .catch(() => undefined);
        }
      })
      .catch((caught: Error) => {
        setError(caught.message || "Could not load GitHub repository data.");
      });

    void fetchTree(project, project.branch)
      .then((treeData) => {
        setTree(treeData);
        setExpandedFolders(new Set(["", ...getInitialFolders(project.defaultFile)]));
      })
      .catch(() => undefined);
  });

  const rootNode = () => buildTree(tree());

  const toggleFolder = (path: string) => {
    setExpandedFolders((current) => {
      const next = new Set(current);

      if (next.has(path)) next.delete(path);
      else next.add(path);

      return next;
    });
  };

  return (
    <PageFrame>
      <div class="flex h-[min(660px,calc(100vh-10rem))] min-h-[420px] flex-col overflow-hidden sm:h-[min(660px,calc(100vh-14rem))]">
        <Show
          when={state() === "ready"}
          fallback={<RepoFallback state={state()} error={error()} />}
        >
          <header class="px-5 pt-5 pb-3 sm:px-7">
            <div class="min-w-0">
              <div class="text-foreground flex items-center gap-2">
                <ProjectIcon project={props.project} />
                <CaretRight class="text-[var(--text-muted)]" size={18} weight="fill" />
                <h1 class="text-xl leading-none font-semibold sm:text-2xl">{props.project.name}</h1>
              </div>
              <div class="mt-3 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div class="min-w-0 text-sm leading-relaxed text-[var(--text-subtle)] sm:text-base">
                  <p>{repo()?.description || "Live repository data from GitHub."}</p>
                </div>
                <nav class="flex shrink-0 gap-1 sm:-mt-1" aria-label="Repository links">
                  <a
                    href={`https://${props.project.slug}.vercel.app`}
                    class="hover:text-foreground px-4 py-2 text-sm text-[var(--text-muted)]"
                    rel="noreferrer"
                    target="_blank"
                    aria-label={`Open ${props.project.name} live site`}
                  >
                    <GlobeSimpleIcon size={18} weight="fill" />
                  </a>
                  <TabButton
                    active={activeTab() === "commits"}
                    onClick={() => setActiveTab("commits")}
                  >
                    <GitCommitIcon size={18} weight="fill" />
                  </TabButton>
                  <TabButton active={false} disabled onClick={() => undefined}>
                    <GitPullRequestIcon size={18} weight="fill" />
                  </TabButton>
                </nav>
              </div>
            </div>
          </header>

          <main class="grid min-h-0 flex-1 grid-cols-1 gap-y-8 overflow-hidden lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-x-16 lg:gap-y-0 xl:gap-x-24">
            <aside class="min-h-0 overflow-auto">
              <div class="px-3 pt-4 pb-2 sm:px-5">
                <h2 class="px-2 pb-3 text-xs font-medium tracking-wide text-[var(--text-muted)] uppercase">
                  Files
                </h2>
                <For each={rootNode().children}>
                  {(node) => (
                    <TreeRow
                      node={node}
                      depth={0}
                      expandedFolders={expandedFolders()}
                      onFolderToggle={toggleFolder}
                    />
                  )}
                </For>
              </div>
            </aside>

            <section class="min-h-0 min-w-0 overflow-auto">
              <Show when={activeTab() === "commits"}>
                <CommitsView commits={commits()} />
              </Show>
            </section>
          </main>
        </Show>
      </div>
    </PageFrame>
  );
}

function RepoFallback(props: { state: LoadState; error: string }) {
  return (
    <div class="grid min-h-[660px] place-items-center px-6 text-center">
      <div>
        <p class="text-sm text-[var(--text-muted)]">
          {props.state === "loading" ? "loading github repo" : "github unavailable"}
        </p>
        <p class="mt-4 max-w-md text-lg text-[var(--text-subtle)]">
          {props.state === "loading"
            ? "Fetching live repository metadata, files, commits, and pull requests."
            : props.error}
        </p>
      </div>
    </div>
  );
}

function ProjectIcon(props: { project: ProjectConfig }) {
  if (props.project.slug === "townbase") {
    return <CatIcon class="shrink-0" size={32} color="currentColor" weight="fill" />;
  }

  return (
    <svg
      class="shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm4,104a12,12,0,1,1,12-12A12,12,0,0,1,132,128Zm20-36a12,12,0,1,1,12,12A12,12,0,0,1,152,92Zm20,52a12,12,0,1,1,12-12A12,12,0,0,1,172,144Z" />
    </svg>
  );
}

function TabButton(props: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: JSX.Element;
}) {
  return (
    <button
      type="button"
      class={`relative px-4 py-2 text-sm ${
        props.active
          ? "text-foreground after:bg-foreground after:absolute after:right-3 after:bottom-0 after:left-3 after:h-px"
          : "hover:text-foreground text-[var(--text-muted)] disabled:pointer-events-none disabled:opacity-40"
      }`}
      disabled={props.disabled}
      onClick={props.onClick}
      aria-label={props.disabled ? "Pull requests unavailable" : "Commits"}
    >
      {props.children}
    </button>
  );
}

function TreeRow(props: {
  node: TreeNode;
  depth: number;
  expandedFolders: Set<string>;
  onFolderToggle: (path: string) => void;
}) {
  const isFolder = () => props.node.type === "tree";
  const isExpanded = () => props.expandedFolders.has(props.node.path);

  return (
    <div>
      <button
        type="button"
        class="flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm text-[var(--text-subtle)] hover:bg-[var(--hover-surface)]"
        style={{ "padding-left": `${props.depth * 14 + 8}px` }}
        onClick={() => {
          if (isFolder()) props.onFolderToggle(props.node.path);
        }}
      >
        <Show when={isFolder()} fallback={<span class="w-3.5 shrink-0" />}>
          <Show when={isExpanded()} fallback={<CaretRight size={14} />}>
            <CaretDown size={14} />
          </Show>
        </Show>
        <Show when={isFolder()} fallback={<File size={14} weight="fill" />}>
          <FolderSimple size={14} weight="fill" />
        </Show>
        <span class="truncate">{props.node.name}</span>
      </button>
      <Show when={isFolder() && isExpanded()}>
        <For each={props.node.children}>
          {(child) => (
            <TreeRow
              node={child}
              depth={props.depth + 1}
              expandedFolders={props.expandedFolders}
              onFolderToggle={props.onFolderToggle}
            />
          )}
        </For>
      </Show>
    </div>
  );
}

function CommitsView(props: { commits: GitHubCommit[] }) {
  return (
    <article class="px-3 pt-4 pb-5 sm:px-5 sm:pt-4 sm:pb-7">
      <h2 class="px-2 pb-3 text-xs font-medium tracking-wide text-[var(--text-muted)] uppercase">
        Commits
      </h2>
      <Show when={props.commits.length} fallback={<EmptyState message="No commits loaded yet." />}>
        <div>
          <For each={props.commits}>
            {(commit) => (
              <a
                href={commit.html_url}
                class="group block px-2 py-4"
                rel="noreferrer"
                target="_blank"
              >
                <p class="text-foreground truncate text-sm group-hover:text-[var(--text-subtle)]">
                  {commit.commit.message.split("\n")[0]}
                </p>
                <p class="mt-2 text-sm text-[var(--text-muted)] group-hover:text-[var(--text-subtle)]">
                  {commit.commit.author.name} / {formatRelativeDate(commit.commit.author.date)} /{" "}
                  {commit.sha.slice(0, 7)}
                </p>
              </a>
            )}
          </For>
        </div>
      </Show>
    </article>
  );
}

function EmptyState(props: { message: string }) {
  return <p class="p-4 text-sm text-[var(--text-muted)]">{props.message}</p>;
}

function buildTree(items: GitHubTreeItem[]): TreeNode {
  const root: TreeNode = { name: "", path: "", type: "tree", children: [] };

  for (const item of items) {
    const parts = item.path.split("/");
    let current = root;

    parts.forEach((part, index) => {
      const path = parts.slice(0, index + 1).join("/");
      const isLast = index === parts.length - 1;
      let child = current.children.find((node) => node.name === part);

      if (!child) {
        child = {
          name: part,
          path,
          type: isLast ? item.type : "tree",
          size: isLast ? item.size : undefined,
          children: [],
        };
        current.children.push(child);
        current.children.sort(sortTreeNodes);
      }

      current = child;
    });
  }

  return root;
}

function sortTreeNodes(a: TreeNode, b: TreeNode) {
  if (a.type !== b.type) return a.type === "tree" ? -1 : 1;

  return a.name.localeCompare(b.name);
}

function getInitialFolders(path: string): string[] {
  const parts = path.split("/");

  return parts.slice(0, -1).map((_, index) => parts.slice(0, index + 1).join("/"));
}

function formatRelativeDate(value: string): string {
  if (!value) return "recently";

  const diff = Date.now() - new Date(value).getTime();
  const day = 1000 * 60 * 60 * 24;

  if (diff < day) return "today";
  if (diff < day * 7) return `${Math.floor(diff / day)}d ago`;
  if (diff < day * 30) return `${Math.floor(diff / (day * 7))}w ago`;
  if (diff < day * 365) return `${Math.floor(diff / (day * 30))}mo ago`;

  return `${Math.floor(diff / (day * 365))}y ago`;
}
