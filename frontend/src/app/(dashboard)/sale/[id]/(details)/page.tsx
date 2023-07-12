"use client";

import { useParams } from "next/navigation";
import { ViewDetails } from "@components/details-view";
import { useGetSale } from "@hooks/sale/use-get-sale";

const publicHeaders = {
	id: "ID",
	note: "Nota",
	customer_id: "ID de Cliente",
	order_id: "ID de Orden",
	tax_id: "ID de Impuesto",
	discount_id: "ID de Descuento",
	total: "Total",
	subtotal: "Subtotal",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function SaleDetailsPage() {
	const { id } = useParams();
	const getSaleQuery = useGetSale(id);
	const { data, isLoading } = getSaleQuery;
	const userData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Detalles de Venta</h2>
				</div>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={userData} />}
		</>
	);
}
