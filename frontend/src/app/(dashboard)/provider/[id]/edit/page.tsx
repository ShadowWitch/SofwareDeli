"use client";

import { useParams } from "next/navigation";

import { CompanyForm } from "@components/forms/company-form";
import { useGetProvider } from "@hooks/provider/use-get-provider";

export default function ProviderEditPage() {
	const { id } = useParams();
	const getProviderQuery = useGetProvider(id);
	const { data, isLoading, isError, error } = getProviderQuery;

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (isError) {
		return <div>Error: {<>{error}</>}</div>;
	}

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Modificar Proveedor</h2>
			</div>
			<CompanyForm data={data.data} />
		</>
	);
}
