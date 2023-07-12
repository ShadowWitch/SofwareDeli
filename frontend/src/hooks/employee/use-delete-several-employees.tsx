import { useMutation } from "@tanstack/react-query";
import { deleteSeveralEmployees } from "@requests/employees";

export function useDeleteSeveralEmployees() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralEmployees(data),
	});
}
