import { ReactScan } from "@/lib/react-scan";
import "./globals.css";
import { geistSans, geistMono } from "./fonts";

export const metadata = {
  title: "Student - Developer",
  icons: {
    icon: "/images/converted.png",
    shortcut: "/images/converted.png",
  },
  description:
    "Portfolio of Arman Kar, full stack developer and AI enthusiast. Explore web projects, real-time apps, and tech content. Connect on GitHub, LinkedIn, and Twitter.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReactScan />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}