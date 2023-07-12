import { useQuery } from "@tanstack/react-query";
import { getTax } from "@requests/taxes";

export function useGetTax(id: string) {
	return useQuery(["tax", id], async () => await getTax(id));
}
