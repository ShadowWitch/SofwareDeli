import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const orderItemSchema = z
	.object({
		name: z.string().min(3).max(255),
		description: z.string().min(3).max(255),
		company_id: z.string().uuid(),
	})
	.merge(genericSchema.partial());

export const partialOrderItemSchema = orderItemSchema.partial();
