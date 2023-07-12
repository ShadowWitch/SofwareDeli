"use client";

import { useParams } from "next/navigation";

import { ViewDetails } from "@components/details-view";
import { useGetCompany } from "@hooks/company/use-get-company";
import { useGetProvider } from "~/src/hooks/provider/use-get-provider";

const publicHeaders = {
	id: "ID",
	name: "Nombre",
	bussiness_id: "RTN",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	enabled: "Habilitado",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function ProviderDetailsPage() {
	const { id } = useParams();
	const getProviderQuery = useGetProvider(id);
	const { data, isLoading } = getProviderQuery;
	const companyData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Detalles de Proveedor</h2>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={companyData} />}
		</>
	);
}
