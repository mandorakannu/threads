import { User } from "@clerk/nextjs/server";
import { connectToDatabase } from "@database/connection";
import UserThreads from "@models/threads/threads";
import React, { cache } from "react";
import { IThread } from "@ts/IThreads";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default async function UserThread({ user }: { user?: User }) {
  const getThreads = cache(async () => {
    await connectToDatabase();
    if (!user) {
      try {
        const allThreads: IThread[] | null = await UserThreads.find({});
        return allThreads;
      } catch (error: unknown) {
        console.log(error);
      }
    } else {
      try {
        const getUser: IThread | null = await UserThreads.findOne({
          username: user.username,
        });
        if (!getUser) return [];
        return {
          threads: getUser.threads,
        };
      } catch (error: unknown) {
        console.log(error);
      }
    }
  });
  if (user) {
    const threads = (await getThreads()) as Partial<IThread>;
    return (
      <>
        {user ? (
          <div className="h-1/2 overflow-y-scroll">
            {threads.threads !== undefined &&
              threads?.threads.map((thread, index) => (
                <div
                  key={index}
                  className="flex-row-center gap-5 bg-secondary-100 py-5 px-6 rounded-md my-10"
                >
                  <Image
                    src={user.imageUrl}
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
    const threads = (await getThreads()) as IThread[];
    return (
      <>
        {threads?.map((thread, index) => (
          <div
            key={index}
            className="flex-row-center gap-5 bg-secondary-100 py-5 px-6 rounded-md my-10"
          >
            <Image
              src={thread.imageLink}
              alt="User Image"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col justify-start">
              <Link href={`/user/${thread.username}`}>@{thread.username}</Link>
              <span className="text-sm">{thread.threads.at(-1)}</span>
            </div>
          </div>
        ))}
      </>
    );
  }
}
