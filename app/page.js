"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BackgroundEffect from "@/components/vanta";
import NavBar from "@/components/naviagtion";
import Home from "@/components/home";
import Timeline from "@/components/timeline";
import Projects from "@/components/projects";
import Socials from "@/components/socials";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <BackgroundEffect>
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="absolute top-0 left-0 w-full h-full pt-20 flex flex-col items-center justify-start">
        <div className="max-w-3xl mx-auto px-4 flex-grow flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {activeTab === "home" && <Home />}
            {activeTab === "timeline" && <Timeline />}
            {activeTab === "projects" && <Projects />}
            {activeTab === "socials" && <Socials />}
          </AnimatePresence>
        </div>
      </div>
    </BackgroundEffect>
  );
}
