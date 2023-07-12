import { Metadata } from "next";

import { CompanyForm } from "@components/forms/company-form";

export const metadata: Metadata = {
	title: "Crear Empresa",
	description: "Crear Empresa",
};

export default function CompanyRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Crear Empresa</h2>
					{/* <p className="text-muted-foreground">
						Here&apos;s a list of your tasks for this month!
					</p> */}
				</div>
				<div className="flex items-center space-x-2">{/* Acciones */}</div>
			</div>
			<CompanyForm />
		</>
	);
}
