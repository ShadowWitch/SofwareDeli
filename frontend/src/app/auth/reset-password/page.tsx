import { Metadata } from "next";
import Link from "next/link";

import { Icons } from "@components/icons";
import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import { UserResetPasswordForm } from "@components/forms/user-reset-password-form";

export const metadata: Metadata = {
	title: "Recuperar cuenta",
	description: "Recover account",
};

export default function ResetPasswordPage() {
	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<Link
				href="/"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute left-4 top-4 md:left-8 md:top-8"
				)}
			>
				<>
					<Icons.chevronLeft className="mr-2 h-4 w-4" />
					Atrás
				</>
			</Link>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<Icons.logo className="mx-auto h-6 w-6" />
					<h1 className="text-2xl font-semibold tracking-tight">Cambiar Contraseña</h1>
					<p className="text-sm text-muted-foreground">Ingresa tu nueva contraseña.</p>
				</div>
				<UserResetPasswordForm />
			</div>
		</div>
	);
}
