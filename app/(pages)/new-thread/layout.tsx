import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Thread | Threads | Kannu Mandora",
  description:
    "This is the Create New Thread page. In this page user create their own threads. This thread clone is made by Kannu Mandora. Kannu Mandora is a full stack developer.",
  keywords: "profile, user, clerk, nextjs, kannu, mandora",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  <>{children}</>;
}
