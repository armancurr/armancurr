import { Anybody } from "next/font/google";
import "./globals.css";

const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
});

export const metadata = {
  title: "Arman's Portfolio",
  description: "Arman's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${anybody.variable} antialiased bg-[#898AC4]`}>
        {children}
      </body>
    </html>
  );
}
