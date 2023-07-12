import * as z from "zod";
import { genericSchema } from "./generic";

export const providerSchema = z
	.object({
		enabled: z.boolean().optional(),
		name: z.string().min(2).max(255),
		email: z.string().email().optional(),
		bussiness_id: z.string().min(1).max(255).optional(),
	})
	.merge(genericSchema.partial());

export type Provider = z.infer<typeof providerSchema>;
