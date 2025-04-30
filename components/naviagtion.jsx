"use client";

import { motion } from "framer-motion";
import { House, Timer, Eye, HeartStraight } from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function NavBar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "home", icon: <House size={20} weight="fill" />, label: "Hello" },
    {
      id: "timeline",
      icon: <Timer size={20} weight="fill" />,
      label: "Experience",
    },
    {
      id: "projects",
      icon: <Eye size={20} weight="fill" />,
      label: "Projects",
    },
    {
      id: "socials",
      icon: <HeartStraight size={20} weight="fill" />,
      label: "Socials",
    },
  ];

  return (
    <motion.nav
      className="absolute top-20 left-20 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex gap-x-8">
        {navItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`
                  transition cursor-pointer
                  ${
                    activeTab === item.id
                      ? "text-white"
                      : "text-white/60 hover:text-white/90"
                  }
                `}
                aria-label={item.label}
                type="button"
              >
                {item.icon}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="font-mono">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </motion.nav>
  );
}
