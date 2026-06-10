import { useQuery } from "@tanstack/solid-query";
import { CaretRight, Cat as CatIcon, GitCommit as GitCommitIcon } from "phosphor-solid";
import { For, Show } from "solid-js";

import { getProjectBySlug } from "../config/projects";
import { fetchCommits, githubCacheTimes, githubQueryKeys } from "../lib/github";

type InteractiveProps = {
  onPress: () => void;
};

const project = {
  ...getProjectBySlug("townbase")!,
  description:
    "Turn your internet identity into a town with profiles, links, and personal landmarks in one place.",
};

export function Project1(props: InteractiveProps) {
  const commitsQuery = useQuery(() => ({
    queryKey: githubQueryKeys.commits(project, project.branch),
    queryFn: ({ signal }) => fetchCommits(project, project.branch, signal),
    staleTime: githubCacheTimes.commits,
  }));
  const commits = () => commitsQuery.data?.slice(0, 6) ?? [];

  return (
    <section class="relative w-full">
      <div
        id="project-1"
        class="border-border bg-background relative mx-auto grid w-full max-w-6xl content-center border-x border-b px-8 py-14 sm:px-12 md:h-[min(66vw,660px)] md:min-h-[360px] md:px-16 md:py-0"
        onPointerDown={props.onPress}
      >
        <span
          aria-hidden="true"
          class="bg-border pointer-events-none absolute bottom-[-1px] left-1/2 h-px w-screen -translate-x-1/2"
        />
        <span aria-hidden="true" class="pointer-events-none absolute bottom-0 left-0 z-10">
          <span class="absolute bottom-[-1px] left-[-1px] h-px w-2 bg-[var(--corner)]" />
          <span class="absolute bottom-[-8px] left-[-1px] h-4 w-px bg-[var(--corner)]" />
        </span>
        <span aria-hidden="true" class="pointer-events-none absolute right-0 bottom-0 z-10">
          <span class="absolute right-[-1px] bottom-[-1px] h-px w-2 bg-[var(--corner)]" />
          <span class="absolute right-[-1px] bottom-[-8px] h-4 w-px bg-[var(--corner)]" />
        </span>
        <div class="mx-auto max-w-xl">
          <div>
            <div>
              <a
                href={project.githubUrl}
                class="text-foreground flex w-fit items-center gap-2 hover:text-[var(--text-subtle)]"
                rel="noreferrer"
                target="_blank"
                aria-label={`Open ${project.name} repository on GitHub`}
              >
                <CatIcon size={32} color="currentColor" weight="fill" />
                <CaretRight class="text-[var(--text-muted)]" size={18} weight="fill" />
                <h2 class="text-xl leading-none font-semibold sm:text-2xl">{project.name}</h2>
              </a>
              <p class="mt-6 text-left text-lg leading-relaxed text-[var(--text-subtle)] sm:text-xl md:text-justify">
                {project.description}
              </p>
            </div>
            <Show when={commits().length}>
              <div class="mt-8 overflow-hidden sm:mt-10">
                <div class="space-y-2">
                  <For each={commits()}>
                    {(commit) => (
                      <a
                        href={commit.html_url}
                        class="group hover:text-foreground grid min-w-0 grid-cols-[16px_minmax(0,1fr)] items-center gap-2 text-sm text-[var(--text-subtle)]"
                        rel="noreferrer"
                        target="_blank"
                      >
                        <GitCommitIcon
                          class="group-hover:text-foreground text-[var(--text-muted)]"
                          size={15}
                          weight="fill"
                        />
                        <span class="truncate">{commit.commit.message.split("\n")[0]}</span>
                      </a>
                    )}
                  </For>
                </div>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </section>
  );
}
