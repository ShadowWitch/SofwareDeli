"use client";

import Link from "next/link";

import { dashboardConfig } from "@config/dashboard";
import { CommandMenu } from "@components/command-menu";
import { MainNav } from "@components/main-nav";
import { MobileNav } from "@components/mobile-nav";
import { Button } from "@components/ui/button";
import { UserNav } from "@components/user-nav";
import { useGetCompany } from "@hooks/company/use-get-company";
import { Icons } from "@components/icons";

export function Header() {
	const getCompany = useGetCompany("986a4879-3fbe-4899-a42b-8e93ac337a44");

	return (
		<header className="sticky top-0 z-40 border-b bg-background">
			<div className="container flex items-center justify-between h-16 py-4">
				<MainNav items={dashboardConfig.mainNav} />
				{/* <MobileNav /> */}
				<div className="flex items-center justify-between flex-1 space-x-2 sm:space-x-4 md:justify-end">
					<Button variant="ghost" className="flex items-center align-middle gap-2">
						<Icons.store className="h-5 w-5" />
						<Link href="/company/account">{getCompany.data?.data.name}</Link>
					</Button>
					<div className="flex-1 w-full md:w-auto md:flex-none">
						<CommandMenu />
					</div>
					<UserNav />
				</div>
			</div>
		</header>
	);
}
