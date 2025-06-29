import { useEffect, useRef } from "react";
import { GlobeSimple, GithubLogo } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProjectCard = ({ project, projectRef }) => (
  <div
    ref={projectRef}
    className="bg-[#898AC4] border-4 border-[#C0C9EE] rounded-2xl p-6 space-y-4"
  >
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <h3 className="text-2xl font-semibold text-[#FFF2E0]">
          {project.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.projectType.map((type, idx) => (
          <Badge key={idx} className="text-sm bg-[#C0C9EE] text-[#898AC4]">
            {type}
          </Badge>
        ))}
      </div>
      <p className="text-[#FFF2E0] text-sm leading-relaxed">
        {project.longDescription}
      </p>
    </div>

    <div className="flex gap-3 justify-end">
      <Button
        asChild
        variant="default"
        size="lg"
        className="bg-[#FFF2E0] rounded-lg text-[#373A40] hover:bg-[#C0C9EE] transition-colors duration-200"
      >
        <a
          href={project.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
        >
          <GlobeSimple size={14} weight="bold" /> Visit Website
        </a>
      </Button>

      <Button
        asChild
        variant="default"
        size="lg"
        className="bg-[#FFF2E0] rounded-lg text-[#373A40] hover:bg-[#C0C9EE] transition-colors duration-200"
      >
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
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
    <div className="p-6 bg-[#FFF2E0] border-4 border-[#C0C9EE] rounded-3xl flex flex-col flex-grow">
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
