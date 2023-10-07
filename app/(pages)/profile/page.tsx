import Link from "next/link";
import Image from "next/image";
import edit from "@images/edit.svg";
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User profile | Threads | Kannu Mandora",
  description:
    "This is the user profile page. It shows the user's profile. This thread clone is made by Kannu Mandora. Kannu Mandora is a full stack developer.",
  keywords: "profile, user, clerk, nextjs, kannu, mandora",
};
// todo Create a bio field in Clerk. {Important}

export default async function UserProfile() {
  const user: User | null = await currentUser();
  return (
    <>
      {user?.id ? (
        <div className="flex-row-between gap-5">
          <section className="flex-row-center gap-5">
            <Image
              src={user.imageUrl}
              alt=""
              width={80}
              height={80}
              className="rounded-full w-20 h-20"
            />
            <div className="flex flex-col items-start">
              <h1>
                {user.firstName} {user.lastName}
              </h1>
              <h2 className="text-shade-100">@{user.username}</h2>
              <p id="user_bio">{}</p>
            </div>
          </section>
          <Link
            href="/edit"
            className="bg-secondary-100 hover:bg-secondary-300 px-6 py-2 flex-row-center gap-4 rounded"
          >
            <Image src={edit} alt="Edit Button" />
            <span>Edit</span>
          </Link>
        </div>
      ) : (
        // todo Add a loading spinner Or a unauthorized message or unauthorized Component.
        <></>
      )}
    </>
  );
}
