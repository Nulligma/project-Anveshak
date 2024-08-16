import type { Request, Response } from "express";
import { Node } from "../models/Node";
import type { Context } from "hono";

export const createNode = async (req: Request, res: Response) => {
  try {
    const { author, title, content } = req.body;
    const post = new Node({ author, title, content });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getNodeList = async (req: Request, res: Response) => {
  try {
    console.log("getting node");
    // const posts = await Node.find({});
    res.status(200).send({ posts: "yolo" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getNode = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Node.findById(id);
    if (!post) {
      res.status(404).send();
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateNode = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Node.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      res.status(404).send();
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteNode = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Node.findByIdAndDelete(id);
    if (!post) {
      res.status(404).send("Post wasn't found");
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};
