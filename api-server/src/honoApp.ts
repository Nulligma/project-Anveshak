import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { errorHandler, notFound } from "./middlewares/errorMiddlewares";
import userRoute from "./routes/user.route";
import nodeRoute from "./routes/node.route";
import { rateLimiter } from "hono-rate-limiter";

export const app = new Hono().basePath("/api/v1");

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

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    keyGenerator: (c) => "<unique_key>", // Method to generate custom identifiers for clients.
    // store: ... , // Redis, MemoryStore, etc. See below.
  })
);

// Home Route
app.get("/", (c) => c.text("Welcome to the API v1!"));

app.get("/healthcheck", (c) => {
  return c.json({
    message: "Server is running",
    uptime: Bun.nanoseconds() / 60000000000,
    timestamp: Date.now(),
  });
});

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
