import { useMutation } from "@tanstack/react-query";

import { createItemVariant } from "@requests/variants";

export function useCreateItemVariant() {
	return useMutation({
		mutationFn: (data: any) => createItemVariant(data),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			queries: [["item-varaiants"]],
		}),
	});
}
