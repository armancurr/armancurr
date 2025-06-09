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
    // The leading newline in the template literal adds some space, which is nice.
    // The <pre> tag preserves the whitespace and formatting.
    <pre className="text-green-400 font-mono text-xs leading-tight">
      {welcomeBanner}
    </pre>
  );
};
