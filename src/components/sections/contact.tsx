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
}

export const Contact = () => {
  const contactsData: Contact[] = [
    {
      title: "Professional Email",
      description:
        "Get in touch for collaborations, opportunities, and professional inquiries.",
      demo: "mailto:armancurr@proton.me",
      icon: EnvelopeSimple,
    },
    {
      title: "GitHub Profile",
      description:
        "Explore my open-source projects, contributions, and development portfolio.",
      demo: "https://github.com/armancurr",
      icon: GithubLogo,
    },
    {
      title: "LinkedIn Network",
      description:
        "Connect professionally and view my career journey and achievements.",
      demo: "https://linkedin.com/in/armancurr",
      icon: LinkedinLogo,
    },
    {
      title: "Twitter Updates",
      description:
        "Follow my thoughts on tech, development insights, and daily updates.",
      demo: "https://x.com/rrucnamra",
      icon: TwitterLogo,
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
      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactsData.map((contact, index) => {
          const IconComponent = contact.icon;
          return (
            <div
              key={index}
              className="group relative rounded-md overflow-hidden cursor-pointer transform transition-all duration-200"
              onClick={() => handleContactClick(contact)}
            >
              {/* Contact Card */}
              <div className="relative h-36 overflow-hidden">
                {/* Title and Description Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center p-12">
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent size={16} weight="fill" />
                    <h3 className="text-md font-sans">{contact.title}</h3>
                  </div>
                  <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                    {contact.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
