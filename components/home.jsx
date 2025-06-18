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
      imageUrl: "/sumanize.png",
    },
    {
      id: 2,
      title: "Morva labs",
      projectType: "Visual design, Branding",
      imageUrl: "/cometerm.png",
    },
    {
      id: 3,
      title: "Flowkit",
      projectType: "Design System, UI Kit",
      imageUrl: "/sumanize.png",
    },
    {
      id: 4,
      title: "Portfolio",
      projectType: "Web Development",
      imageUrl: "/file.png",
    },
    {
      id: 5,
      title: "E-commerce",
      projectType: "Full Stack Development",
      imageUrl: "/cometerm.png",
    },
  ];

  const handleProjectClick = (project) => {
    try {
      sessionStorage.setItem("scrollToProject", project.id.toString());
      setActiveTab("projects");
    } catch (error) {
      console.log("SessionStorage not available:", error);
      setActiveTab("projects");
    }
  };

  const duplicatedProjects = [...projectData, ...projectData];

  return (
    <div className="p-4 bg-[#373A40] rounded-2xl flex flex-col flex-grow">
      {/* Card for Map, Description, and Socials */}
      <div className="mb-4">
        <div className="bg-[#EEEEEE] rounded-xl p-4 shadow-lg max-w-xl mx-auto w-full">
          {/* Map */}
          <div className="mb-20 w-full h-48">
            <LocationMap />
          </div>
          {/* Description and Socials */}
          <div className="flex flex-col items-center text-center gap-4 mt-4 w-full">
            <h1 className="text-3xl font-bold">
              {/* Hey, I'm Arman 👋
              <span className="text-md text-zinc-400">
                <br />
                (urrman)
              </span> */}
            </h1>
            <p className="mt-4 text-[#373A40] max-w-md">
              I'm a full-stack developer and a software enginnering student. I
              like to build blazing fast tools and products.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <a
                href="#"
                className="p-2 bg-[#686D76] rounded-full hover:bg-[#373A40]"
              >
                <TwitterLogo size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-[#686D76] rounded-full hover:bg-[#373A40]"
              >
                <GithubLogo size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-[#686D76] rounded-full hover:bg-[#373A40]"
              >
                <LinkedinLogo size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-[#686D76] rounded-full hover:bg-[#373A40]"
              >
                <EnvelopeSimple size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
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

      <div className="flex-grow"></div>
    </div>
  );
}