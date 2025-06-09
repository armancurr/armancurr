"use client";

import React from "react";
import { Projects } from "./projects";
import { About } from "./about";
import { Contact } from "./contact";

// File system structure
export interface FileSystemNode {
  name: string;
  type: "file" | "directory";
  content?: string | React.ReactNode;
  children?: Record<string, FileSystemNode>;
  description?: string;
}

export const fileSystem: FileSystemNode = {
  name: "portfolio",
  type: "directory",
  children: {
    "README.md": {
      name: "README.md",
      type: "file",
      content: `# Arman's Portfolio

Welcome to my interactive terminal portfolio!

## About
A passionate developer focused on creating amazing web experiences.

## Navigation
Use standard terminal commands to explore:
- ls: list directory contents
- cd: change directory
- cat: view file contents
- tree: show directory structure
- pwd: show current directory

## Contact
- Email: armancurr@proton.me
- GitHub: github.com/armancurr
- LinkedIn: linkedin.com/in/armancurr`,
    },
    about: {
      name: "about",
      type: "directory",
      children: {
        "profile.txt": {
          name: "profile.txt",
          type: "file",
          content: `NAME: Arman
TITLE: Passionate Developer
FOCUS: Creating amazing web experiences
MISSION: Building solutions that make a difference`,
        },
        "skills.json": {
          name: "skills.json",
          type: "file",
          content: `{
  "languages": ["TypeScript", "JavaScript", "Python", "Go"],
  "frameworks": ["React", "Next.js", "Node.js", "Express"],
  "tools": ["Git", "Docker", "AWS", "Vercel"],
  "databases": ["PostgreSQL", "MongoDB", "Redis"]
}`,
        },
        "bio.md": {
          name: "bio.md",
          type: "file",
          content: <About />,
        },
      },
    },
    projects: {
      name: "projects",
      type: "directory",
      children: {
        "content-summarizer": {
          name: "content-summarizer",
          type: "directory",
          children: {
            "README.md": {
              name: "README.md",
              type: "file",
              content: `# Content Summarizer

A Gemini wrapper for summarizing articles, documents, and YouTube videos.

## Technologies
- React
- Next.js
- Gemini AI API
- Tailwind CSS

## Features
- Article summarization
- YouTube video summaries
- Document processing
- Clean, intuitive interface

## Demo
https://sumanize.vercel.app`,
            },
            "package.json": {
              name: "package.json",
              type: "file",
              content: `{
  "name": "content-summarizer",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "next": "^14.0.0",
    "@google/generative-ai": "^0.1.0"
  }
}`,
            },
          },
        },
        "file-converter": {
          name: "file-converter",
          type: "directory",
          children: {
            "README.md": {
              name: "README.md",
              type: "file",
              content: `# File Converter

An image converter tool that transforms images from one format to another.

## Technologies
- React
- TypeScript
- Canvas API
- Web Workers

## Features
- Multiple format support
- Batch conversion
- Quality adjustment
- Drag & drop interface

## Demo
https://test-file-converter.vercel.app`,
            },
          },
        },
        "comet-generator": {
          name: "comet-generator",
          type: "directory",
          children: {
            "README.md": {
              name: "README.md",
              type: "file",
              content: `# Comet Generator

A CLI tool for scaffolding TypeScript projects with ready-to-use configurations.

## Technologies
- Node.js
- TypeScript
- Commander.js
- Inquirer.js

## Features
- Project templates
- Custom configurations
- Interactive setup
- Modern tooling

## Demo
https://armancurr.dev`,
            },
          },
        },
        "comet-press": {
          name: "comet-press",
          type: "directory",
          children: {
            "README.md": {
              name: "README.md",
              type: "file",
              content: `# Comet Press

A tool that measures your clicks-per-second in a timed challenge.

## Technologies
- React
- TypeScript
- Framer Motion
- Tailwind CSS

## Features
- CPS measurement
- Leaderboards
- Animations
- Challenge modes

## Demo
https://comet-generator-template.vercel.app`,
            },
          },
        },
        "overview.md": {
          name: "overview.md",
          type: "file",
          content: <Projects />,
        },
      },
    },
    contact: {
      name: "contact",
      type: "directory",
      children: {
        "social.json": {
          name: "social.json",
          type: "file",
          content: `{
  "github": "https://github.com/armancurr",
  "linkedin": "https://linkedin.com/in/armancurr",
  "twitter": "https://x.com/rrucnamra",
  "email": "armancurr@proton.me"
}`,
        },
        "info.md": {
          name: "info.md",
          type: "file",
          content: <Contact />,
        },
      },
    },
    config: {
      name: "config",
      type: "directory",
      children: {
        ".bashrc": {
          name: ".bashrc",
          type: "file",
          content: `# Bash configuration
export PS1="\\[\\033[32m\\]➔ \\[\\033[34m\\]armancurr \\[\\033[32m\\]git:(\\[\\033[35m\\]main\\[\\033[32m\\]) ➔ \\[\\033[0m\\]"
alias ll="ls -la"
alias la="ls -A"
alias l="ls -CF"`,
        },
        "aliases.sh": {
          name: "aliases.sh",
          type: "file",
          content: `#!/bin/bash
# Custom aliases
alias projects="cd projects && ls"
alias resume="cat about/profile.txt"
alias skills="cat about/skills.json"`,
        },
      },
    },
  },
};

export class FileSystemManager {
  private currentPath: string[] = [];

  getCurrentPath(): string[] {
    return [...this.currentPath];
  }

  getCurrentPathString(): string {
    return this.currentPath.length === 0
      ? "/"
      : "/" + this.currentPath.join("/");
  }

  getCurrentNode(): FileSystemNode {
    let current = fileSystem;
    for (const segment of this.currentPath) {
      if (current.children && current.children[segment]) {
        current = current.children[segment];
      } else {
        throw new Error(`Directory not found: ${segment}`);
      }
    }
    return current;
  }

  changeDirectory(path: string): string {
    if (path === "/") {
      this.currentPath = [];
      return this.getCurrentPathString();
    }

    if (path === "..") {
      if (this.currentPath.length > 0) {
        this.currentPath.pop();
      }
      return this.getCurrentPathString();
    }

    if (path === ".") {
      return this.getCurrentPathString();
    }

    if (path.startsWith("/")) {
      // Absolute path
      this.currentPath = [];
      path = path.substring(1);
    }

    if (path === "") {
      return this.getCurrentPathString();
    }

    const segments = path.split("/").filter((s) => s !== "");
    const newPath = [...this.currentPath];

    for (const segment of segments) {
      if (segment === "..") {
        if (newPath.length > 0) {
          newPath.pop();
        }
      } else if (segment !== ".") {
        // Validate the path exists
        let current = fileSystem;
        for (const pathSegment of newPath) {
          if (current.children && current.children[pathSegment]) {
            current = current.children[pathSegment];
          } else {
            throw new Error(`No such directory: ${pathSegment}`);
          }
        }

        if (current.children && current.children[segment]) {
          const target = current.children[segment];
          if (target.type === "directory") {
            newPath.push(segment);
          } else {
            throw new Error(`Not a directory: ${segment}`);
          }
        } else {
          throw new Error(`No such directory: ${segment}`);
        }
      }
    }

    this.currentPath = newPath;
    return this.getCurrentPathString();
  }

  listDirectory(showHidden: boolean = false): string {
    const current = this.getCurrentNode();

    if (current.type !== "directory" || !current.children) {
      return "Not a directory";
    }

    const items = Object.values(current.children);
    const directories = items
      .filter((item) => item.type === "directory")
      .sort((a, b) => a.name.localeCompare(b.name));
    const files = items
      .filter((item) => item.type === "file")
      .sort((a, b) => a.name.localeCompare(b.name));

    let output = "";

    // Show directories first
    for (const dir of directories) {
      if (!showHidden && dir.name.startsWith(".")) continue;
      output += `[DIR] ${dir.name}/\n`;
    }

    // Then show files
    for (const file of files) {
      if (!showHidden && file.name.startsWith(".")) continue;
      const icon = this.getFileIcon(file.name);
      output += `${icon} ${file.name}\n`;
    }

    return output.trim() || "Directory is empty";
  }

  private getFileIcon(filename: string): string {
    const ext = filename.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "md":
        return "[MD]";
      case "txt":
        return "[TXT]";
      case "json":
        return "[JSON]";
      case "js":
      case "jsx":
      case "ts":
      case "tsx":
        return "[JS]";
      case "sh":
        return "[SH]";
      default:
        return "[FILE]";
    }
  }

  readFile(filename: string): string | React.ReactNode {
    const current = this.getCurrentNode();

    if (current.type !== "directory" || !current.children) {
      throw new Error("Not a directory");
    }

    const file = current.children[filename];
    if (!file) {
      throw new Error(`No such file: ${filename}`);
    }

    if (file.type !== "file") {
      throw new Error(`${filename} is a directory`);
    }

    return file.content || "";
  }

  generateTree(
    node: FileSystemNode = fileSystem,
    prefix: string = "",
    isLast: boolean = true,
    currentPath: string[] = [],
  ): string {
    const isCurrentDir =
      JSON.stringify(currentPath) === JSON.stringify(this.currentPath);
    const marker = isCurrentDir ? " (current)" : "";
    const icon =
      node.type === "directory" ? "[DIR]" : this.getFileIcon(node.name);

    let result = `${prefix}${isLast ? "└── " : "├── "}${icon} ${node.name}${marker}\n`;

    if (node.type === "directory" && node.children) {
      const children = Object.values(node.children);
      children.forEach((child, index) => {
        const isLastChild = index === children.length - 1;
        const newPrefix = prefix + (isLast ? "    " : "│   ");
        const newPath = [...currentPath, child.name];
        result += this.generateTree(child, newPrefix, isLastChild, newPath);
      });
    }

    return result;
  }

  findFiles(pattern: string): string[] {
    const results: string[] = [];

    const search = (node: FileSystemNode, path: string[]) => {
      if (node.name.includes(pattern)) {
        results.push("/" + path.join("/"));
      }

      if (node.type === "directory" && node.children) {
        for (const [name, child] of Object.entries(node.children)) {
          search(child, [...path, name]);
        }
      }
    };

    search(fileSystem, []);
    return results;
  }
}
