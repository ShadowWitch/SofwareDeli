import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@components/providers";
import { deleteSeveralInventories } from "@requests/inventories";

export function useDeleteSeveralInventories() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralInventories(data),
		onSuccess: (data, variables, context) => {
			queryClient.refetchQueries(["inventories"]);
		},
	});
}
