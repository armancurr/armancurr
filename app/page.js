"use client";

import React, { useState } from "react";
import Home from "@/components/home";
import Projects from "@/components/projects";
import Header from "@/components/header";

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
    <div className="bg-zinc-900 min-h-screen">
      <main className="max-w-2xl mx-auto sm:p-6 flex flex-col min-h-screen">
        <Header setActiveTab={setActiveTab} activeTab={activeTab} />
        <div className="flex-grow flex flex-col">{renderContent()}</div>
      </main>
    </div>
  );
}
