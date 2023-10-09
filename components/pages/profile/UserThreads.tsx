import Link from "next/link";
import Image from "next/image";
import React, { cache } from "react";
import { IUser } from "@ts/IUser";
import users from "@models/users/users";
import { User } from "@clerk/nextjs/server";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "@database/connection";

export const revalidate = 60;

export default async function UserThread({ user }: { user?: User }) {
  const fallbackImageUrl = process.env.FALLBACK_IMAGE_URL;
  const getThreads = cache(async () => {
    await connectToDatabase();
    if (!user) {
      try {
        const allThreads: IUser[] | null = await users.find({});
        return allThreads;
      } catch (error: unknown) {
        console.log(error);
      }
    } else {
      try {
        const getUser = (await users
          .findOne({
            username: user.username,
          })
          .select("threads")) as Partial<IUser> | null;
        if (!getUser) return null;
        return getUser;
      } catch (error: unknown) {
        console.log(error);
        await disconnectFromDatabase();
      }
    }
  });
  if (user) {
    const threads = (await getThreads()) as Partial<IUser>;
    return (
      <>
        {user ? (
          <div className="h-1/2 overflow-y-scroll">
            {threads.threads !== undefined &&
              threads.threads.map((thread, index) => (
                <div
                  key={index}
                  className="flex-row-center gap-5 bg-secondary-100 py-5 px-6 rounded-md my-10"
                >
                  <Image
                    src={user.imageUrl || (fallbackImageUrl as string)}
                    alt="User Image"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col justify-start">
                    <Link href={`/user/${user.username}`}>
                      @{user.username}
                    </Link>
                    <span className="text-sm">{thread}</span>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="h-1/2 overflow-y-scroll"></div>
        )}
      </>
    );
  } else {
    const threads = (await getThreads()) as IUser[];
    return (
      <>
        {threads?.map(({ threads, imageUrl, username }, index) => {
          if (threads.length === 0) return <></>;
          return (
            <div
              key={index}
              className="flex-row-center gap-5 bg-secondary-100 py-5 px-6 rounded-md my-10"
            >
              <Image
                src={imageUrl}
                alt="User Image"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex flex-col justify-start">
                <Link href={`/user/${username}`}>@{username}</Link>
                <span className="text-sm">{threads.at(-1)}</span>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
