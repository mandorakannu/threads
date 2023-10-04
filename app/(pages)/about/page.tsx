import Link from "next/link";
import React from "react";
import { Outfit } from "next/font/google";
import Image from "next/image";
const font = Outfit({
  weight: ["400", "500", "700"],
  subsets: ["latin-ext"],
});
function About() {
  const url = process.env.ABOUT_PROFILE_IMAGE_URL;
  if (!url) throw new Error("About page Profile image url not found");
  return (
    <>
      <section
        className={`${font.className} flex-col-center justify-center gap-8 h-[70dvh]`}
      >
        <Image
          src={url}
          width={100}
          height={20}
          alt="Kannu Mandora Profile Picture"
          className="rounded-full w-32 h-32"
        />
        <h1 className="text-5xl">Hi!, I am Kannu Mandora</h1>
        <p>
          {" "}
          I am a full stack developer, I have 2 years of experience in web
          development.
        </p>
        <p>
          I have worked on various technologies like React, Angular, Node,
          Express, MongoDB, MySQL, etc.
        </p>
        <p>I am a quick learner and always ready to learn new technologies.</p>
        <p>I am a team player and always ready to help my team members.</p>
        <div>
          <Link
            className="
        hover:bg-shade-200
        text-white
        font-bold
        py-3
        px-6
        rounded
        mr-4
        "
            href="/"
          >
            Home
          </Link>
          <Link
            className="
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-3
        px-6
        rounded
        "
            href="https://www.mandorakannu.tech/"
          >
            Portfolio
          </Link>
        </div>
      </section>
    </>
  );
}

export default About;
