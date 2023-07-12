import { useMutation } from "@tanstack/react-query";

import { deleteCompanyById } from "@requests/companies";

export function useDeleteCompany() {
	return useMutation({
		mutationFn: ({ id }: { id: string }) => deleteCompanyById(id),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: ["companies"],
		}),
	});
}
