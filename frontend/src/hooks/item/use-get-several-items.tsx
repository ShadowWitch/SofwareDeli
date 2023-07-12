import { useQuery } from "@tanstack/react-query";

import { getSeveralItems } from "@requests/items";

export function useGetSeveralItems(filters?: any) {
	return useQuery({
		queryKey: ["items"],
		queryFn: () => getSeveralItems(filters),
	});
}
