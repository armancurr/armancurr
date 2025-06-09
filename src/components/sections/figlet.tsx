import type React from "react";

// The banner text is now a static string
const welcomeBanner = `
 __        __   _
 \\ \\      / /__| | ___ ___  _ __ ___   ___
  \\ \\ /\\ / / _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\
   \\ V  V /  __/ | (_| (_) | | | | | |  __/
    \\_/\\_/ \\___|_|\\___\\___/|_| |_| |_|\\___|
`;

export const Figlet: React.FC = () => {
  return (
    <div>
      <pre className="text-green-400 font-mono text-xs leading-tight">
        {welcomeBanner}
      </pre>
      <div className="text-neutral-400 text-sm mt-2 font-sans">
        Welcome to the interactive portfolio terminal
      </div>
      <div className="text-neutral-500 text-xs mt-1 font-sans">
        Type 'help' to get started
      </div>
    </div>
  );
};
