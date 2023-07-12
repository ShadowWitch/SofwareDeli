import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Crear Transacción",
	description: "Crear Transacción",
};

export default function Page() {
	return (
		<>
			<h1>
				<span className="text-4xl">📄</span>
				Lista de Transacciones
			</h1>
		</>
	);
}
