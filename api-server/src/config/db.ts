import mongoose from "mongoose";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { verifiedEnv } from "../lib/env";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(verifiedEnv.MONGODB_URI, {
      autoIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    const pg = drizzle(postgres(verifiedEnv.PG_URI));
    return pg;
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
