import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	client: {
		NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000/v1"),
		GITHUB_URL: z.string().url().default("https://github.com"),
	},
	runtimeEnv: {
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
	},
});
