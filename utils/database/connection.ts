import { connect, disconnect } from "mongoose";

export const connectToDatabase = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    if (!MONGO_URI) throw new Error("MONGO_URI is not defined");
    await connect(MONGO_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await disconnect();
    console.log("Disconnected from database");
  } catch (error) {
    console.log("Error disconnecting from database", error);
  }
};
