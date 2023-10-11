"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { IUser } from "@ts/IUser";
import { search } from "@shared_ui/Images";
import React, { useState, useRef, useEffect, cache } from "react";

export const revalidate = 30;

export default function Search() {
  const [getAllUsers, setAllUsers] = useState<null | IUser[]>(null);
  const [getUser, setUser] = useState<null | IUser>({} as IUser);
  const searchUserRef = useRef<HTMLInputElement>(null);

  const getUsers = cache(async () => {
    try {
      const users = await axios.get("/api/getAllUsers");
      if (users.status === 200) {
        setAllUsers(users.data as IUser[]);
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (getAllUsers === null) getUsers();
  }, []);

  const searchUser = async () => {
    getAllUsers?.filter((user) => {
      if (searchUserRef.current?.value === user.username) {
        setUser(user);
      }
    });
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
            className="bg-secondary-300 w-full py-3 pl-12 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Search for people"
            onChange={() => searchUser()}
            ref={searchUserRef}
          />
        </section>
      </div>
      {getUser && getUser.username && (
        <div
          key={getUser._id}
          className="flex-row-between gap-5 bg-secondary-100 py-5 px-6 rounded-md my-10 sm:w-full"
        >
          <div className="flex-row-center gap-4">
            <Image
              width={40}
              height={40}
              src={getUser.imageUrl}
              className="w-10 h-10 rounded-full"
              alt={`${getUser.firstName.at(0)} ${getUser.lastName.at(0)}.`}
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
      )}
      {getAllUsers &&
        getUser?.username === undefined &&
        getAllUsers.map(({ _id, firstName, lastName, imageUrl, username }) => (
          <div
            key={_id}
            className="flex-row-between gap-5 bg-secondary-100 py-5 px-6 rounded-md my-10 sm:w-full"
          >
            <div className="flex-row-center gap-4">
              <Image
                width={40}
                height={40}
                src={imageUrl}
                className="w-10 h-10 rounded-full"
                alt={`${firstName.at(0)} ${lastName.at(0)}.`}
              />
              <span>{username}</span>
            </div>
            <Link
              href={`/user/${username}`}
              className="bg-primary-500 py-2 px-6 rounded"
            >
              View
            </Link>
          </div>
        ))}
    </>
  );
}
