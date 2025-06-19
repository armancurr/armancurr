import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

const ProjectDetailCard = ({ project, projectRef }) => (
  <div
    ref={projectRef}
    className="p-6 bg-[#A2AADB] border-4 border-[#C0C9EE] rounded-2xl space-y-6 flex-shrink-0"
  >
    <p className="text-[#373A40]">{project.longDescription}</p>
    <a
      href={project.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-zinc-800 text-white text-sm py-2 px-4 rounded-lg hover:bg-zinc-700 transition-colors"
    >
      Visit Website <ArrowRight size={14} />
    </a>

    {/* --- Screenshot --- */}
    <div>
      <img
        src={project.imageUrl}
        alt={`screenshot`}
        className="w-full aspect-video object-cover rounded-lg"
      />
    </div>
  </div>
);

export default function Projects() {
  const projectRefs = useRef({});

  // The data is now more detailed to populate the new card and matches home component.
  const projectData = [
    {
      id: 1,
      title: "Sumanize",
      projectType: "Product design, Icon design",
      imageUrl: "/sumanize-app.png",
      longDescription: "A product design and icon design project for Sumanize.",
      websiteUrl: "#",
    },
    {
      id: 2,
      title: "File Converter",
      projectType: "Visual design, Branding",
      imageUrl: "/file-converter.png",
      longDescription:
        "A visual design and branding project for File Converter.",
      websiteUrl: "#",
    },
    {
      id: 3,
      title: "Typepot",
      projectType: "Visual design, Branding",
      imageUrl: "/typepoo.png",
      longDescription: "A visual design and branding project for Typepot.",
      websiteUrl: "#",
    },
  ];

  // Handle scrolling to specific project when navigated from home
  useEffect(() => {
    try {
      const scrollToProjectId = sessionStorage.getItem("scrollToProject");
      if (scrollToProjectId) {
        // Clear the session storage
        sessionStorage.removeItem("scrollToProject");

        // Wait for the component to render, then scroll
        setTimeout(() => {
          const projectRef = projectRefs.current[scrollToProjectId];
          if (projectRef) {
            projectRef.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          }
        }, 100);
      }
    } catch (error) {
      console.log("SessionStorage not available:", error);
    }
  }, []);

  return (
    <div className="p-6 bg-[#FFF2E0] border-4 border-[#C0C9EE] rounded-3xl flex flex-col flex-grow">
      {/* Projects Card with Fixed Height and Scrollable Content */}
      <div className="flex-grow">
        <div className="bg-[#898AC4] border-4 border-[#C0C9EE] rounded-2xl p-6 max-w-xl mx-auto w-full h-full flex flex-col">
          {/* Scrollable Content */}
          <div className="flex-grow overflow-y-auto space-y-6 pr-2">
            {projectData.map((project) => (
              <ProjectDetailCard
                key={project.id}
                project={project}
                projectRef={(el) => (projectRefs.current[project.id] = el)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
