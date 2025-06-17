import {
  ArrowRight,
  TwitterLogo,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import LocationMap from "./location-map";

const ProjectPreviewCard = ({ project, onClick }) => (
  <div
    className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 space-y-3 hover:bg-zinc-800 transition-colors cursor-pointer flex-shrink-0 w-56"
    onClick={() => onClick(project)}
  >
    <img
      src={project.imageUrl}
      alt={`${project.title} preview`}
      className="w-full aspect-square object-cover rounded-lg border border-zinc-800"
    />
  </div>
);

export default function Home({ setActiveTab }) {
  const projectData = [
    {
      id: 1,
      title: "Rectangle",
      projectType: "Product design, Icon design",
      imageUrl: "/sumanize.png", // Placeholder image
    },
    {
      id: 2,
      title: "Morva labs",
      projectType: "Visual design, Branding",
      imageUrl: "/cometerm.png", // Placeholder image
    },
    {
      id: 3,
      title: "Flowkit",
      projectType: "Design System, UI Kit",
      imageUrl: "/sumanize.png", // Placeholder image
    },
    {
      id: 4,
      title: "Portfolio",
      projectType: "Web Development",
      imageUrl: "/file.png", // Placeholder image
    },
    {
      id: 5,
      title: "E-commerce",
      projectType: "Full Stack Development",
      imageUrl: "/cometerm.png", // Placeholder image
    },
  ];

  // Handle project click - navigate to projects tab and scroll to specific project
  const handleProjectClick = (project) => {
    try {
      // Store the project ID in sessionStorage so the Projects component can scroll to it
      sessionStorage.setItem("scrollToProject", project.id.toString());
      setActiveTab("projects");
    } catch (error) {
      // If sessionStorage is not available, still navigate to projects tab
      console.log("SessionStorage not available:", error);
      setActiveTab("projects");
    }
  };

  // Create duplicated array for infinite scroll effect
  const duplicatedProjects = [...projectData, ...projectData];

  return (
    // Added flex-grow and flex-col to make this card fill the available space
    <div className="p-4 bg-nord-1000 rounded-2xl border border-nord-950 flex flex-col flex-grow">
      {/* --- Intro & About Section --- */}
      <div className="mb-8">
        {/* --- Location Map Section --- */}
        <div className="mb-6">
          <LocationMap />
        </div>

        {/* --- Centered About Me section --- */}
        <div className="flex flex-col items-center justify-center text-center gap-4 mt-4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-white">
              {/* Hey, I'm Arman 👋
              <span className="text-md text-zinc-400">
                <br />
                (urrman)
              </span> */}
            </h1>
            <p className="mt-4 text-zinc-400 max-w-md">
              I'm a full-stack developer and a software enginnering student. I
              like to build blazing fast tools and products.
            </p>
            {/* --- Social Links --- */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <a
                href="#"
                className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700"
              >
                <TwitterLogo size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700"
              >
                <GithubLogo size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700"
              >
                <LinkedinLogo size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700"
              >
                <EnvelopeSimple size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- Project Preview Section --- */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-white">
            <span className="text-zinc-500 mr-2">●</span>
            Projects
          </h2>
          <button
            onClick={() => setActiveTab("projects")}
            className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
          >
            View All <ArrowRight size={14} />
          </button>
        </div>

        {/* Infinite Scrolling Carousel */}
        <div className="relative overflow-hidden carousel-container">
          <div className="gap-4 project-carousel">
            {duplicatedProjects.map((project, index) => (
              <ProjectPreviewCard
                key={`${project.id}-${index}`}
                project={project}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* This spacer will grow and push content to fill remaining space */}
      <div className="flex-grow"></div>
    </div>
  );
}
