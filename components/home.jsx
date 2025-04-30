"use client";

import { motion } from "framer-motion";

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <motion.section
      key="home"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
      className="absolute bottom-20 left-0 w-full px-20 flex flex-col items-start" // text-left removed from here as it's handled by the p tag now
    >
      <p className="text-zinc-100 text-sm max-w-2xl leading-relaxed">
        Hi, I'm Arman. I develop intuitive applications using modern tech like
        Next.js and TypeScript. I enjoy complex challenges, am building
        projects, learning Neovim, and looking to contribute to open source
        work.
      </p>
    </motion.section>
  );
}
