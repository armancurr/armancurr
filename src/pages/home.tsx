import { About } from "../components/about";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Work } from "../components/work";

interface HomePageProps {
  onPress: () => void;
}

export function HomePage(props: HomePageProps) {
  return (
    <div class="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <h1 class="sr-only">Arman Kar, Software Developer</h1>
      <About onPress={props.onPress} />
      <Work onPress={props.onPress} />
      <Footer />
    </div>
  );
}
