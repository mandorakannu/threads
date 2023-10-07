import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
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
});
export default mongoose.models?.user || mongoose.model("user", userSchema);
