import { useQuery } from "@tanstack/react-query";
import { getInventory } from "@requests/inventories";

export function useGetInventory(id: string) {
	return useQuery(["inventory", id], async () => await getInventory(id));
}
