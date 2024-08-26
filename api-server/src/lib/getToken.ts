import { Jwt } from "hono/utils/jwt";
import { verifiedEnv } from "./env";

const genToken = (id: string) => {
  return Jwt.sign({ id }, verifiedEnv.JWT_SECRET);
};

export default genToken;
