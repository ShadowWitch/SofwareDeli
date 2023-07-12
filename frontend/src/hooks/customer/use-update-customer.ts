import { useMutation } from "@tanstack/react-query";

import { updateCustomer } from "@requests/customers";

export function useUpdateCustomer() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updateCustomer(id, data),
		onMutate: (variables) => ({
			method: "PUT",
			variables,
			queries: [["customers"]],
		}),
	});
}
