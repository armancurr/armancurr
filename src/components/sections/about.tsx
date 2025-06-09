"use client";
import React, { useState, useEffect } from "react";

const Typewriter = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export const About: React.FC = () => {
  const asciiArt = `
    /\\
   /  \\
  / /\\ \\
 / ____ \\
/_/    \\_\\
`;

  const aboutData = [
    { label: "NAME", value: "Arman" },
    { label: "TITLE", value: "Passionate Developer" },
    { label: "FOCUS", value: "Creating amazing web experiences" },
    {
      label: "MISSION",
      value: "Building solutions that make a difference",
    },
  ];

  return (
    <div className="flex flex-row gap-8 pt-2">
      <pre className="font-mono text-sm text-green-400">{asciiArt}</pre>

      <div className="flex flex-col font-mono text-sm">
        {aboutData.map((item, index) => (
          <div key={index} className="flex">
            <span className="w-24 text-neutral-500">{item.label}</span>
            <span className="text-neutral-200">
              <Typewriter text={item.value} speed={25} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
