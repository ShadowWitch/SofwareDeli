import { useMutation } from "@tanstack/react-query";

import { deleteSeveralCompanies } from "@requests/companies";

export function useDeleteSeveralCompanies() {
	return useMutation({
		mutationFn: ({ ids }: any) => deleteSeveralCompanies(ids),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: ["companies"],
		}),
	});
}
