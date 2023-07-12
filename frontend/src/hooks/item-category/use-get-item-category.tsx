import { useQuery } from "@tanstack/react-query";

import { getItemCategory } from "@requests/categories";

export function useGetItemCategory(id: string) {
	return useQuery({
		queryKey: ["item-categories", id],
		queryFn: () => getItemCategory(id),
	});
}
