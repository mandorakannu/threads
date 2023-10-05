import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Threads | Kannu Mandora",
  description:
    "Sign in to Threads to start sharing your thoughts with the world.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="grid place-items-center">{children}</section>;
}
