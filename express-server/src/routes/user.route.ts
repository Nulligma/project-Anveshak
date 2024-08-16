import { Hono } from "hono";
import { isAdmin, protect } from "../middlewares/authMiddlewares";
import * as userControllers from "../controllers/user.controller";

const userRoute = new Hono();

userRoute.get("/", protect, isAdmin, (c) => userControllers.getUsers(c));

// Create User
userRoute.post("/", (c) => userControllers.createUser(c));

// Login User
userRoute.post("/login", (c) => userControllers.loginUser(c));

// Get Single User
userRoute.get("/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ message: `User ${id}` });
});

// Get User Profile
userRoute.get("/profile", (c) => {
  return c.json({ message: "User Profile" });
});

export default userRoute;
