import { useQuery } from "@tanstack/react-query";

import { getProvider } from "@requests/providers";

export function useGetProvider(id: string) {
	return useQuery({
		queryKey: ["providers", id],
		queryFn: () => getProvider(id),
	});
}
