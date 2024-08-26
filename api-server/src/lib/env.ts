import { ZodError, z } from "zod";

const configSchema = z.object({
  PORT: z
    .string()
    .regex(/^\d{4,5}$/)
    .optional()
    .default("3000"),
  API_BASE_URL: z.string().url().default("/api"),
  PG_URI: z
    .string()
    .url()
    .refine(
      (url) => url.startsWith("postgres://") || url.startsWith("postgresql://"),
      "DB_URL must be a valid postgresql url"
    ),
  MONGODB_URI: z
    .string()
    .url()
    .refine(
      (url) => url.startsWith("mongodb://"),
      "DB_URL must be a valid mongodb url"
    ),
  JWT_SECRET: z.string(),
});

type Env = z.infer<typeof configSchema>;

function parseEnv(): Env {
  try {
    return configSchema.parse(Bun.env);
  } catch (error) {
    if (error instanceof ZodError) console.error(error.errors);

    process.exit(1);
  }
}

export const verifiedEnv = parseEnv();
