"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@components/ui/button";

export default function PosOverviewPage() {
	const router = useRouter();

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Vista General</h2>
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						className="ml-auto hidden h-8 lg:flex"
						onClick={() => {
							router.push("/pos/terminal/checkout");
						}}
					>
						<Plus className="mr-2 h-4 w-4" />
						Aceptar pago
					</Button>
				</div>
			</div>
			<div className="flex items-center space-x-2">
				<h2 className="text-xl font-medium tracking-tight">Actividad reciente</h2>
			</div>
		</>
	);
}
