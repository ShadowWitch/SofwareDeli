import { useMutation } from "@tanstack/react-query";

import { deleteItemVariantById } from "@requests/variants";

export function useDeleteItemVariant() {
	return useMutation({
		mutationFn: ({ id }: any) => deleteItemVariantById(id),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			// queries: [["item-variants"], ["item-variants", variables.id]],
			queries: ["item-variants"],
		}),
	});
}
