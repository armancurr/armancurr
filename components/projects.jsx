import { useEffect, useRef } from "react";
import { GlobeSimple, GithubLogo } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProjectCard = ({ project, projectRef }) => (
  <div
    ref={projectRef}
    className="bg-zinc-900 border-2 border-zinc-600 rounded-2xl p-6 space-y-4"
  >
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <h3 className="text-2xl font-semibold text-zinc-200">
          {project.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.projectType.map((type, idx) => (
          <Badge
            key={idx}
            className="text-xs bg-gradient-to-b from-zinc-700 to-zinc-800 border-2 border-zinc-700 text-zinc-100"
          >
            {type}
          </Badge>
        ))}
      </div>
      <p className="text-zinc-200 text-sm leading-relaxed">
        {project.longDescription}
      </p>
    </div>

    <div className="flex gap-3 w-full">
      <Button
        asChild
        variant="default"
        size="sm"
        className="bg-gradient-to-b from-zinc-200 to-zinc-500 rounded-lg text-zinc-950 bg-gradient-to-b from-zinc-200 to-zinc-500 hover:bg-gradient-to-b hover:from-zinc-300 hover:to-zinc-600 transition-colors duration-200 flex-1"
      >
        <a
          href={project.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 justify-center"
        >
          <GlobeSimple size={14} weight="bold" /> Visit Website
        </a>
      </Button>

      <Button
        asChild
        variant="default"
        size="sm"
        className="bg-gradient-to-b from-zinc-200 to-zinc-500 rounded-lg text-zinc-950 bg-gradient-to-b from-zinc-200 to-zinc-500 hover:bg-gradient-to-b hover:from-zinc-300 hover:to-zinc-600 transition-colors duration-200 flex-1"
      >
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 justify-center"
        >
          <GithubLogo size={14} weight="bold" /> View Source
        </a>
      </Button>
    </div>

    {/*
    <div className="w-full aspect-square overflow-hidden rounded-xl relative">
      <Image
        src={project.imageUrl}
        alt={project.title}
        fill
        className="object-cover"
      />
    </div>
    */}
  </div>
);

export default function Projects() {
  const projectRefs = useRef({});

  const projectData = [
    {
      id: 1,
      title: "Sumanize",
      projectType: ["summarizer", "chatbot"],
      imageUrl: "/sumanize.png",
      longDescription:
        "A comprehensive product design and icon design project for Sumanize, focusing on creating an intuitive user experience.",
      websiteUrl: "https://sumanize.vercel.app",
      githubUrl:
        "https://github.com/kalviumcommunity/S65_Arman_Capstone_Sumanize.git",
    },
    {
      id: 2,
      title: "Imaverter",
      projectType: ["converter", "image"],
      imageUrl: "/file.png",
      longDescription:
        "Complete visual design and branding solution for File Converter, emphasizing clean aesthetics and functionality.",
      websiteUrl: "https://imaverter.vercel.app",
      githubUrl: "https://github.com/armancurr/imaverter.git",
    },
    {
      id: 3,
      title: "Typepoo",
      projectType: ["typing", "speed-test"],
      imageUrl: "/cometerm.png",
      longDescription:
        "Visual design and branding project for Typepot, creating a cohesive brand identity and user interface.",
      websiteUrl: "https://typepoo.vercel.app",
      githubUrl: "https://github.com/cometerm/typepoo.git",
    },
  ];

  useEffect(() => {
    try {
      const scrollToProjectId = sessionStorage.getItem("scrollToProject");
      if (scrollToProjectId) {
        sessionStorage.removeItem("scrollToProject");

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
    <div className="p-6 bg-zinc-900 border-2 border-zinc-600 rounded-3xl flex flex-col flex-grow">
      <div className="space-y-6 overflow-y-auto max-w-2xl mx-auto w-full">
        {projectData.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            projectRef={(el) => (projectRefs.current[project.id] = el)}
          />
        ))}
      </div>
    </div>
  );
}
