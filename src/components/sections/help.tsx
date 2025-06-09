"use client";
import {
  User,
  Wrench,
  FolderOpen,
  At,
  Broom,
  ClockCounterClockwise,
  ArrowUp,
  ArrowDown,
  Keyboard,
  X,
} from "@phosphor-icons/react";
import type React from "react";

interface HelpItem {
  command: string;
  description: string;
  icon: React.ComponentType<any>;
}

export const Help = () => {
  // Merge all actions (commands and navigation/shortcuts) into one array
  const allHelpData: HelpItem[] = [
    {
      command: "about",
      description: "Discover the essence of my journey",
      icon: User,
    },
    {
      command: "skills",
      description: "Unveil the arsenal of my expertise",
      icon: Wrench,
    },
    {
      command: "projects",
      description: "Witness the manifestation of my craft",
      icon: FolderOpen,
    },
    {
      command: "contact",
      description: "Establish a pathway to communication",
      icon: At,
    },
    {
      command: "clear",
      description: "Purge the terminal of all traces",
      icon: Broom,
    },
    {
      command: "history",
      description: "View your previous commands",
      icon: ClockCounterClockwise,
    },
    {
      command: "↑",
      description: "Navigate command history backwards",
      icon: ArrowUp,
    },
    {
      command: "↓",
      description: "Navigate command history forwards",
      icon: ArrowDown,
    },
    {
      command: "Tab",
      description: "Auto-complete your command",
      icon: Keyboard,
    },
  ];

  const handleCommandClick = (command: string) => {
    navigator.clipboard
      .writeText(command)
      .then(() => {
        // Optional: Show a "Copied!" toast notification
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="w-full max-w-4xl py-4">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allHelpData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="group relative rounded-md overflow-hidden cursor-pointer transform transition-all duration-200"
                onClick={() => handleCommandClick(item.command)}
                title={`Click to copy "${item.command}"`}
              >
                <div className="relative h-36 flex flex-col justify-center p-12 bg-transparent">
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent size={16} weight="fill" />
                    <h3 className="text-md font-sans">{item.command}</h3>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
