import Link from "next/link";
import Image from "next/image";
import newThreads from "@models/threads/threads";
import { connectToDatabase } from "@database/connection";
import { cache } from "react";

interface IThread {
  _id: string;
  username: string;
  threads: Array<string>;
  imageLink: string;
}
export const revalidate = 5;

const getUsers = cache(async () => {
  try {
    await connectToDatabase();
    const allThreads = await newThreads.find({});
    if (!allThreads) return [];
    return allThreads;
  } catch (error: unknown) {
    console.log(error);
  }
});

export default async function AllUserThreads() {
  const threads = (await getUsers()) as IThread[];
  return (
    <>
      {threads.map(({ username, threads, imageLink }) => {
        return threads.map((thread: string, index: number) => (
          <div
            key={index}
            className="flex-row-center gap-5 bg-secondary-100 py-5 px-6 rounded-md mb-10"
          >
            <Image
              src={imageLink}
              alt="User Image"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col justify-start">
              <Link href={`/user/${username}`}>@{username}</Link>
              <span className="text-sm">{thread}</span>
            </div>
          </div>
        ));
      })}
    </>
  );
}
