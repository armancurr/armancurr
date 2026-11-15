import { Plate } from "../components/plate";

export function NotFoundPage() {
  return (
    <Plate>
      <h1 class="label">Nothing here</h1>
      <p class="body">
        This page was never drawn. <a href="/">Return home</a>.
      </p>
    </Plate>
  );
}
