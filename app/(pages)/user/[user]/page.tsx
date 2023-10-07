import React from "react";
import Image from "next/image";
import threads from "@models/threads/threads";
import { connectToDatabase } from "@database/connection";

type Props = {
  params: {
    user: string;
  };
};
export default async function User({ params: { user } }: Props) {
  const getUserProfile = async () => {
    await connectToDatabase();
    const userProfile = await threads.findOne({ username: user });
    return userProfile;
  };
  const userData = await getUserProfile();
  return (
    <section className="flex-row-center gap-5">
      <Image
        src={userData.imageLink}
        alt=""
        width={80}
        height={80}
        className="rounded-full w-20 h-20"
      />
      <div className="flex flex-col items-start">
        <h1>
          {userData.firstName} {userData.lastName}
        </h1>
        <h2 className="text-shade-100">@{userData.username}</h2>
        <p id="user_bio">{}</p>
      </div>
    </section>
  );
}
