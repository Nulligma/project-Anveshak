import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import connectDB from "./config/db";
import { errorHandler, notFound } from "./middlewares/errorMiddlewares";
import userRoute from "./routes/user.route";
import nodeRoute from "./routes/node.route";

export const app = new Hono().basePath("/api/v1");

// Config MongoDB
connectDB();

// Initialize middlewares
app.use("*", logger(), prettyJSON());

// Cors
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Home Route
app.get("/", (c) => c.text("Welcome to the API v1!"));

app.route("/node", nodeRoute);
app.route("/user", userRoute);

// Error Handler
app.onError((err, c) => {
  const error = errorHandler(c);
  return error;
});

// Not Found Handler
app.notFound((c) => {
  const error = notFound(c);
  return error;
});
