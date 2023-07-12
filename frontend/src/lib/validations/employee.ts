import * as z from "zod";
import { genericSchema } from "./generic";

export const employeeSchema = z
	.object({
		enabled: z.boolean().optional(),
		first_name: z.string().trim().min(2).max(50),
		// middle_name: z.string().trim().min(2).max(50).optional(),
		last_name: z.string().trim().min(2).max(50),
		id_card: z.string().trim().min(7).max(13),
		// birthdate: z.coerce.date().min(new Date("1900-01-01")).max(new Date()),
		birthdate: z.coerce.date(),
		job_id: z.string().uuid(),
		company_id: z.string().uuid().nullable(),
		contact_id: z.string().uuid().optional().nullable(),
		contract_type: z.enum(["FULL_TIME", "PART_TIME", "TEMPORARY", "VOLUNTEER", "OTHER"]),
	})
	.merge(genericSchema.partial());

export type Employee = z.infer<typeof employeeSchema>;
