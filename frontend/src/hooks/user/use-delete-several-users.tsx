import { useMutation } from "@tanstack/react-query";
import { deleteSeveralUsers } from "@requests/users";

export function useDeleteSeveralUsers() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralUsers(data),
	});
}
