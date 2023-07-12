import { DashboardConfig } from "../types";

export const settingsConfig: DashboardConfig = {
	mainNav: [],
	sidebarNav: [
		{
			title: "Perfil",
			href: "/settings/profile",
		},
		{
			title: "Cuenta",
			href: "/settings/account",
		},
		{
			title: "Apariencia",
			href: "/settings/appearance",
		},
		{
			title: "Notificaciones",
			href: "/settings/notifications",
		},
		// {
		// 	title: "Pantalla",
		// 	href: "/settings/display",
		// },
	],
};
