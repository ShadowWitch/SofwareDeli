import { ProfileForm } from "@components/forms/profile-form";
import { Separator } from "@components/ui/separator";

export default function SettingsSecurityPage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Seguridad</h3>
				<p className="text-sm text-muted-foreground">
					{/* This is how others will see you on the site. */}
					Esto es como los demás te verán en el sitio.
				</p>
			</div>
			<Separator />
			<ProfileForm />
		</div>
	);
}
