"use client";

import Image from "next/image";
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
  image: string;
  icon: React.ComponentType<any>;
}
export const Projects = () => {
  const projectsData: Project[] = [
    {
      title: "Content Summarizer",
      description:
        "A Gemini wrapper for summarizing articles, documents, and YouTube videos.",
      demo: "https://shop.armancurr.dev",
      image: "/1.jpg",
      icon: ChatCircle,
    },
    {
      title: "File Converter",
      description:
        "An image converter tool that transforms images from one format to another.",
      demo: "https://tasks.armancurr.dev",
      image: "/2.jpg",
      icon: ImageSquare,
    },
    {
      title: "Comet Generator",
      description:
        "A CLI tool for scaffolding TypeScript projects with ready-to-use configurations.",
      demo: "https://armancurr.dev",
      image: "/3.jpg",
      icon: TerminalWindow,
    },
    {
      title: "Comet Press",
      description:
        "A tool that measures your clicks-per-second in a timed challenge.",
      demo: "https://api.armancurr.dev",
      image: "/4.jpg",
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
              {/* Project Image */}
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Title and Description Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-center p-12">
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent size={16} weight="fill" />
                    <h3 className="text-md font-sans">{project.title}</h3>
                  </div>
                  <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
