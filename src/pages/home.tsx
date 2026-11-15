import { Divider, Plate } from "../components/plate";

const experience = {
  title: "Full-Stack Engineer",
  company: "OneSol AI Labs",
  companyUrl: "https://onesol.in",
  period: "Dec 2025 — Present",
  description:
    "Built a hiring tool to rethink how teams discover, evaluate, and move candidates through the process. Focused on practical product flows, reliable interfaces, and the systems behind them.",
};

export function HomePage() {
  return (
    <Plate caption="‘Arman Kar’   ·   MMXXVI   ·   1/1">
      <h1 class="sr-only">Arman Kar, Software Developer</h1>

      <section aria-labelledby="about">
        <h2 id="about" class="label">
          About me
        </h2>
        <p class="aside">A little about how I build.</p>
        <p class="body">
          I’m Arman Kar, a software developer. I thrive on building clear, practical interfaces at
          the application layer where humans meet software. Most of my work is on the frontend,
          shaping how products behave rather than just how they look.
        </p>
        <p class="body">
          Here are my most active socials. View my work on{" "}
          <a href="https://github.com/armancurr" rel="noreferrer" target="_blank">
            GitHub
          </a>{" "}
          and follow me on{" "}
          <a href="https://twitter.com/rrucnamra" rel="noreferrer" target="_blank">
            Twitter
          </a>
          .
        </p>
      </section>

      <Divider />

      <section aria-labelledby="experience">
        <h2 id="experience" class="label">
          Experience
        </h2>
        <p class="aside">Places I’ve worked and products I’ve helped shape.</p>
        <h3 class="role">{experience.title}</h3>
        <p class="meta">
          <a href={experience.companyUrl} rel="noreferrer" target="_blank">
            {experience.company}
          </a>
          <span aria-hidden="true">◆</span>
          <span>{experience.period}</span>
        </p>
        <p class="body">{experience.description}</p>
      </section>
    </Plate>
  );
}
