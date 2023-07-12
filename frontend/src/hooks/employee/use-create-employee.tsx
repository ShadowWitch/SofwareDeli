import { useMutation } from "@tanstack/react-query";

import { createEmployee } from "@requests/employees";

export function useCreateEmployee() {
	return useMutation({
		mutationFn: ({ data }: { data: any }) => createEmployee(data),
		onMutate: (variables) => ({
			variables,
			method: "POST",
			queries: [["employees"]],
		}),
	});
}
