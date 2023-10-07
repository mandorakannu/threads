import mongoose, { Schema } from "mongoose";

const newThreads = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  thread: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models?.newThread ||
  mongoose.model("newThread", newThreads);
