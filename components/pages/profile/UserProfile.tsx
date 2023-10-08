"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { edit } from "@shared_ui/Images";
import type { User } from "@clerk/nextjs/api";

export async function UserProfile({ user }: { user: User }) {
  const path = usePathname();
  return (
    <div className="flex-row-between gap-5">
      <section className="flex-row-center gap-5">
        {user.imageUrl && (
          <Image
            src={user?.imageUrl as string}
            alt=""
            width={80}
            height={80}
            className="rounded-full w-10 h-10 sm:w-20 sm:h-20"
          />
        )}
        <div className="flex flex-col items-start">
          <h1>
            {user?.firstName} {user?.lastName}
          </h1>
          <h2 className="text-shade-100">@{user?.username}</h2>
        </div>
      </section>
      {path ==="/profile" && <Link
        href="/edit"
        className="bg-secondary-100 hover:bg-secondary-300 px-6 py-2 flex-row-center gap-4 rounded"
      >
        <Image src={edit} alt="Edit Button" />
        <span>Edit</span>
      </Link>}
    </div>
  );
}
