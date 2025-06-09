"use client";

import { User, Folders, At, SprayBottle } from "@phosphor-icons/react";
import type React from "react";
import { useState } from "react";

interface CommandItem {
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

export const Help = () => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const commands: CommandItem[] = [
    {
      name: "ls",
      description: "List directory contents. Use 'ls -a' to show hidden files.",
      icon: Folders,
      color: "text-amber-400",
    },
    {
      name: "cd <dir>",
      description: "Change directory. Use 'cd ..' to go back, 'cd /' for root.",
      icon: Folders,
      color: "text-blue-400",
    },
    {
      name: "cat <file>",
      description: "Display file contents. Perfect for reading documentation.",
      icon: User,
      color: "text-green-400",
    },
    {
      name: "tree",
      description: "Show directory structure in a beautiful tree format.",
      icon: Folders,
      color: "text-purple-400",
    },
    {
      name: "pwd",
      description: "Print current working directory path.",
      icon: Folders,
      color: "text-cyan-400",
    },
    {
      name: "find <pattern>",
      description: "Search for files matching the given pattern.",
      icon: User,
      color: "text-orange-400",
    },
    {
      name: "about",
      description: "Hand typed paragraph that supposedly describes me.",
      icon: User,
      color: "text-sky-400",
    },
    {
      name: "projects",
      description:
        "Take a guided tour through the work that speaks louder than words.",
      icon: Folders,
      color: "text-amber-400",
    },
    {
      name: "contact",
      description: "When you're ready to talk, I'm all ears. Let's connect.",
      icon: At,
      color: "text-emerald-400",
    },
    {
      name: "history",
      description: "Show command history for this session.",
      icon: User,
      color: "text-gray-400",
    },
    {
      name: "whoami",
      description: "Display the current user. Spoiler: it's armancurr.",
      icon: User,
      color: "text-indigo-400",
    },
    {
      name: "clear",
      description: "Wipe the slate clean — because clutter is for amateurs.",
      icon: SprayBottle,
      color: "text-rose-400",
    },
  ];

  const handleCommandClick = (command: string) => {
    navigator.clipboard.writeText(command).then(() => {
      setCopiedCommand(command);
      setTimeout(() => setCopiedCommand(null), 1500);
    });
  };

  return (
    <div className="w-full max-w-6xl py-4">
      {/* main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {commands.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.name}
              className="group relative rounded-md bg-neutral-900/50 hover:bg-neutral-800/50 transition-colors duration-200 overflow-hidden cursor-pointer transform transition-all duration-200"
              onClick={() => handleCommandClick(item.name)}
              title={`Click to copy "${item.name}"`}
            >
              {/* card with content */}
              <div className="relative h-36 flex flex-col justify-center p-12">
                <div className="flex items-center gap-2 mb-1">
                  <IconComponent
                    size={16}
                    weight="fill"
                    className={item.color}
                  />
                  <h3 className="text-md font-sans text-white">{item.name}</h3>
                  {copiedCommand === item.name && (
                    <span className="text-xs text-green-400">Copied!</span>
                  )}
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
  );
};
