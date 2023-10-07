import { connect, disconnect } from "mongoose";

export const connectToDatabase = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  const LOCAL_MONGO_URI = process.env.LOCAL_MONGO_URI;
  try {
    if (process.env.NODE_ENV === "development") {
      if (!LOCAL_MONGO_URI) throw new Error("LOCAL_MONGO_URI is not defined");
      await connect(LOCAL_MONGO_URI);
      console.log("Connected to Local Database");
    } else {
      if (!MONGO_URI) throw new Error("MONGO_URI is not defined");
      await connect(MONGO_URI);
    }
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
