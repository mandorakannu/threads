import React from "react";
import { reply, members, tag } from "@shared_ui/Images";
import Image from "next/image";
import Link from "next/link";
export function ProfileTabs() {
  const tabs = [
    {
      text: "Threads",
      imageUrl: reply,
      link: "#threads",
    },
    {
      text: "Replies",
      imageUrl: members,
      link: "#replies",
    },
    {
      text: "Tagged",
      imageUrl: tag,
      link: "#tagged",
    },
  ];
  return (
    <>
      <div className="flex-row-between w-full bg-secondary-300 px-4 sm:px-8 py-4 rounded">
        {tabs.map(({ text, imageUrl, link }, index) => (
          <Link href={link} key={index} className="flex-row-center gap-2">
            <Image src={imageUrl} alt={imageUrl} />
            <span>{text}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
