"use client";

import * as React from "react";

import { Item } from "@lib/validations/item";
import { Columns } from "~/src/types";
import { DataTable } from "@components/data-table";
import { serialiseColumns } from "@components/data-table-columns";
import { useDeleteItem } from "@hooks/item/use-delete-item";
import { useGetInventoryItems } from "@hooks/inventory/use-get-inventory-items";
import { Action } from "../data-table-row-actions";

const columnsDef: Columns<Item>[] = [
	{
		key: "name",
		title: "Nombre",
	},
	{
		key: "price",
		title: "Precio",
	},
	{
		key: "quantity",
		title: "Stock",
	},
];

const actions = ({ deleteItem }: { deleteItem: any }): Action<Item> => {
	return {
		// disabled: {
		// 	title: ["Habilitar", "Deshabilitar"],
		// 	onClick: function () {
		// 		this.title = this.title.reverse();
		// 	},
		// },
		delete: {
			title: "Eliminar",
			onClick: ({ row }) => {
				if (!confirm("¿Está seguro de que desea eliminar este producto?")) return;
				deleteItem({ id: row.original.id });
			},
		},
	};
};

export function InventoryItemTable() {
	const severalInventoryItemsQuery = useGetInventoryItems("37f2029a-10e2-468e-bc04-11c25b6d1334");
	const deleteItemQuery = useDeleteItem();

	const inventoryItemsList = severalInventoryItemsQuery.data?.data || [];
	const rowActions = actions({ deleteItem: deleteItemQuery.mutate });
	const columns = serialiseColumns<Item>(columnsDef, rowActions);

	return <DataTable filterBy={{ name: "Nombre" }} columns={columns} data={inventoryItemsList} />;
}
