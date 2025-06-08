"use client";

import { useState, useEffect, useRef } from "react";
import type React from "react";
import type { JSX } from "react/jsx-runtime";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { Help } from "@/components/sections/help";
import { FileSystem } from "@/components/sections/file-system";

interface Message {
  type: "command" | "response" | "system";
  timestamp: Date;
  id: string;
}

export const Terminal: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "system",
      timestamp: new Date(),
      id: "welcome-1",
    },
  ]);
  const [input, setInput] = useState("");
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Available commands
  const commands: Record<string, () => string | JSX.Element> = {
    help: Help,
    about: About,
    projects: Projects,
    contact: Contact,
    ls: FileSystem.ls,
    whoami: () => "Arman Kar",
    date: () => new Date().toLocaleString(),
    clear: () => "CLEAR_TERMINAL",
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.trim();
    const userInput = input.trim();

    // Add user command to messages
    setMessages((prev) => [
      ...prev,
      {
        type: "command",
        content: userInput,
        timestamp: new Date(),
        id: generateId(),
      },
    ]);

    setInput("");

    // Handle commands
    if (command === "clear") {
      setMessages([]);
    } else if (command.startsWith("echo ")) {
      const echoText = command.substring(5);
      setMessages((prev) => [
        ...prev,
        {
          type: "response",
          content: echoText || "echo: missing argument",
          timestamp: new Date(),
          id: generateId(),
        },
      ]);
    } else if (commands[command]) {
      setMessages((prev) => [
        ...prev,
        {
          type: "response",
          content: commands[command](),
          timestamp: new Date(),
          id: generateId(),
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          type: "response",
          content: `command not found: ${command}`,
          timestamp: new Date(),
          id: generateId(),
        },
      ]);
    }

    // Ensure input is focused and ready for next command
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Handle scroll shadows
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowTopShadow(scrollTop > 10);
    setShowBottomShadow(scrollTop < scrollHeight - clientHeight - 10);
  };

  // Auto scroll to new response and maintain input focus
  useEffect(() => {
    if (messages.length <= 1) return;

    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage &&
      (lastMessage.type === "response" || lastMessage.type === "system")
    ) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        if (messagesContainerRef.current?.lastElementChild) {
          messagesContainerRef.current.lastElementChild.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
        // Ensure input stays focused after response
        setTimeout(() => inputRef.current?.focus(), 100);
      }, 50);
    }
  }, [messages]);

  // Handle scroll event
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Focus input when component mounts or when clicking anywhere in the terminal
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      ref={terminalRef}
      className="h-screen text-green-400 font-mono overflow-hidden cursor-text relative"
      onClick={handleTerminalClick}
    >
      {/* Top shadow */}
      {showTopShadow && (
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-neutral-950 to-transparent pointer-events-none z-10" />
      )}

      {/* Bottom shadow */}
      {showBottomShadow && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none z-10" />
      )}

      <div
        ref={scrollRef}
        className="h-full overflow-y-auto"
        onScroll={handleScroll}
      >
        <div className="min-h-full flex flex-col">
          {/* Top padding */}
          <div className="h-[20vh] flex-shrink-0"></div>

          {/* Terminal content */}
          <div className="w-full max-w-3xl mx-auto px-4 flex-1">
            <div ref={messagesContainerRef}>
              {messages.map((message) => (
                <div key={message.id} className="mb-1">
                  {message.type === "command" && (
                    <div className="flex">
                      <span className="text-green-400 mr-2">➔</span>
                      <span className="text-blue-400 mr-2">armancurr</span>
                      <span className="text-green-400">git:(</span>
                      <span className="text-pink-400">main</span>
                      <span className="text-green-400 mr-2">)</span>
                      <span className="text-green-400 mr-2">➔</span>
                      <span className="text-neutral-200"></span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Current command line */}
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-green-400 mr-2">➔</span>
              <span className="text-blue-400 mr-2">armancurr</span>
              <span className="text-green-400">git:(</span>
              <span className="text-pink-400">main</span>
              <span className="text-green-400 mr-2">)</span>
              <span className="text-green-400 mr-2">➔</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none outline-none text-neutral-100 flex-1"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>

          {/* Bottom padding */}
          <div className="h-[25vh] flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
};
