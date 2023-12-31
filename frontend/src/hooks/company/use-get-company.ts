import { useQuery } from "@tanstack/react-query";

import { getCompany } from "@requests/companies";

export function useGetCompany(id: string) {
	return useQuery({
		queryKey: ["companies", id],
		queryFn: () => getCompany(id),
	});
}
