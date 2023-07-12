import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Lista de Transacciones",
	description: "Lista de Transacciones",
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
