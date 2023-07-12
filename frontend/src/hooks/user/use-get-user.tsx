import { useQuery } from "@tanstack/react-query";
import { getUser } from "@requests/users";

export function useGetUser(id: string) {
	return useQuery({
		queryKey: ["users", id],
		queryFn: () => getUser(id),
	});
}
