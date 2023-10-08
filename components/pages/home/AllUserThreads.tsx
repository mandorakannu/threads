import UserThread from "@pages/profile/UserThreads";

export const revalidate = 5;

export default async function AllUserThreads() {
  return <UserThread />;
}
