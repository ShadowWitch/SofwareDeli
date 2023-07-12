"use client";

import { UserForm } from "@components/forms/user-form";
import { useParams } from "next/navigation";
import { useGetCustomer } from "@hooks/customer/use-get-customer";

export default function EmployeeEditPage() {
	const { id } = useParams();
	const { data: customerResponse, isLoading } = useGetCustomer(id);
	const customerData = customerResponse?.data;

	if (isLoading) return <div>Cargando...</div>;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Modificar Cliente</h2>
			</div>
			<UserForm data={customerData} />
		</>
	);
}
