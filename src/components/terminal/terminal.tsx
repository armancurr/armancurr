"use client";

import { useState, useEffect, useRef } from "react";
import type React from "react";
import type { JSX } from "react/jsx-runtime";
import { About } from "../sections/about";
import { Projects } from "../sections/projects";
import { Contact } from "../sections/contact";
import { Help } from "../sections/help";
import { FileSystemManager } from "../sections/file-system";
import { ProjectDetail } from "../sections/project-detail";

interface Message {
  type: "command" | "response" | "system";
  content: string | JSX.Element | React.ReactNode;
  timestamp: Date;
  id: string;
}

export const Terminal: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "system",
      content: "Welcome to the terminal. Type 'help' to get started.",
      timestamp: new Date(),
      id: "welcome-1",
    },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<string[]>([]);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);
  const [fileSystem] = useState(() => new FileSystemManager());
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const commands: Record<
    string,
    (args?: string[]) => string | JSX.Element | React.ReactNode
  > = {
    help: () => <Help />,
    about: () => <About />,
    projects: () => <Projects />,
    contact: () => <Contact />,
    whoami: () => "armancurr",
    date: () => new Date().toLocaleString(),
    pwd: () => fileSystem.getCurrentPathString(),
    ls: (args) => {
      const showHidden =
        args?.includes("-a") || args?.includes("-la") || args?.includes("-al");
      return fileSystem.listDirectory(showHidden);
    },
    ll: () => fileSystem.listDirectory(true),
    tree: () => fileSystem.generateTree(),
    cd: (args) => {
      if (!args || args.length === 0) {
        try {
          return fileSystem.changeDirectory("/");
        } catch (error) {
          return `cd: ${(error as Error).message}`;
        }
      }

      const path = args[0];
      try {
        const newPath = fileSystem.changeDirectory(path);

        // Check if we're in a project directory and show project detail
        const currentPath = fileSystem.getCurrentPath();
        if (currentPath.length === 2 && currentPath[0] === "projects") {
          const projectName = currentPath[1];
          return <ProjectDetail projectName={projectName} />;
        }

        return `${newPath}`;
      } catch (error) {
        return `cd: ${(error as Error).message}`;
      }
    },
    cat: (args) => {
      if (!args || args.length === 0) {
        return "cat: missing file operand";
      }

      const filename = args[0];
      try {
        return fileSystem.readFile(filename);
      } catch (error) {
        return `cat: ${(error as Error).message}`;
      }
    },
    find: (args) => {
      if (!args || args.length === 0) {
        return "find: missing search pattern";
      }

      const pattern = args[0];
      const results = fileSystem.findFiles(pattern);

      if (results.length === 0) {
        return `find: no files matching '${pattern}' found`;
      }

      return results.join("\n");
    },
    grep: (args) => {
      if (!args || args.length < 2) {
        return "grep: usage: grep <pattern> <file>";
      }

      const [pattern, filename] = args;
      try {
        const content = fileSystem.readFile(filename);
        if (typeof content === "string") {
          const lines = content.split("\n");
          const matches = lines.filter((line) =>
            line.toLowerCase().includes(pattern.toLowerCase()),
          );
          return matches.length > 0
            ? matches.join("\n")
            : `grep: no matches found for '${pattern}'`;
        } else {
          return "grep: cannot search in non-text file";
        }
      } catch (error) {
        return `grep: ${(error as Error).message}`;
      }
    },
    history: () => {
      if (commandHistory.length === 0) {
        return "No commands in history";
      }
      return commandHistory
        .map((cmd, index) => `${index + 1}  ${cmd}`)
        .join("\n");
    },
    uname: () => "Portfolio Terminal v1.0.0 (armancurr)",
    env: () => `USER=armancurr
HOME=/
PWD=${fileSystem.getCurrentPathString()}
SHELL=/bin/bash
TERM=xterm-256color`,
    alias: () => `Available aliases:
ll='ls -la'
la='ls -a'
projects='cd projects && ls'
resume='cat about/profile.txt'
skills='cat about/skills.json'`,
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Auto-completion logic
  const getAutoCompleteOptions = (currentInput: string): string[] => {
    if (!currentInput.trim()) return [];

    const parts = currentInput.split(" ");
    const firstPart = parts[0].toLowerCase();

    // If we're still typing the command name
    if (parts.length === 1) {
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter((cmd) =>
        cmd.toLowerCase().startsWith(firstPart),
      );
      return matches;
    }

    // If we're typing arguments for specific commands
    if (parts.length > 1) {
      const command = firstPart;
      const currentArg = parts[parts.length - 1];

      if (command === "cd" || command === "cat" || command === "ls") {
        // Get current directory contents for file/folder completion
        try {
          const current = fileSystem.getCurrentNode();
          if (current.type === "directory" && current.children) {
            const items = Object.keys(current.children);
            return items.filter((item) =>
              item.toLowerCase().startsWith(currentArg.toLowerCase()),
            );
          }
        } catch {
          return [];
        }
      }
    }

    return [];
  };

  // Handle keyboard events for history navigation and auto-completion
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (
        commandHistory.length > 0 &&
        historyIndex < commandHistory.length - 1
      ) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const options = getAutoCompleteOptions(input);

      if (options.length === 1) {
        // Single match - complete it
        setInput(options[0]);
        setShowAutoComplete(false);
      } else if (options.length > 1) {
        // Multiple matches - show options
        setAutoCompleteOptions(options);
        setShowAutoComplete(true);

        // Find common prefix and complete to that
        const commonPrefix = options.reduce((prefix, option) => {
          let i = 0;
          while (
            i < prefix.length &&
            i < option.length &&
            prefix[i] === option[i]
          ) {
            i++;
          }
          return prefix.slice(0, i);
        });

        if (commonPrefix.length > input.length) {
          setInput(commonPrefix);
        }
      }
    } else if (e.key === "Escape") {
      setShowAutoComplete(false);
      setAutoCompleteOptions([]);
    } else {
      // Hide auto-complete when typing normally
      setShowAutoComplete(false);
      setAutoCompleteOptions([]);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setHistoryIndex(-1); // Reset history index when typing

    // Show auto-completion suggestions as user types
    if (value.trim()) {
      const options = getAutoCompleteOptions(value);
      if (options.length > 1) {
        setAutoCompleteOptions(options);
        setShowAutoComplete(true);
      } else {
        setShowAutoComplete(false);
      }
    } else {
      setShowAutoComplete(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input.trim();
    const parts = userInput.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Add command to history (avoid duplicates and don't save clear command)
    if (
      userInput !== "clear" &&
      (!commandHistory.length ||
        commandHistory[commandHistory.length - 1] !== userInput)
    ) {
      setCommandHistory((prev) => [...prev, userInput].slice(-50)); // Keep last 50 commands
    }

    // Reset history navigation
    setHistoryIndex(-1);

    // Hide auto-complete
    setShowAutoComplete(false);
    setAutoCompleteOptions([]);

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

    if (command === "clear") {
      setMessages([]);
      setCommandHistory([]);
      setHistoryIndex(-1);
    } else if (command === "echo") {
      const echoText = args.join(" ");
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
      try {
        const result = commands[command](args);
        setMessages((prev) => [
          ...prev,
          {
            type: "response",
            content: result,
            timestamp: new Date(),
            id: generateId(),
          },
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            type: "response",
            content: `Error: ${(error as Error).message}`,
            timestamp: new Date(),
            id: generateId(),
          },
        ]);
      }
    } else {
      setMessages((prev) => [
        ...prev,
        {
          type: "response",
          content: `command not found: ${command}. Type 'help' for available commands.`,
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
      // Smooth delay to ensure content is rendered and animated
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (messagesContainerRef.current?.lastElementChild) {
            messagesContainerRef.current.lastElementChild.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest",
            });
          }
          // Ensure input stays focused after response
          setTimeout(() => inputRef.current?.focus(), 150);
        }, 100);
      });
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
      className="h-screen w-[56rem] max-w-full font-mono overflow-hidden cursor-text relative"
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
        className="h-full overflow-y-auto terminal-scroll"
        onScroll={handleScroll}
      >
        <div className="min-h-full flex flex-col">
          {/* Top padding */}
          <div className="h-[20vh] flex-shrink-0"></div>

          {/* Terminal content */}
          <div className="w-full px-4 flex-1">
            <div ref={messagesContainerRef}>
              {messages.map((message) => (
                <div key={message.id} className="mb-1">
                  {message.type === "command" && (
                    <div className="flex">
                      <span className="text-green-400 mr-2">➔</span>
                      <span className="text-blue-400 mr-2">armancurr</span>
                      <span className="text-green-400">@</span>
                      <span className="text-purple-400">portfolio</span>
                      <span className="text-green-400">:</span>
                      <span className="text-yellow-400">~</span>
                      <span className="text-green-400 mr-2">$</span>
                      <span className="">{message.content}</span>
                    </div>
                  )}

                  {message.type === "response" && (
                    <div className="ml-12 mb-2 whitespace-pre-wrap font-mono">
                      {message.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Auto-completion suggestions */}
            {showAutoComplete && autoCompleteOptions.length > 0 && (
              <div className="ml-12 mb-1 bg-neutral-800 border border-neutral-600 rounded-sm max-w-md">
                <div className="px-2 py-1 text-xs text-neutral-400 border-b border-neutral-600">
                  Auto-complete suggestions:
                </div>
                <div className="p-1">
                  {autoCompleteOptions.map((option, index) => (
                    <div
                      key={option}
                      className="px-2 py-1 text-sm text-green-400 hover:bg-neutral-700 cursor-pointer rounded-sm"
                      onClick={() => {
                        setInput(option);
                        setShowAutoComplete(false);
                        setAutoCompleteOptions([]);
                        inputRef.current?.focus();
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Current command line */}
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-green-400 mr-2">➔</span>
              <span className="text-blue-400 mr-2">armancurr</span>
              <span className="text-green-400">@</span>
              <span className="text-purple-400">portfolio</span>
              <span className="text-green-400">:</span>
              <span className="text-yellow-400">
                {fileSystem.getCurrentPathString()}
              </span>
              <span className="text-green-400 mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-neutral-100 flex-1"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>

          {/* Bottom padding */}
          <div className="h-[20vh] flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
};
