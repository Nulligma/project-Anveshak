import { app } from "./src/honoApp";

const port = Bun.env.PORT || 8000;

export default {
  port,
  fetch: app.fetch,
};
