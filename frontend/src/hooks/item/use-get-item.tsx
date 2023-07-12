import { useQuery } from "@tanstack/react-query";

import { getItem } from "@requests/items";

export function useGetItem(id: string) {
	return useQuery({
		queryKey: ["items", id],
		queryFn: () => getItem(id),
	});
}
