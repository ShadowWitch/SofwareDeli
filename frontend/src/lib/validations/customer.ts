import * as z from "zod";
import { genericSchema } from "./generic";

export const customerSchema = z
	.object({
		email: z.string().email().optional(),
		phone: z.string().min(8).max(14).optional(),
		first_name: z.string().min(2).max(100),
		middle_name: z.string().optional(),
		last_name: z.string().min(2).max(100),
		birthdate: z.date().optional(),
		id_card: z.string().min(7).max(13),
		rtn: z.string().min(10).max(14).optional(),
		contact_id: z.string().uuid().optional(),
	})
	.merge(genericSchema.partial());

export type Customer = z.infer<typeof customerSchema>;
