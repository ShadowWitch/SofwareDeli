import { useMutation } from "@tanstack/react-query";

import { deleteSeveralUserRoles } from "@requests/user-roles";

export function useDeleteSeveralUserRoles() {
	return useMutation({
		mutationFn: ({ ids }: { ids: string[] }) => deleteSeveralUserRoles(ids),
	});
}
