import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

const ProjectDetailCard = ({ project, projectRef }) => (
  <div
    ref={projectRef}
    className="p-4 bg-[#EEEEEE] rounded-2xl space-y-6"
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
        className="w-full rounded-lg"
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
      logo: "R",
      logoColor: "bg-indigo-500",
      title: "Rectangle",
      longDescription:
        "A complete design system and component library built to streamline product development. Focused on accessibility, scalability, and a world-class developer experience.",
      client: "Internal Project",
      projectType: "Product Design, Icon Design",
      year: "2024",
      imageUrl: "/sumanize.png", // Replace with actual screenshot
      websiteUrl: "#",
    },
    {
      id: 2,
      logo: "M",
      logoColor: "bg-slate-700",
      title: "Morva labs",
      longDescription:
        "Enhance your company's workforce management with a cutting-edge website. Enjoy seamless user experience, efficient employee management, and a competitive edge.",
      client: "Nur Praditya",
      projectType: "Visual design, Branding",
      year: "2023",
      imageUrl: "/sumanize.png", // Placeholder screenshot
      websiteUrl: "#",
    },
    {
      id: 3,
      logo: "F",
      logoColor: "bg-green-600",
      title: "Flowkit",
      longDescription:
        "A comprehensive design system and UI kit that provides developers and designers with a consistent set of components and guidelines for building modern applications.",
      client: "Open Source",
      projectType: "Design System, UI Kit",
      year: "2024",
      imageUrl: "/sumanize.png",
      websiteUrl: "#",
    },
    {
      id: 4,
      logo: "P",
      logoColor: "bg-purple-600",
      title: "Portfolio",
      longDescription:
        "A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features smooth animations, dark mode support, and optimized performance.",
      client: "Personal Project",
      projectType: "Web Development",
      year: "2024",
      imageUrl: "/sumanize.png",
      websiteUrl: "#",
    },
    {
      id: 5,
      logo: "E",
      logoColor: "bg-orange-600",
      title: "E-commerce",
      longDescription:
        "A full-stack e-commerce platform with advanced features including payment integration, inventory management, and real-time analytics dashboard.",
      client: "Startup Client",
      projectType: "Full Stack Development",
      year: "2024",
      imageUrl: "/sumanize.png",
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
      // Handle case where sessionStorage is not available (e.g., in SSR)
      console.log("SessionStorage not available:", error);
    }
  }, []);

  return (
    // The entire project feed is now wrapped in a single container card.
    <div className="p-4 bg-nord-1000 rounded-2xl border border-nord-950">
      {/* This container creates the "feed" effect with spacing between cards. */}
      <div className="space-y-6">
        {projectData.map((project) => (
          <ProjectDetailCard
            key={project.id}
            project={project}
            projectRef={(el) => (projectRefs.current[project.id] = el)}
          />
        ))}
      </div>
    </div>
  );
}
