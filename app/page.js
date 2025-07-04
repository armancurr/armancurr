"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Home from "@/components/home";
import Projects from "@/components/projects";
import Header from "@/components/header";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex-grow flex flex-col"
          >
            <Home setActiveTab={setActiveTab} />
          </motion.div>
        );
      case "projects":
        return (
          <motion.div
            key="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex-grow flex flex-col"
          >
            <Projects setActiveTab={setActiveTab} />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex-grow flex flex-col"
          >
            <Home setActiveTab={setActiveTab} />
          </motion.div>
        );
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen">
      <main className="max-w-2xl mx-auto sm:p-6 flex flex-col min-h-screen">
        <Header setActiveTab={setActiveTab} activeTab={activeTab} />
        <AnimatePresence mode="wait" initial={false}>
          {renderContent()}
        </AnimatePresence>
      </main>
    </div>
  );
}
