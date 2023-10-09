import { cache } from "react";
import { Metadata } from "next";
import { User } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs";
import { UserProfile } from "@pages/profile/UserProfile";
import { ProfileTabs } from "@pages/profile/ProfileTabs";
import UserThread from "@pages/profile/UserThreads";

export const metadata: Metadata = {
  title: "User Profile Page | Threads | Kannu Mandora",
  description:
    "This is the user profile page. It shows the user's profile. This thread clone is made by Kannu Mandora. Kannu Mandora is a full stack developer.",
  keywords: "profile, user, clerk, nextjs, kannu, mandora",
};

export default async function UserProfileView() {
  const getUser = cache(async () => {
    return await currentUser();
  });
  const user: User | null = await getUser();
  const rootUser = JSON.parse(JSON.stringify(user));
  return (
    user?.id && (
      <>
        <UserProfile user={rootUser} />
        <hr className="my-6 border border-primary-500" />
        <ProfileTabs />
        <UserThread user={rootUser} />
      </>
    )
  );
}
