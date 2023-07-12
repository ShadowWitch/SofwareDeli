import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const orderSchema = z
	.object({
		code: z.string().min(1).max(255),
		name: z.string().min(1).max(255),
		quantity: z.number().min(1).max(255),
		price: z.number().min(1).max(255),
		available: z.boolean().default(true),
		provider_id: z.string().uuid(),
		customer_id: z.string().uuid(),
		type: z.enum(["PURCHASE", "SALE", "OTHER"]),
		transaction_id: z.string().uuid(),
		notes: z.string().min(1).max(255).optional(),
		status: z.enum(["PENDING", "PAID", "CANCELLED"]),
		total: z.number().min(1).max(255),
	})
	.merge(genericSchema.partial());

export const partialOrderSchema = orderSchema.partial();
