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
  color: string; // New property for the icon color class
}
export const Projects = () => {
  const projectsData: Project[] = [
    {
      title: "Content Summarizer",
      description:
        "A Gemini wrapper for summarizing articles, documents, and YouTube videos.",
      demo: "https://sumanize.vercel.app",
      icon: ChatCircle,
      color: "text-blue-50",
    },
    {
      title: "File Converter",
      description:
        "An image converter tool that transforms images from one format to another.",
      demo: "https://test-file-converter.vercel.app",
      icon: ImageSquare,
      color: "text-lime-400",
    },
    {
      title: "Comet Generator",
      description:
        "A CLI tool for scaffolding TypeScript projects with ready-to-use configurations.",
      demo: "https://armancurr.dev",
      icon: TerminalWindow,
      color: "text-purple-400",
    },
    {
      title: "Comet Press",
      description:
        "A tool that measures your clicks-per-second in a timed challenge.",
      demo: "https://comet-generator-template.vercel.app",
      icon: CursorClick,
      color: "text-indigo-400",
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
      {/* main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project, index) => {
          const IconComponent = project.icon;
          return (
            <div
              key={index}
              className="group relative rounded-md bg-neutral-900/50 hover:bg-neutral-800/50 transition-colors duration-200 overflow-hidden cursor-pointer transform transition-all duration-200"
              onClick={() => handleProjectClick(project)}
            >
              {/* card with content */}
              <div className="relative h-36 flex flex-col justify-center p-12">
                <div className="flex items-center gap-2 mb-1">
                  <IconComponent
                    size={16}
                    weight="fill"
                    className={project.color}
                  />
                  <h3 className="text-md font-sans">{project.title}</h3>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed font-sans">
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
