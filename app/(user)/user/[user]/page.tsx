import React from "react";
import users from "@models/users/users";
import UserThread from "@pages/profile/UserThreads";
import { UserProfile } from "@pages/profile/UserProfile";
import { ProfileTabs } from "@pages/profile/ProfileTabs";
import { connectToDatabase, disconnectFromDatabase } from "@database/connection";
export default async function RootUser({
  params: { user },
}: {
  params: { user: string };
}) {
  await connectToDatabase();
  const getUser = await users.findOne({ username: user });
// ? This is a hack to get around the fact that the user object is not serializable.
  const rootUser = JSON.parse(JSON.stringify(getUser));
  await disconnectFromDatabase();
  return (
    <>
      <section className="py-6">
        <UserProfile user={rootUser} />
      </section>
      <ProfileTabs />
      <UserThread user={rootUser} />
    </>
  );
}
