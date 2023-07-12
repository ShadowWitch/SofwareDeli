"use client";

import * as React from "react";

import { User } from "@lib/validations/user";
import { DataTable } from "@components/data-table";
import { serialiseColumns } from "@components/data-table-columns";
import { useGetSeveralUsers } from "@hooks/user/use-get-several-users";
import { useDeleteUser } from "@hooks/user/use-delete-user";
import { Columns } from "~/src/types";
import { Action } from "@components/data-table-row-actions";
import { useUpdateUser } from "@hooks/user/use-update-user";

const columnsDef: Columns<User>[] = [
	{
		key: "employee_name" as any,
		title: "Empleado",
	},
	{
		key: "username",
		title: "Nombre de usuario",
	},
	{
		key: "email",
		title: "Correo electrónico",
	},
	{
		key: "user_role_name" as any,
		title: "Rol",
	},
	{
		key: "enabled",
		title: "Habilitado",
	},
	{
		key: "verified",
		title: "Verificado",
	},
];

const actions = ({ deleteUser, enableOrDisableUser }: any): Action<User> => ({
	disabled: {
		title: ["Habilitar", "Deshabilitar"],
		onClick: ({ row }) => {
			if (!confirm("¿Estás seguro de cambiar deshabilitar este usuario?")) return;
			enableOrDisableUser({ id: row.original.id, data: { enabled: !row.original.enabled } });
		},
	},
	delete: {
		title: "Eliminar",
		onClick: ({ row }) => {
			if (!confirm("¿Estás seguro de eliminar este usuario?")) return;
			deleteUser({ id: row.original.id });
		},
	},
});

export function UserTable() {
	const severalUsersQuery = useGetSeveralUsers();
	const deleteUserQuery = useDeleteUser();
	const enableOrDisableUserQuery = useUpdateUser();

	const usersList = severalUsersQuery.data?.data?.data || [];
	const usersListFiltered = usersList?.map((user: any) => ({
		...user,
		employee_name: user?.Employee
			? user.Employee?.first_name +
			  (user.Employee.middle_name ? " " + user.Employee?.middle_name + " " : " ") +
			  user.Employee?.last_name
			: null,
		user_role_name: user?.UserRole?.name,
	}));
	const rowActions = actions({
		deleteUser: deleteUserQuery.mutate,
		enableOrDisableUser: enableOrDisableUserQuery.mutate,
	});
	const userColumns = serialiseColumns<User>(columnsDef, rowActions);

	return (
		<DataTable
			filterBy={{ employee_name: "Empleado" }}
			columns={userColumns}
			data={usersListFiltered}
		/>
	);
}
