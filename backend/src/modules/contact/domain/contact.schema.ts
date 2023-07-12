import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const contactSchema = z
	.object({
		email: z.string().email(),
		phone: z.string().min(3).max(255),
		website_url: z.string().url().optional(),
	})
	.merge(genericSchema.partial());

export const partialContactSchema = contactSchema.partial();
