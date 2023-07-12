import { useQuery } from "@tanstack/react-query";

import { getSeveralSales } from "@requests/sale";

export function useGetSeveralSales(filters?: any) {
	return useQuery({
		queryKey: ["sales"],
		queryFn: () => getSeveralSales(filters),
	});
}
