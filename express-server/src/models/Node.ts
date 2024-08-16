import { Schema, model } from "mongoose";

const nodeSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: String,
  parentNode: String,
  childNodes: Array<String>,
  createdAt: { type: Date, default: Date.now },
});

export const Node = model("nodes", nodeSchema);
