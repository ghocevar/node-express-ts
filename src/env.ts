import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production"]).default("development"),
	PORT: z.string().transform(Number),
	DATABASE_URL: z.string(),
	APP_HOSTNAME: z.string().optional(),
	APP_URL: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

export const createEnv = (): Env => envSchema.parse(process.env);
