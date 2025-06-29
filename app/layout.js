import { Funnel_Sans } from "next/font/google";
import "./globals.css";

const funnel_sans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "armancurr - personal website",
  icons: {
    icon: "/armancurr.png",
    shortcut: "/armancurr.png",
  },
  description: "Arman's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${funnel_sans.variable} antialiased bg-[#898AC4]`}>
        {children}
      </body>
    </html>
  );
}
