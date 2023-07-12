"use client";

import { useParams } from "next/navigation";
import { VirtualRestaurantTerminalForm } from "@components/forms/virtual-restaurant-terminal-form";

export default function VirtualTerminalPage() {
	const { id } = useParams();

	return (
		<>
			<VirtualRestaurantTerminalForm />
		</>
	);
}
