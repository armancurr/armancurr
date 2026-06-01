import { PageFrame } from "../components/page-frame";

export function NotFoundPage() {
  return (
    <PageFrame>
      <div class="flex min-h-[520px] flex-1 items-center justify-center p-8 text-center md:min-h-[660px]">
        <div>
          <h1 class="mt-4 text-xl font-light tracking-wide text-white sm:text-2xl">
            Nothing here, but you can always <kbd>ctrl+,</kbd>
          </h1>
        </div>
      </div>
    </PageFrame>
  );
}
