import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
  keywords: [
    "portfolio",
    "terminal",
    "developer",
    "full-stack",
    "react",
    "typescript",
    "next.js",
  ],
  authors: [{ name: "Arman" }],
  openGraph: {
    title: "Arman's Terminal Portfolio",
    description: "Interactive terminal-based portfolio - Navigate like a pro!",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arman's Terminal Portfolio",
    description: "Interactive terminal-based portfolio - Navigate like a pro!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950`}
      >
        {children}
      </body>
    </html>
  );
}
