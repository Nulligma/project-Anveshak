import type { Request, Response } from "express";
import { Node } from "../models/node.model";
import type { Context } from "hono";

export const createNode = async (c: Context) => {
  try {
    const { creator, title, content } = await c.req.json();
    const post = new Node({ creator, title, content });
    await post.save();
    c.status(201);
    return c.json({ post });
  } catch (error) {
    c.status(400);
    throw error;
  }
};

export const getNodeList = async (c: Context) => {
  try {
    const posts = await Node.find({});
    c.status(200);
    return c.json({ posts });
  } catch (error) {
    c.status(500);
    throw error;
  }
};

export const getNode = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const post = await Node.findById(id);
    if (!post) {
      c.notFound();
    }
    c.status(200);
    return c.json({ post });
  } catch (error) {
    c.status(500);
    throw error;
  }
};

export const updateNode = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const updateData = await c.req.json();
    const post = await Node.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      c.notFound();
    }
    c.status(200);
    return c.json({ post });
  } catch (error) {
    c.status(400);
    throw error;
  }
};

export const deleteNode = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const post = await Node.findByIdAndDelete(id);
    if (!post) {
      c.notFound();
    }
    c.status(200);
    return c.json({ post });
  } catch (error) {
    c.status(500);
    throw error;
  }
};
