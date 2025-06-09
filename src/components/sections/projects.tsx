"use client";

import {
  ChatCircle,
  ImageSquare,
  TerminalWindow,
  CursorClick,
} from "@phosphor-icons/react";

interface Project {
  title: string;
  description: string;
  demo: string;
  icon: React.ComponentType<any>;
}
export const Projects = () => {
  const projectsData: Project[] = [
    {
      title: "Content Summarizer",
      description:
        "A Gemini wrapper for summarizing articles, documents, and YouTube videos.",
      demo: "https://shop.armancurr.dev",
      icon: ChatCircle,
    },
    {
      title: "File Converter",
      description:
        "An image converter tool that transforms images from one format to another.",
      demo: "https://tasks.armancurr.dev",
      icon: ImageSquare,
    },
    {
      title: "Comet Generator",
      description:
        "A CLI tool for scaffolding TypeScript projects with ready-to-use configurations.",
      demo: "https://armancurr.dev",
      icon: TerminalWindow,
    },
    {
      title: "Comet Press",
      description:
        "A tool that measures your clicks-per-second in a timed challenge.",
      demo: "https://api.armancurr.dev",
      icon: CursorClick,
    },
  ];
  const handleProjectClick = (project: Project) => {
    if (project.demo) {
      window.open(
        project.demo.startsWith("http")
          ? project.demo
          : `https://${project.demo}`,
        "_blank",
      );
    }
  };
  return (
    <div className="w-full max-w-4xl py-4">
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project, index) => {
          const IconComponent = project.icon;
          return (
            <div
              key={index}
              className="group relative rounded-md overflow-hidden cursor-pointer transform transition-all duration-200"
              onClick={() => handleProjectClick(project)}
            >
              {/* Plain transparent background, no image */}
              <div className="relative h-36 flex flex-col justify-center p-12 bg-transparent">
                <div className="flex items-center gap-2 mb-1">
                  <IconComponent size={16} weight="fill" />
                  <h3 className="text-md font-sans">{project.title}</h3>
                </div>
                <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
