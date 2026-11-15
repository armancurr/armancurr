/* @refresh reload */
import "./index.css";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { render } from "solid-js/web";
import "solid-devtools";

import App from "./App";

inject();
injectSpeedInsights();

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error("Root element not found.");
}

render(() => <App />, root!);
