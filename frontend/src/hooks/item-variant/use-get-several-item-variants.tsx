import { useQuery } from "@tanstack/react-query";

import { getSeveralItemVariants } from "@requests/variants";

export function useGetSeveralItemVariants(filters?: any) {
	return useQuery({
		queryKey: ["items-variants"],
		queryFn: () => getSeveralItemVariants(filters),
	});
}
