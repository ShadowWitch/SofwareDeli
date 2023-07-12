import { env } from "~/env.mjs";
import { SiteConfig } from "../types";

export const siteConfig: SiteConfig = {
	name: "Alesoft",
	description: "An open source ERP for small and medium businesses.",
	url: env.NEXT_PUBLIC_APP_URL,
	ogImage: env.NEXT_PUBLIC_APP_URL + "/og.jpg",
	links: {
		github: "https://github.com/vercel/next.js",
	},
};
