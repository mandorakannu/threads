import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me ❤️ | Threads | Kannu Mandora",
  description:
    "This is the Contact Me page. This is contact page of the Threads app. This page is created by Kannu Mandora. This page is created using Next.js and Tailwind CSS. It is a full stack application. It is a simple application where you can create threads and comment on them.",
  keywords: "profile, user, clerk, nextjs, kannu, mandora",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  <>{children}</>;
}
