import { useQuery } from "@tanstack/react-query";
import { getSeveralCustomers } from "@requests/customers";

export function useGetSeveralCustomers(filters?: any) {
	return useQuery({
		queryKey: ["customers"],
		queryFn: () => getSeveralCustomers(filters),
	});
}
