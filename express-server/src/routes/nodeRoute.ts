import express from "express";

const router = express.Router();

import {
  createNode,
  getNodeList,
  getNode,
  updateNode,
  deleteNode,
} from "../controllers/node.controller";

router.post("/", createNode);
router.get("/:id", getNode);
router.get("/", getNodeList);
router.put("/:id", updateNode);
router.delete("/:id", deleteNode);

export default router;
