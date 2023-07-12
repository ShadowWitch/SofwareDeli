import * as z from "zod";
import { genericSchema } from "./generic";
import { addressSchema } from "./address";

export const contactSchema = z
	.object({
		phone: z
			.string()
			.trim()
			.nonempty({
				message: "Ingrese su número de teléfono",
			})
			.min(6, {
				message: "El número de teléfono debe tener al menos 6 caracteres",
			})
			.max(20, {
				message: "El número de teléfono debe tener menos de 20 caracteres",
			}),
		email: z
			.string()
			.trim()
			.nonempty({
				message: "Ingrese su correo electrónico",
			})
			.email({
				message: "Ingrese un correo electrónico válido",
			}),
	})
	.merge(addressSchema)
	.merge(genericSchema);
