"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretRight } from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);

  const projectData = [
    {
      title: "Better Summerize",
      topic: "AI summarization tool",
      description:
        "This simple yet powerful application helps you quickly understand long content. Just paste text, upload a PDF, or provide a YouTube link to receive clear and concise summaries instantly, saving you time.",
      tags: ["Next.js", "TypeScript", "PostgreSQL"],
      github: "https://github.com/vereoman/better-summerize",
    },
    {
      title: "Better Chat",
      topic: "Real-time chat app",
      description:
        "Experience secure, real-time communication with this feature-rich chat application. Enjoy customizable themes, create group chats, share files easily, and benefit from end-to-end encryption for private and instant messaging.",
      tags: ["Next.js", "Socket.io", "PostgreSQL"],
      github: "https://github.com/vereoman/better-chat",
    },
    {
      title: "Crown Cuisine",
      topic: "Restaurant management tool",
      description:
        "An efficient solution designed to streamline all restaurant operations. Customers can book tables and place food orders online, while owners gain effortless control over managing inventory, menus, tables, and staff.",
      tags: ["Next.js", "JavaScript", "PostgreSQL"],
      github:
        "https://github.com/kalviumcommunity/S65_Arman_Capstone_CrownCuisine",
    },
    {
      title: "Better Notes",
      topic: "Note-taking app",
      description:
        "Effortlessly capture and organize your thoughts, to-do lists, and important ideas. This versatile notes application allows you to save various types of information and keep code snippets neatly formatted for easy access.",
      tags: ["Next.js", "TypeScript", "PostgreSQL"],
      github: "https://github.com/vereoman/better-notes",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === projectData.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const currentProject = projectData[activeIndex];

  return (
    <motion.section
      key="projects"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
      className="absolute bottom-20 left-0 w-full px-20 z-10 flex flex-col items-start text-left"
    >
      <div className="relative w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeIn}
          >
            <div className="flex items-baseline space-x-2 mb-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-100 hover:text-zinc-300 text-xl font-semibold transition-colors"
                  >
                    {currentProject.title}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" className="font-mono">
                  Source code
                </TooltipContent>
              </Tooltip>

              <span className="text-sm text-zinc-400">
                - {currentProject.topic}
              </span>
            </div>

            <p className="mb-3 text-zinc-100 text-sm leading-relaxed">
              {currentProject.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/10 px-2 py-1 rounded-md text-xs text-zinc-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleNext}
          className="absolute right-[-40px] sm:right-[-50px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors duration-200 cursor-pointer"
          aria-label="Next project"
        >
          <CaretRight className="w-3 h-3 text-white" weight="bold" />
        </button>
      </div>
    </motion.section>
  );
}
