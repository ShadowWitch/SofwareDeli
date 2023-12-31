import { useMutation } from "@tanstack/react-query";

import { deleteSeveralProviders } from "@requests/providers";

export function useDeleteSeveralProviders() {
	return useMutation({
		mutationFn: ({ ids }: any) => deleteSeveralProviders(ids),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: ["providers"],
		}),
	});
}
