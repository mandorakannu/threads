import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads - Next.js | Kannu Mandora | Full Stack Developer",
  description:
    "This is a Next.js starter with TypeScript, Tailwind CSS, and ESLint and Hi, it's me Kannu Mandora. I want to be a Full Stack Developer. I am currently focused on my skills in React, Node, and Express.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
