"use client";
import {
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
} from "@phosphor-icons/react";
import type React from "react";

interface Contact {
  title: string;
  description: string;
  demo: string;
  icon: React.ComponentType<any>;
  color: string; // New property for the icon color class
}

export const Contact = () => {
  const contactsData: Contact[] = [
    {
      title: "GitHub Profile",
      description:
        "Explore my open-source projects, contributions, and development portfolio.",
      demo: "https://github.com/armancurr",
      icon: GithubLogo,
      color: "text-neutral-50",
    },
    {
      title: "LinkedIn Network",
      description:
        "Connect professionally and view my career journey and achievements.",
      demo: "https://linkedin.com/in/armancurr",
      icon: LinkedinLogo,
      color: "text-blue-400",
    },
    {
      title: "Professional Email",
      description:
        "Get in touch for collaborations, opportunities, and professional inquiries.",
      demo: "mailto:armancurr@proton.me",
      icon: EnvelopeSimple,
      color: "text-rose-400",
    },
    {
      title: "Twitter Updates",
      description:
        "Follow my thoughts on tech, development insights, and daily updates.",
      demo: "https://x.com/rrucnamra",
      icon: TwitterLogo,
      color: "text-sky-400",
    },
  ];

  const handleContactClick = (contact: Contact) => {
    if (contact.demo) {
      window.open(
        contact.demo.startsWith("http") || contact.demo.startsWith("mailto:")
          ? contact.demo
          : `https://${contact.demo}`,
        "_blank",
      );
    }
  };

  return (
    <div className="w-full max-w-4xl py-4">
      {/* main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactsData.map((contact, index) => {
          const IconComponent = contact.icon;
          return (
            <div
              key={index}
              className="group relative rounded-md bg-neutral-900/50 hover:bg-neutral-800/50 transition-colors duration-200 overflow-hidden cursor-pointer transform transition-all duration-200"
              onClick={() => handleContactClick(contact)}
            >
              {/* card with content */}
              <div className="relative h-36 flex flex-col justify-center p-12">
                <div className="flex items-center gap-2 mb-1">
                  <IconComponent
                    size={16}
                    weight="fill"
                    className={contact.color}
                  />
                  <h3 className="text-md font-sans">{contact.title}</h3>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                  {contact.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
