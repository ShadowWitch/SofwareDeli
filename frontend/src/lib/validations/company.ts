import * as z from "zod";
import { genericSchema } from "./generic";

export const companySchema = z
	.object({
		enabled: z.boolean().optional(),
		name: z.string().min(1).max(255),
		bussiness_id: z.string().min(1).max(255),
		contact_id: z.string().uuid().optional().nullable(),
		logo_url: z.string().url().optional().nullable(),
	})
	.merge(genericSchema.partial());

export type Company = z.infer<typeof companySchema>;
