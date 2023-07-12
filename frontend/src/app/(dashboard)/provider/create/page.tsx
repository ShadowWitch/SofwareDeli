import { Metadata } from "next";

import { ProviderForm } from "@components/forms/provider-form";

export const metadata: Metadata = {
	title: "Crear Proveedor",
	description: "Crear Proveedor",
};

export default function ProviderRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Crear Proveedor</h2>
			</div>
			<ProviderForm />
		</>
	);
}
