import * as z from "zod";
import { genericSchema } from "./generic";

export const itemSchema = z
	.object({
		enabled: z.boolean().optional(),
		name: z.string().min(2).max(100),
		description: z.string().optional(),
		price: z.coerce.number().min(0),
		quantity: z.coerce.number().min(0).nonnegative(),
		category_id: z.string().uuid().optional(),
		created_by: z.string().uuid().optional(),
		discount_id: z.string().uuid().optional(),
		images: z.array(z.string().url()).optional(),
		provider_id: z.string().uuid().optional(),
		inventory_id: z.string().uuid(),
		menu_id: z.string().uuid().optional(),
	})
	.merge(genericSchema.partial());

export type Item = z.infer<typeof itemSchema>;
