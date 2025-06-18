"use client";

import React, { useState } from "react";
import Header from "@/components/header";
import Home from "@/components/home";
import Projects from "@/components/projects";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home setActiveTab={setActiveTab} />;
      case "projects":
        return <Projects />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="bg-[#EEEEEE] min-h-screen">
      <main className="max-w-2xl mx-auto p-4 sm:p-6 flex flex-col min-h-screen">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6 flex-grow flex flex-col">{renderContent()}</div>
      </main>
    </div>
  );
}
