"use client";

import { useRouter } from "next/navigation";

import { Icons } from "@components/icons";
import { Button } from "@components/ui/button";

export default function TerminalLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	return (
		<div>
			<header className="bg-background border-b">
				<div className="flex items-center justify-between py-2 px-4">
					<Button
						size="sm"
						variant="ghost"
						onClick={() => (router.back ? router.back() : router.push("/dashboard"))}
					>
						<Icons.close />
					</Button>
					<div className="content-center">
						<h2 className="text-2xl font-bold tracking-tight">Terminal Virtual</h2>
					</div>
				</div>
			</header>
			<main className="container hidden h-full flex-1 flex-col space-y-8 py-8 md:flex">
				{children}
			</main>
		</div>
	);
}
