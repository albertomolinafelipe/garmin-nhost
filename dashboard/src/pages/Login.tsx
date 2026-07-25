import { type FormEvent, useState } from "react";

import { setAdminSecret } from "@/adminSecret";
import { NhostLogo } from "@/components/nhost-logo";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Login({
	onAuthenticated,
}: {
	onAuthenticated: (secret: string) => void;
}) {
	const [draft, setDraft] = useState("");

	function submit(event: FormEvent) {
		event.preventDefault();
		const value = draft.trim();
		if (!value) return;
		setAdminSecret(value);
		setDraft("");
		onAuthenticated(value);
	}

	return (
		<div className="grid min-h-svh place-items-center bg-muted/40 p-6">
			<Card className="w-full max-w-sm">
				<CardHeader className="text-center">
					<div className="bg-primary text-primary-foreground mx-auto mb-2 flex size-11 items-center justify-center rounded-xl">
						<NhostLogo className="size-5" />
					</div>
					<CardTitle className="text-xl">Garmin Dashboard</CardTitle>
					<CardDescription>
						Enter your admin secret to continue.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={submit} className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="admin-secret">Admin secret</Label>
							<Input
								id="admin-secret"
								type="password"
								autoComplete="current-password"
								placeholder="••••••••••••"
								value={draft}
								onChange={(event) => setDraft(event.target.value)}
							/>
						</div>
						<Button type="submit" className="w-full">
							Continue
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
