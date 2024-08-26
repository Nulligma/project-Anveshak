import { Schema, model, Types } from "mongoose";

const nodeSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    creator: String,
    parentNode: Types.ObjectId,
    childNodes: Array<Types.ObjectId>,
  },
  {
    timestamps: true,
  }
);

export const Node = model("nodes", nodeSchema);
