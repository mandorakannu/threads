import {
  connectToDatabase,
  disconnectFromDatabase,
} from "@database/connection";
import users from "@models/users/users";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { ConnectionStates } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // * content type is text/plain because we are sending a string not an object. *//
    const content = await request.text();
    const { emailAddresses, username, imageUrl } =
      (await currentUser()) as User;
    const email = emailAddresses[0].emailAddress;
    if (!content || !email || !username)
      return NextResponse.json(
        { message: "Email Or Username Or Content is empty" },
        { status: 400 }
      );
    if (ConnectionStates.connected) {
      await users.findOneAndUpdate(
        { username },
        { $push: { threads: content } }
      );
    } else {
      await connectToDatabase();
      await users.findOneAndUpdate(
        { username },
        { $push: { threads: content } }
      );
    }
    disconnectFromDatabase();
    return NextResponse.json(
      { message: "New thread created." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error.", error },
      { status: 500 }
    );
  }
}
