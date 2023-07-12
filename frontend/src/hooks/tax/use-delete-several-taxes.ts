import { useMutation } from "@tanstack/react-query";
import { deleteSeveralTaxes } from "@requests/taxes";

export function useDeleteSeveralTaxes() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralTaxes(data),
	});
}
