import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers as ChakraProvider } from "@ui/ChakraProvider";
import { Navigation } from "@shared_ui/navigation/Navbar";
import { Sidebar } from "@shared_ui/navigation/Sidebar";
const inter = Inter({ subsets: ["latin"] });

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
        <body className={inter.className}>
          <ChakraProvider>
            <Navigation />
            <div className="flex flex-row">
              <Sidebar />
              <section className="flex min-h-screen flex-1 flex-col items-center pb-10 pt-28 max-md:pb-32 bg-secondary-200 text-white">
                <div className="w-full max-w-7xl px-4">{children}</div>
              </section>
            </div>
          </ChakraProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
