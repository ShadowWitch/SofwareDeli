import * as z from "zod";
import { genericSchema } from "./generic";

export const saleSchema = z
	.object({
		created_by: z.string().uuid().optional(),
		order_id: z.string().uuid().optional(),
		customer_id: z.string().uuid().optional(),
		discount_id: z.string().uuid().optional(),
		tax_id: z.string().uuid().optional(),
		items: z.any().optional(),
		// payment_id: z.string().uuid().optional(),
		payment_method: z.enum(["CASH", "CARD", "TRANSFER", "OTHER"]).optional(),
		subtotal: z.coerce.number().min(0).nonnegative(),
		total: z.coerce.number().min(0).nonnegative(),
		note: z.string().optional(),
	})
	.merge(genericSchema);

export type Sale = z.infer<typeof saleSchema>;
