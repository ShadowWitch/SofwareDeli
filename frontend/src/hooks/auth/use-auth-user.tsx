import { useQuery } from "@tanstack/react-query";

import { getUserAuth } from "@requests/auth";

export function useUserAuth() {
	return useQuery(["user-auth"], async () => await getUserAuth());
}
