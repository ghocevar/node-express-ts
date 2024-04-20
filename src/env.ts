import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production"]).default("development"),
	PORT: z.string().transform(Number).optional(),
	DATABASE_URL: z.string(),
	APP_HOSTNAME: z.string().optional(),
	APP_URL: z.string().optional(),
});

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envSchema> {}
	}
}

try {
	envSchema.parse(process.env);
} catch (err) {
	if (err instanceof z.ZodError) {
		const { fieldErrors } = err.flatten();
		const errorMessage = Object.entries(fieldErrors)
			.map(([field, errors]) =>
				errors ? `${field}: ${errors.join(", ")}` : field,
			)
			.join("\n  ");
		throw new Error(`Missing environment variables:\n  ${errorMessage}`);
	}
}
