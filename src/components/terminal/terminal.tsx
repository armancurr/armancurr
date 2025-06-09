"use client";

import { useState, useEffect, useRef } from "react";
import type React from "react";
import type { JSX } from "react/jsx-runtime";
import { About } from "../sections/about";
import { Skills } from "../sections/skills";
import { Projects } from "../sections/projects";
import { Contact } from "../sections/contact";
import { Help } from "../sections/help";
import { FileSystem } from "../sections/file-system";
import { Figlet } from "../sections/figlet";

interface Message {
  type: "command" | "response" | "system";
  content: string | JSX.Element;
  timestamp: Date;
  id: string;
}

export const Terminal: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "system",
      content: <Figlet />,
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, () => string | JSX.Element> = {
    help: () => <Help />,
    about: () => <About />,
    skills: () => <Skills />,
    projects: () => <Projects />,
    contact: () => <Contact />,
    ls: FileSystem.ls,
    whoami: () => "armancurr",
    date: () => new Date().toLocaleString(),
    history: () => {
      if (commandHistory.length === 0) {
        return "No commands in history";
      }
      return commandHistory
        .map((cmd, index) => `${index + 1}  ${cmd}`)
        .join("\n");
    },
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Auto-completion logic
  const getAutoCompleteOptions = (currentInput: string): string[] => {
    if (!currentInput.trim()) return [];

    const availableCommands = Object.keys(commands);
    const matches = availableCommands.filter((cmd) =>
      cmd.toLowerCase().startsWith(currentInput.toLowerCase()),
    );

    return matches;
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

    const command = input.trim().toLowerCase();
    const userInput = input.trim();

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
      const result = commands[command]();
      setMessages((prev) => [
        ...prev,
        {
          type: "response",
          content: result,
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
                      <span className="text-green-400">git:(</span>
                      <span className="text-pink-400">main</span>
                      <span className="text-green-400 mr-2">)</span>
                      <span className="text-green-400 mr-2">➔</span>
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
              <span className="text-green-400">git:(</span>
              <span className="text-pink-400">main</span>
              <span className="text-green-400 mr-2">)</span>
              <span className="text-green-400 mr-2">➔</span>
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
