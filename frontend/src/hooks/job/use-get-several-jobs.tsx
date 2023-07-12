import { useQuery } from "@tanstack/react-query";

import { getSeveralJobs } from "@requests/jobs";

export function useGetSeveralJobs(filters?: any) {
	return useQuery({
		queryKey: ["jobs"],
		queryFn: () => getSeveralJobs(filters),
	});
}
