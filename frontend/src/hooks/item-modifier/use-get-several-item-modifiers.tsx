import { useQuery } from "@tanstack/react-query";

import { getSeveralItemModifiers } from "@requests/modifiers";

export function useGetSeveralItemModifiers(filters?: any) {
	return useQuery({
		queryKey: ["items-modifiers"],
		queryFn: () => getSeveralItemModifiers(filters),
	});
}
