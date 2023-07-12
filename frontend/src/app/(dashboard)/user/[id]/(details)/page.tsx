"use client";

import { useParams } from "next/navigation";
import { ViewDetails } from "~/src/components/details-view";
import { useGetUser } from "~/src/hooks/user/use-get-user";
import { User } from "~/src/lib/validations/user";

const publicHeaders = {
	id: "ID",
	username: "Nombre de usuario",
	email: "Correo electrónico",
	employee_id: "Empleado",
	user_role_id: "Rol",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	enabled: "Habilitado",
	verified: "Verificado",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function UserDetailsPage() {
	const { id } = useParams();
	const getUserQuery = useGetUser(id);
	const { data, isLoading } = getUserQuery;
	const userData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Detalles de Usuario</h2>
				</div>
				<div className="flex items-center space-x-2">{/* Acciones */}</div>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={userData} />}
		</>
	);
}
