import {
  connectToDatabase,
  disconnectFromDatabase,
} from "@database/connection";
import users from "@models/users/users";
import { User, currentUser } from "@clerk/nextjs/server";
export default async function StoreUser() {
  const user: User | null = await currentUser();
  await connectToDatabase();
  try {
    if (user) {
      const { firstName, lastName, emailAddresses, username, imageUrl } = user;
      const userExists = await users.findOne({
        email: emailAddresses[0].emailAddress,
      });
      if (userExists) {
        return null;
      } else {
        await users.create({
          firstName,
          lastName,
          email: emailAddresses[0].emailAddress,
          username,
          imageUrl,
        });
        await disconnectFromDatabase();
      }
    }
  } catch (error) {
    return null;
  }

  return null;
}
