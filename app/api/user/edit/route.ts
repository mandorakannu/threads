import users from "@models/users/users";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@database/connection";
import { clerkClient, currentUser } from "@clerk/nextjs";
export async function POST(request: NextRequest, response: NextResponse) {
  const [user, username] = await Promise.all([currentUser(), request.text()]);
  const params = { username: username };
  try {
    await connectToDatabase();
    const isUser = await users.findOne({ username: username });
    if (!isUser) {
      const [clerkUser, dbUser] = await Promise.all([
        clerkClient.users.updateUser(user?.id!, params),
        users.findOneAndUpdate(
          { email: user?.emailAddresses[0]?.emailAddress },
          {
            username: username === "" ? user?.username : username,
          }
        ),
      ]);
      if (!clerkUser || !dbUser) {
        return NextResponse.json(
          { message: "Clerkjs Or Database updating error" },
          { status: 503 }
        );
      } else {
        return NextResponse.json(
          { message: "User details updated" },
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
