import { PageFrame } from "../components/page-frame";

export function NotFoundPage() {
  return (
    <PageFrame>
      <div class="flex min-h-[520px] flex-1 items-center justify-center p-8 text-center md:min-h-[660px]">
        <div>
          <h1 class="text-foreground mt-4 text-xl font-normal tracking-wide sm:text-2xl">
            Nothing here.{" "}
            <a href="/" class="underline underline-offset-4 hover:opacity-70">
              Go home
            </a>
          </h1>
        </div>
      </div>
    </PageFrame>
  );
}
