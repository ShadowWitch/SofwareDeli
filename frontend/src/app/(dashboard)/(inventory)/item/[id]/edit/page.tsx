"use client";

import { useParams } from "next/navigation";
import { useGetItem } from "@hooks/item/use-get-item";
import { ItemForm } from "@components/forms/item-form";

export default function ItemEditPage() {
	const { id } = useParams();
	const getItemQuery = useGetItem(id);
	const { data, isLoading, isError, error } = getItemQuery;

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (isError) {
		return <div>Error: {<>{error}</>}</div>;
	}

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Modificar Producto</h2>
			</div>
			<ItemForm data={data.data} />
		</>
	);
}
