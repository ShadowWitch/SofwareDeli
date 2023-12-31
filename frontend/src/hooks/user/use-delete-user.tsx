import { useMutation } from "@tanstack/react-query";

import { deleteUserById } from "@requests/users";

export function useDeleteUser() {
	return useMutation({
		mutationFn: ({ id }: { id: string }) => deleteUserById(id),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: ["users"],
		}),
	});
}
