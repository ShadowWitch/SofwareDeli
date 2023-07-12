import { useMutation } from "@tanstack/react-query";

import { deleteUserRoleById } from "@requests/user-roles";

export function useDeleteUserRole() {
	return useMutation({
		mutationFn: ({ id }: { id: string }) => deleteUserRoleById(id),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: [["user-roles"], ["user-roles", variables.id]],
		}),
	});
}
