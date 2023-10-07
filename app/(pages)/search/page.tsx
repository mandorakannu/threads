"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Loader from "@ui/Loader";
import { search } from "@shared_ui/Images";
import React, { useState, useRef } from "react";

interface IUser {
  _id: string;
  username: string;
  imageLink: string;
}

export default function Search() {
  const [getUser, setUser] = useState<null | IUser>(null);
  const [isUser, setIsUser] = useState("");
  const [loader, setLoader] = useState<boolean>(false);
  const searchUserRef = useRef<HTMLInputElement>(null);

  const searchUser = async () => {
    try {
      setLoader(true);
      const user = searchUserRef.current?.value;
      const getUser = await axios.get(`/api/searchUser/${user}`);
      if (getUser.status === 200) {
        setUser(getUser.data as IUser);
      } else {
        setIsUser("User not found");
      }
    } catch (error) {
      setIsUser("User not found");
    } finally {
      setLoader(false);
    }
  };
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
            ref={searchUserRef}
          />
          <button
            type="button"
            className="mx-2 bg-primary-500 px-5 py-3 rounded-md"
            onClick={searchUser}
          >
            Search
          </button>
        </section>
        <section id="people_account">
          {loader ? (
            <div className="grid place-items-center">
              <Loader />
            </div>
          ) : getUser ? (
            <div
              key={getUser._id}
              className="flex-row-between gap-5 bg-secondary-100 py-5 px-6 rounded-md my-10 w-4/5"
            >
              <div className="flex-row-center gap-4">
                <Image
                  width={40}
                  height={40}
                  src={getUser.imageLink}
                  className="w-10 h-10 object-cover rounded-full"
                  alt={`${getUser.username} Profile Image`}
                />
                <span>{getUser.username}</span>
              </div>
              <Link
                href={`/user/${getUser.username}`}
                className="bg-primary-500 py-2 px-6 rounded"
              >
                View
              </Link>
            </div>
          ) : (
            <p>{isUser}</p>
          )}
        </section>
      </div>
    </>
  );
}
