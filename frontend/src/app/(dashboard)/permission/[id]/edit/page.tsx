"use client";

import { useParams } from "next/navigation";
import { UserRoleForm } from "@components/forms/user-role-form";
import { useGetUserRole } from "@hooks/user-role/use-get-user-role";

export default function UserRoleEditPage() {
	const { id } = useParams();
	const getUserRoleQuery = useGetUserRole(id);
	const { data, isLoading, isError, error } = getUserRoleQuery;

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (isError) {
		return <div>Error: {<>{error}</>}</div>;
	}

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Modificar Rol</h2>
				</div>
				{/* <div className="flex items-center space-x-2">Acciones</div> */}
			</div>
			<UserRoleForm data={data.data} />
		</>
	);
}
