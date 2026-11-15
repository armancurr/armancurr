import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";

export default function App() {
  return window.location.pathname === "/" ? <HomePage /> : <NotFoundPage />;
}
