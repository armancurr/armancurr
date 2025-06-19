import {
  ArrowRight,
  TwitterLogo,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  DownloadSimple,
} from "@phosphor-icons/react";
import LocationMap from "./location-map";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProjectPreviewCard = ({ project, onClick }) => (
  <div
    className="bg-[#C0C9EE] p-2 rounded-xl space-y-3 transition-colors cursor-pointer flex-shrink-0 w-96"
    onClick={() => onClick(project)}
  >
    <img
      src={project.imageUrl}
      alt={`${project.title} preview`}
      className="w-full aspect-video object-cover rounded-lg border border-zinc-800"
    />
  </div>
);

export default function Home({ setActiveTab }) {
  const projectData = [
    {
      id: 1,
      title: "Sumanize",
      projectType: "Product design, Icon design",
      imageUrl: "/sumanize-app.png",
    },
    {
      id: 2,
      title: "File Converter",
      projectType: "Visual design, Branding",
      imageUrl: "/file-converter.png",
    },
    {
      id: 2,
      title: "Typepot",
      projectType: "Visual design, Branding",
      imageUrl: "/typepoo.png",
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
    <TooltipProvider>
      <div className="p-6 bg-[#FFF2E0] border-4 border-[#C0C9EE] rounded-3xl flex flex-col flex-grow">
        <div className="mb-6">
          <div className="bg-[#898AC4] border-4 border-[#C0C9EE] rounded-2xl p-4 max-w-xl mx-auto w-full">
            <div className="p-2 w-full h-48">
              <LocationMap />
            </div>
            <div className="flex justify-center mb-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setActiveTab("contact")}
                    variant="secondary"
                    className="flex items-center gap-2 bg-[#DC5F00] text-[#EEEEEE] text-sm py-2 px-4 rounded-lg cursor-pointer hover:bg-[#DC5F00]"
                    aria-label="Download Resume"
                  >
                    <DownloadSimple size={16} />
                    Resume
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-[#686D76] text-[#EEEEEE]"
                >
                  Download Resume
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex flex-col items-center text-center gap-4 w-full">
              <h1 className="text-3xl font-bold">
                {/* Hey, I'm Arman 👋 */}
                {/* <span className="text-md text-zinc-400"><br/>(urrman)</span> */}
              </h1>
              <p className="text-[#FFF2E0] max-w-md">
                I'm a full-stack developer and a software enginnering student. I
                like to build blazing fast tools and products.
              </p>
              <div className="flex items-center justify-center gap-2 mt-2 mb-2">
                <a
                  href="#"
                  className="p-2 bg-[#C0C9EE] rounded-full hover:bg-[#373A40]"
                >
                  <TwitterLogo size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-[#C0C9EE] rounded-full hover:bg-[#373A40]"
                >
                  <GithubLogo size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-[#C0C9EE] rounded-full hover:bg-[#373A40]"
                >
                  <LinkedinLogo size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-[#C0C9EE] rounded-full hover:bg-[#373A40]"
                >
                  <EnvelopeSimple size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Projects */}
        <div className="">
          <div className="bg-[#898AC4] border-4 border-[#C0C9EE] rounded-2xl p-4 shadow-lg max-w-xl mx-auto w-full">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-[#FFF2E0]">
                  Recent Projects
                </h2>
                <button
                  onClick={() => setActiveTab("projects")}
                  className="text-sm text-[#FFF2E0] hover:text-[#373A40] transition-colors flex items-center gap-1"
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
          </div>
        </div>

        <div className="flex-grow"></div>
      </div>
    </TooltipProvider>
  );
}
