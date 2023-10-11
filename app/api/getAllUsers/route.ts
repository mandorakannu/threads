import { NextRequest, NextResponse } from "next/server";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "@database/connection";
import users from "@models/users/users";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    await connectToDatabase();
    const allUsers = await users.find({});
    await disconnectFromDatabase();
    return NextResponse.json(allUsers);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
