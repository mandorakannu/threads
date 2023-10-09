import {
  connectToDatabase,
  disconnectFromDatabase,
} from "@database/connection";
import { connection } from "mongoose";
import clients from "@models/contact/contact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { name, email, message } = await request.json();
    if (connection.readyState === 1) {
      return await createClient(name, email, message);
    } else {
      await connectToDatabase();
      return await createClient(name, email, message);
    }
    disconnectFromDatabase();
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}

const createClient = async (name: string, email: string, message: string) => {
  try {
    const user = await clients.create({
      name,
      email,
      message,
    });
    return !user
      ? NextResponse.json({ message: "Something went wrong." }, { status: 400 })
      : NextResponse.json(
          { message: "Clients Details Saved." },
          { status: 200 }
        );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
};
