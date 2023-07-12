import { useMutation } from "@tanstack/react-query";

import { deleteDiscountById } from "@requests/discounts";
import { queryClient } from "@components/providers";

export function useDeleteDiscount() {
	return useMutation({
		mutationFn: ({ id }: any) => deleteDiscountById(id),
		onSuccess: (data, variables, context) => {
			queryClient.refetchQueries(["discounts"]);
		},
	});
}
