"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { logout } from "@shared_ui/Images";
export function SignOut() {
  const router = useRouter();
  return (
    <SignedIn>
      <SignOutButton signOutCallback={() => router.push("/sign-in")}>
        <div className="flex cursor-pointer gap-4 p-4  bg-secondary-50 my-6 hover:bg-secondary-100 transition-colors delay-75 ease-in-out rounded">
          <Image src={logout} alt="logout" width={24} height={24} />
          <p className="text-light-2">Log Out</p>
        </div>
      </SignOutButton>
    </SignedIn>
  );
}
