import { useQuery } from "@tanstack/react-query";

import { getUserRole } from "@requests/user-roles";

export function useGetUserRole(id: string) {
	return useQuery({
		queryKey: ["user-roles", id],
		queryFn: () => getUserRole(id),
	});
}
