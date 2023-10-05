import {
  connectToDatabase,
  disconnectFromDatabase,
} from "@database/connection";
import clients from "@models/contact/contact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { name, email, message } = await request.json();
    await connectToDatabase();
    await clients.create({
      name,
      email,
      message,
    });
    disconnectFromDatabase();
    return NextResponse.json(
      { message: "Clients Details Saved." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
