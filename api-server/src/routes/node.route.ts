import { Hono } from "hono";
import { isAdmin, protect } from "../middlewares/authMiddlewares";
import * as nodeControllers from "../controllers/node.controller";

const nodeRoute = new Hono();

nodeRoute.post("/", (c) => nodeControllers.createNode(c));

nodeRoute.get("/:id", (c) => nodeControllers.getNode(c));

nodeRoute.get("/", (c) => nodeControllers.getNodeList(c));

nodeRoute.put("/:id", (c) => nodeControllers.updateNode(c));

nodeRoute.delete(":/id", (c) => nodeControllers.deleteNode(c));

export default nodeRoute;
