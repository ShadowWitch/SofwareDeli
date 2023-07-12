"use client";

import { useParams } from "next/navigation";
import { useGetItemVariant } from "@hooks/item-variant/use-get-item-variant";
import { ItemVariantForm } from "@components/forms/item-variant-form";

export default function ItemVariantEditPage() {
	const { id } = useParams();
	const getItemVariantQuery = useGetItemVariant(id);
	const { data, isLoading, isError, error } = getItemVariantQuery;

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (isError) {
		return <div>Error: {<>{error}</>}</div>;
	}

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Modificar Variante</h2>
			</div>
			<ItemVariantForm data={data.data} />
		</>
	);
}
