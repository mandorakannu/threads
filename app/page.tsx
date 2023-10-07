import AllUserThreads from "@pages/home/AllUserThreads";
import StoreUser from "@pages/home/Store-User";

export default async function Home() {
  return (
    <>
      <StoreUser />
      <AllUserThreads />
    </>
  );
}
