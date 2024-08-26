import connectDB from "./src/config/db";
import { app } from "./src/honoApp";
import { verifiedEnv } from "./src/lib/env";

export const pg = await connectDB();

const port = verifiedEnv.PORT || 8000;

export default {
  port,
  fetch: app.fetch,
};
