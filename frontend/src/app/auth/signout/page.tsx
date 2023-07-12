"use client";

import { useSignOut } from "~/src/hooks/auth/use-sign-out";

export default function SignOutPage() {
	const { isLoading } = useSignOut();

	if (isLoading) {
		return <div>Signing out...</div>;
	}

	return null;
}
