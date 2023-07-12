import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const saleSchema = z
	.object({
		created_by: z.string().uuid().optional(),
		payment_method: z.enum(["CASH", "CARD", "TRANSFER", "OTHER"]).optional(),	
		total: z.number().min(0).nonnegative(),
		subtotal: z.number().min(0).nonnegative(),
		note: z.string().optional(),
		order_id: z.string().uuid().optional(),
		customer_id: z.string().uuid().optional(),
		discount_id: z.string().uuid().optional(),
		tax_id: z.string().uuid().optional(),
		// payment_id: z.string().uuid().optional(),
	})
	.merge(genericSchema.partial());

export const saleCreateSchema = saleSchema
	.omit({
		id: true,
		created_at: true,
		updated_at: true,
	})
	.merge(
		z.object({
			items: z
				.array(
					z.object({
						id: z.string().uuid(),
						quantity: z.number().min(1).nonnegative(),
					})
				)
				.nonempty({
					message: "Sale must have at least one item",
				}),
		})
	);

export type SaleCreate = z.infer<typeof saleCreateSchema>;
export const partialSaleSchema = saleSchema.partial();
