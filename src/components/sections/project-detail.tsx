"use client";

import React from "react";
import {
  GithubLogo,
  Globe,
  Code,
  Rocket,
  ArrowUpRight,
} from "@phosphor-icons/react";

interface ProjectData {
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  demo: string;
  github?: string;
  status: "completed" | "in-progress" | "planning";
}

const projectsData: Record<string, ProjectData> = {
  "content-summarizer": {
    title: "Content Summarizer",
    description:
      "A powerful AI-driven tool that leverages Google's Gemini API to provide intelligent summarization of various content types including articles, documents, and YouTube videos. Built with modern web technologies for optimal performance and user experience.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Gemini AI API",
      "Tailwind CSS",
      "Vercel",
    ],
    features: [
      "Article summarization from URLs",
      "YouTube video content analysis",
      "Document processing (PDF, DOC)",
      "Adjustable summary length",
      "Real-time processing indicators",
      "Responsive design for all devices",
    ],
    demo: "https://sumanize.vercel.app",
    github: "https://github.com/armancurr/content-summarizer",
    status: "completed",
  },
  "file-converter": {
    title: "File Converter",
    description:
      "A client-side image conversion tool that transforms images between different formats without requiring server uploads. Utilizes the HTML5 Canvas API and Web Workers for efficient processing while maintaining user privacy.",
    technologies: [
      "React",
      "TypeScript",
      "Canvas API",
      "Web Workers",
      "Tailwind CSS",
    ],
    features: [
      "Multiple format support (PNG, JPG, WEBP, GIF)",
      "Batch conversion capabilities",
      "Quality adjustment controls",
      "Drag & drop interface",
      "Client-side processing (privacy-focused)",
      "Real-time preview",
    ],
    demo: "https://test-file-converter.vercel.app",
    github: "https://github.com/armancurr/file-converter",
    status: "completed",
  },
  "comet-generator": {
    title: "Comet Generator",
    description:
      "A comprehensive CLI tool designed to streamline TypeScript project scaffolding. Provides developers with production-ready project templates, modern tooling configurations, and interactive setup wizards.",
    technologies: [
      "Node.js",
      "TypeScript",
      "Commander.js",
      "Inquirer.js",
      "Chalk",
      "NPM",
    ],
    features: [
      "Multiple project templates",
      "Interactive configuration wizard",
      "Modern tooling setup (ESLint, Prettier, Husky)",
      "Custom template creation",
      "Git initialization and hooks",
      "Package manager detection",
    ],
    demo: "https://armancurr.dev",
    github: "https://github.com/armancurr/comet-generator",
    status: "completed",
  },
  "comet-press": {
    title: "Comet Press",
    description:
      "An engaging click-per-second measurement game that challenges users to test their clicking speed and reaction time. Features smooth animations, competitive leaderboards, and various challenge modes.",
    technologies: [
      "React",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "Local Storage",
    ],
    features: [
      "Real-time CPS calculation",
      "Multiple game modes",
      "Local leaderboards",
      "Smooth animations with Framer Motion",
      "Progress tracking",
      "Mobile-optimized controls",
    ],
    demo: "https://comet-generator-template.vercel.app",
    github: "https://github.com/armancurr/comet-press",
    status: "completed",
  },
};

interface ProjectDetailProps {
  projectName: string;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  projectName,
}) => {
  const project = projectsData[projectName];

  if (!project) {
    return (
      <div className="text-red-400 font-mono">
        Project "{projectName}" not found. Available projects:
        {Object.keys(projectsData).map((name) => (
          <div key={name} className="ml-4">
            - {name}
          </div>
        ))}
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "in-progress":
        return "text-yellow-400";
      case "planning":
        return "text-blue-400";
      default:
        return "text-neutral-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "[DONE]";
      case "in-progress":
        return "[WIP]";
      case "planning":
        return "[PLAN]";
      default:
        return "[?]";
    }
  };

  return (
    <div className="w-full max-w-4xl py-4 space-y-6">
      {/* Header */}
      <div className="border-b border-neutral-700 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <Rocket size={24} className="text-purple-400" weight="fill" />
          <h1 className="text-2xl font-bold text-white">{project.title}</h1>
          <span
            className={`text-sm flex items-center gap-1 ${getStatusColor(project.status)}`}
          >
            {getStatusIcon(project.status)} {project.status.replace("-", " ")}
          </span>
        </div>
        <p className="text-neutral-300 text-base leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap">
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
        >
          <Globe size={16} weight="fill" />
          Live Demo
          <ArrowUpRight size={14} />
        </a>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            <GithubLogo size={16} weight="fill" />
            Source Code
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>

      {/* Technologies */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Code size={20} className="text-green-400" weight="fill" />
          Technologies Used
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-neutral-800 text-neutral-200 px-3 py-1 rounded-full text-sm font-medium border border-neutral-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <span className="text-amber-400">[*]</span>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {project.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-2 bg-neutral-900/50 p-3 rounded-lg border border-neutral-700"
            >
              <span className="text-green-400 mt-0.5">&gt;</span>
              <span className="text-neutral-200 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Hint */}
      <div className="border-t border-neutral-700 pt-4">
        <div className="text-sm text-neutral-500 font-mono">
          <div>
            [TIP]{" "}
            <span className="text-neutral-400">
              Use these commands to navigate:
            </span>
          </div>
          <div className="ml-4 mt-1 space-y-1">
            <div>
              <span className="text-blue-400">cd ..</span> - Go back to projects
              directory
            </div>
            <div>
              <span className="text-blue-400">ls</span> - List files in this
              project
            </div>
            <div>
              <span className="text-blue-400">cat README.md</span> - Read
              project documentation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
