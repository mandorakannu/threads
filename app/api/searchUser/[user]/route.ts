import { NextRequest, NextResponse } from "next/server";
import { connection } from "mongoose";
import users from "@models/users/users";
import { connectToDatabase } from "@database/connection";
export async function GET(
  request: NextRequest,
  context: { params: any },
  response: NextResponse
) {
  const { user: username } = context.params; //? Get the user from the url
  if (!username)
    return NextResponse.json({ error: "No user provided" }, { status: 400 });
  if (connection.readyState === 1) {
    return await getUser(username);
  } else {
    await connectToDatabase();
    return await getUser(username);
  }
}

const getUser = async (username: string) => {
  const user_profile = await users.findOne({ username });
  return user_profile !== null
    ? NextResponse.json(user_profile)
    : NextResponse.json({ error: "User not found" }, { status: 404 });
};
