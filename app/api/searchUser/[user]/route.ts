import { NextRequest, NextResponse } from "next/server";
import { ConnectionStates } from "mongoose";
import threads from "@models/threads/threads";
import { connectToDatabase } from "@database/connection";
export async function GET(
  request: NextRequest,
  context: { params: any },
  response: NextResponse
) {
  const { user } = context.params; //? Get the user from the url
  if (!user)
    return NextResponse.json({ error: "No user provided" }, { status: 400 });
  if (ConnectionStates.connected) {
    return await getUser(user);
  } else {
    await connectToDatabase();
    return await getUser(user);
  }
}

const getUser = async (user: string) => {
  const user_profile = await threads.findOne({ username: user });
  return user_profile !== null
    ? NextResponse.json(user_profile)
    : NextResponse.json({ error: "User not found" }, { status: 404 });
};
