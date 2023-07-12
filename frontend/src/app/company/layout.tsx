import { Header } from "@components/site-header";
import { SidebarNav } from "@components/sidebar-nav";
import { Footer } from "@components/site-footer";
import { dashboardConfig } from "@config/dashboard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen space-y-6">
			<Header />
			<div className="container">
				<main className="flex flex-col w-full">
					<div className="h-full space-y-8 py-8">{children}</div>
				</main>
			</div>
			<Footer className="border-t" />
		</div>
	);
}
