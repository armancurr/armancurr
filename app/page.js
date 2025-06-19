"use client";

import React, { useState } from "react";
import Home from "@/components/home";
import Projects from "@/components/projects";
import FloatingNav from "@/components/floater-nav";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home setActiveTab={setActiveTab} />;
      case "projects":
        return <Projects setActiveTab={setActiveTab} />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="bg-[#898AC4] min-h-screen">
      <main className="max-w-2xl mx-auto sm:p-6 flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col">{renderContent()}</div>
        <FloatingNav setActiveTab={setActiveTab} activeTab={activeTab} />
      </main>
    </div>
  );
}
