import { useMutation } from "@tanstack/react-query";

import { deleteTaxById } from "@requests/taxes";

export function useDeleteTax() {
	return useMutation({
		mutationFn: ({ id }: any) => deleteTaxById(id),
		onMutate: async (variables) => ({
			method: "DELETE",
			variables,
			queries: ["taxes"],
		}),
	});
}
