import { useQuery } from "@tanstack/react-query";

import { getSeveralCompanies } from "@requests/companies";

export function useGetSeveralCompanies(filters?: any) {
	return useQuery({
		queryKey: ["companies"],
		queryFn: () => getSeveralCompanies(filters),
	});
}
