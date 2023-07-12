import Link from "next/link";
import React from "react";
import { buttonVariants } from "./button";
import { cn } from "~/src/lib/utils";
import { Icons } from "../icons";
import { title } from "process";

export const LinkButton = ({ href, title }: any) => {
	return (
		<Link
			href={href}
			className={cn(
				buttonVariants({ variant: "ghost" }),
				"absolute left-4 top-4 md:left-8 md:top-8"
			)}
		>
			<Icons.plus className="mr-2 h-4 w-4" />
			{title}
		</Link>
	);
};
