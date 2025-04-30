"use client";

import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "./icons";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function Socials() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/vereoman",
      icon: GitHubIcon,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/vereoman",
      icon: LinkedInIcon,
    },
    {
      name: "Twitter",
      href: "https://x.com/vereoman",
      icon: TwitterIcon,
    },
  ];

  return (
    <motion.section
      key="socials"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
      className="absolute bottom-20 left-0 w-full px-20 z-10 flex flex-col items-start text-left"
    >
      <div className="w-full max-w-2xl">
        <div className="flex items-center space-x-4 mb-4">
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Tooltip key={link.name}>
                <TooltipTrigger asChild>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200"
                    aria-label={link.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" className="font-mono">
                  {link.name}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        <div>
          <p className="text-zinc-100 text-sm leading-relaxed">
            Follow my journey as I dive into new technologies, build hands-on
            projects, and provide practical insights to help you learn and grow
            alongside me.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
