"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { search } from "@shared_ui/Images";
export default function Search() {
  const [getAllUsers, setAllUsers] = useState([]);
  useEffect(() => {
    //todo need to get all users list {function}
  }, []);

  return (
    <>
      <div>
        <h1 className="mb-10 text-3xl">Search</h1>
        <section className="relative">
          <Image
            src={search}
            alt="search"
            width={20}
            height={20}
            className="absolute top-3.5 left-4 brightness-75"
          />
          <input
            type="search"
            name="people_search"
            id="search_field"
            className="bg-secondary-300 w-4/5 py-3 pl-12 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Search for people"
          />
        </section>
        <section id="people_account">
          {/* //todo need to create all users list visible  */}
        </section>
      </div>
    </>
  );
}
