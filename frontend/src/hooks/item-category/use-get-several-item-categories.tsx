import { useQuery } from "@tanstack/react-query";

import { getSeveralItemCategories } from "@requests/categories";

export function useGetSeveralItemCategories(filters?: any) {
	return useQuery({
		queryKey: ["items-categories"],
		queryFn: () => getSeveralItemCategories(filters),
	});
}
