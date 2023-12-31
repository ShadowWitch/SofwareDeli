import { useMutation } from "@tanstack/react-query";

import { createMenu } from "@requests/menus";

export function useCreateMenu() {
	return useMutation({
		mutationFn: ({ data }: { data: any }) => createMenu(data),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			queries: [["menus"]],
		}),
	});
}
