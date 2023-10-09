import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Progressbar } from "@ui/Progressbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Sidebar } from "@shared_ui/navigation/Sidebar";
import { Navigation } from "@shared_ui/navigation/Navbar";
import { Providers as ChakraProvider } from "@ui/ChakraProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads - Next.js | Kannu Mandora | Full Stack Developer",
  description:
    "This is thread web app with Next.js, TypeScript, Tailwind CSS, and ESLint. In this web app you can create threads and comment on them. You can also like and dislike the threads and comments. You can also delete the threads and comments. You can also edit the threads and comments. You can also search the threads and comments.",
  keywords: [
    "Kannu",
    "Kannu Mandora",
    "Mandora",
    "Web Developer",
    "Full Stack",
    "MERN Stack",
    "Stack",
    "Full Stack Developer",
    "Mandora Kannu",
    "tech blogger",
    "developer",
    "web development",
    "software engineering",
    "programming languages",
    "Threads",
    "Threads App",
    "Threads Web App",
    "Threads Web Application",
    "Threads Web Application with Next.js",
    "Threads Web Application with Next.js and TypeScript",
    "Threads Web Application with Next.js and TypeScript and Tailwind CSS",
    "Threads Web Application with Next.js and TypeScript and Tailwind CSS and ESLint",
    "Threads Web Application with Next.js and TypeScript and Tailwind CSS and ESLint and Jest",
    "Threads Web Application with Next.js and TypeScript and Tailwind CSS and ESLint and Jest and React Testing Library",
    "Threads Web Application with Next.js and TypeScript and Tailwind CSS and ESLint and Jest and React Testing Library and Storybook",
    "Threads Web Application with Next.js and TypeScript and Tailwind CSS and ESLint and Jest and React Testing Library and Storybook and React Query",
  ],
  authors: [{ name: "Kannu Mandora" }],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://threads.mandorakannu.tech",
    title: "Threads | Kannu Mandora | Full Stack Developer",
    description:
      "This is thread web app with Next.js, TypeScript, Tailwind CSS, and ESLint. In this web app you can create threads and comment on them. You can also like and dislike the threads and comments. You can also delete the threads and comments. You can also edit the threads and comments. You can also search the threads and comments.",
    images: [
      {
        url: "https://threads.mandorakannu.tech/main.jpg",
        width: 1200,
        height: 630,
        alt: "Threads | Kannu Mandora | Full Stack Developer",
      },
    ],
    siteName: "Threads | Kannu Mandora | Full Stack Developer",
    countryName: "India",
    emails: ["mandorakannu@gmail.com", "mandorakannu.dev@gmail.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Threads | Kannu Mandora | Full Stack Developer",
    description:
      "This is thread web app with Next.js, TypeScript, Tailwind CSS, and ESLint. In this web app you can create threads and comment on them. You can also like and dislike the threads and comments. You can also delete the threads and comments. You can also edit the threads and comments. You can also search the threads and comments.",
    siteId: "@mandorakannu",
    creator: "@KannuMandora",
    creatorId: "1467726470533754880",
    images: ["https://threads.mandorakannu.tech/main.jpg"],
    site: "@mandorakannu",
  },
  verification: {
    google: "_RMbn1Udckop0qHdoAu_PoiGFWqwB19CecNEqZfHxAE",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["mandorakannu@gmail.com"],
    },
  },
  icons: [
    {
      href: "/favicon.ico",
      rel: "icon",
      type: "image/x-icon",
      url: "/favicon.ico",
    },
  ],
  publisher: "Kannu Mandora",
  generator: "Next.js",
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
          <Progressbar />
          <ChakraProvider>
            <Navigation />
            <div className="flex flex-row">
              <Sidebar />
              <div className="flex min-h-screen flex-1 flex-col items-center pb-10 pt-28 max-md:pb-32 bg-secondary-200 text-white">
                <div className="w-full max-w-7xl px-4">
                  {children}
                  <Analytics />
                </div>
              </div>
            </div>
          </ChakraProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
