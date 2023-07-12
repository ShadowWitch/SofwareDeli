import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const employeeSchema = z
	.object({
		enabled: z.boolean().optional(),
		first_name: z.string().trim().min(2).max(50),
		middle_name: z.string().trim().min(2).max(50).optional(),
		last_name: z.string().trim().min(2).max(50),
		id_card: z.string().trim().min(2).max(50),
		birthdate: z.date().min(new Date("1900-01-01")).max(new Date()),
		job_id: z.string().uuid(),
		company_id: z.string().uuid(),
		// contact_id: z.string().uuid().optional(),
		contract_type: z.enum([
			"FULL_TIME",
			"PART_TIME",
			"TEMPORARY",
			"VOLUNTEER",
			"OTHER",
		]),
	})
	.merge(genericSchema.partial());

export const partialEmployeeSchema = employeeSchema.partial();
