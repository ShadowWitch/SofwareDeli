import { useMutation } from "@tanstack/react-query";

import { createItemModifier } from "@requests/modifiers";

export function useCreateItemModifier() {
	return useMutation({
		mutationFn: (data: any) => createItemModifier(data),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			queries: [["item-modifier"]],
		}),
	});
}
