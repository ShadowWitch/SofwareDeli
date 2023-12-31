import { useMutation } from "@tanstack/react-query";

import { deleteSeveralItems } from "@requests/items";

export function useDeleteSeveralItems() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralItems(data),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: [["items"]],
		}),
	});
}
