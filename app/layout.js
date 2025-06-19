import { Funnel_Sans } from "next/font/google";
import "./globals.css";

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Arman's Portfolio",
  description: "Arman's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${funnelSans.variable} antialiased bg-[#898AC4]`}>
        {children}
      </body>
    </html>
  );
}
