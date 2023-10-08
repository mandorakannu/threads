import { IUser } from "@ts/IUser";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  threads: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.models?.user || mongoose.model("user", userSchema);
