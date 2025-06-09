import type { Metadata } from "next";
import { Funnel_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arman's Terminal Portfolio",
  icons: {
    icon: "/favicon-modified.png",
    shortcut: "/favicon-modified.png",
  },
  description:
    "Interactive terminal-based portfolio showcasing full-stack development skills, projects, and experience. Navigate like a pro with command-line interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${funnelSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-neutral-100`}
      >
        {children}
      </body>
    </html>
  );
}
