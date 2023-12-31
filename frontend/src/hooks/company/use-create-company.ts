import { useMutation } from "@tanstack/react-query";

import { createCompany } from "@requests/companies";

export function useCreateCompany() {
	return useMutation({
		mutationFn: ({ data }: { data: any }) => createCompany(data),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			queries: ["companies"],
		}),
	});
}
