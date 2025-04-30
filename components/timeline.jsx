"use client";

import { motion } from "framer-motion";

export default function Timeline() {
  const experiences = [
    {
      title: "Student",
      company: "B.TECH CSE - Kalvium",
      period: "2024-Present",
      description:
        "Pursuing B.Tech in Computer Science Engineering at Kalvium. Gaining practical, industry-relevant skills through an intensive, project-based curriculum focused on modern software development and collaboration.",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const currentExperience = experiences[0];

  return (
    <motion.section
      key="timeline"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
      className="absolute bottom-20 left-0 w-full px-20 z-10 flex flex-col items-start text-left"
    >
      <div className="w-full max-w-2xl">
        <h3 className="text-zinc-100 text-xl font-bold">
          {currentExperience.title}
        </h3>
        <p className="text-zinc-400 mb-2">
          {currentExperience.company} • {currentExperience.period}
        </p>
        <p className="text-zinc-100 text-sm leading-relaxed">
          {currentExperience.description}
        </p>
      </div>
    </motion.section>
  );
}
