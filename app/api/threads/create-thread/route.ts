import { connectToDatabase } from "@database/connection";
import users from "@models/users/users";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { connection } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // * content type is text/plain because we are sending a string not an object. *//
    const content = await request.text();
    const { emailAddresses, username } = (await currentUser()) as User;
    const email = emailAddresses[0].emailAddress;
    if (!content || !email || !username)
      return NextResponse.json(
        { message: "Email Or Username Or Content is empty" },
        { status: 400 }
      );
    if (connection.readyState === 1) {
      return await updateUser(username, content);
    } else {
      await connectToDatabase();
      return await updateUser(username, content);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error.", error },
      { status: 500 }
    );
  }
}

const updateUser = async (username: string, content: string) => {
  const user = await users.findOneAndUpdate(
    { username },
    { $push: { threads: content } }
  );
  return !user
    ? NextResponse.json({ message: "Something went wrong." }, { status: 400 })
    : NextResponse.json({ message: "New thread created." }, { status: 201 });
};
