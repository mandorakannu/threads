import Link from "next/link";
import React, { memo } from "react";
import { AiFillGithub as GitHub } from "react-icons/ai";
import { RiTwitterXLine as Twitter } from "react-icons/ri";
import { BsLinkedin as Linkedin } from "react-icons/bs";
import { BsInstagram as Instagram } from "react-icons/bs";

function SocialIcons() {
  const icons = [
    {
      name: "Twitter",
      link: "https://twitter.com/mandorakannu",
      icon: (
        <Twitter className="text-2xl hover:text-blue-500 active:text-blue-500 transition-colors ease-in-out delay-75" />
      ),
    },
    {
      name: "GitHub",
      link: "https://github.com/mandorakannu",
      icon: (
        <GitHub className="text-2xl hover:text-gray-500 active:text-gray-500 transition-colors ease-in-out delay-75" />
      ),
    },
    {
      name: "LinkedIn",
      link: "https://linkedin.com/in/mandorakannu",
      icon: (
        <Linkedin className="text-2xl hover:text-blue-500 active:text-blue-500 transition-colors ease-in-out delay-75" />
      ),
    },
    {
      name: "Instagram",
      link: "https://instagram.com/mandorakannu",
      icon: (
        <Instagram className="text-2xl hover:text-pink-500 active:text-pink-500 transition-colors ease-in-out delay-75" />
      ),
    },
  ];
  return (
    <div className="flex flex-row justify-center items-center gap-3">
      {icons.map(({ name, link, icon }, index) => (
        <Link
          href={link}
          key={index}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="hover:text-primary-500 active:text-primary-500 transition-colors duration-100 ease-linear"
        >
          {icon}
        </Link>
      ))}
    </div>
  );
}

export default memo(SocialIcons);
