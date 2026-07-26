import { type FormEvent, useState } from "react";
import { X } from "lucide-react";

import { setAdminSecret } from "@/adminSecret";
import { NhostLogo } from "@/components/nhost-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { queryClient } from "@/queryClient";

export function LoginDialog({
	open,
	onClose,
	onAuthenticated,
}: {
	open: boolean;
	onClose: () => void;
	onAuthenticated: (secret: string) => void;
}) {
	const [draft, setDraft] = useState("");

	if (!open) return null;

	function submit(event: FormEvent) {
		event.preventDefault();
		const value = draft.trim();
		if (!value) return;
		setAdminSecret(value);
		setDraft("");
		queryClient.invalidateQueries();
		onAuthenticated(value);
		onClose();
	}

	return (
		<div className="fixed inset-0 z-[1200] flex items-center justify-center p-4">
			<button
				type="button"
				aria-label="Close login"
				className="absolute inset-0 bg-black/50"
				onClick={onClose}
			/>
			<div className="bg-card text-card-foreground relative w-full max-w-sm rounded-xl border p-6 shadow-xl">
				<Button
					variant="ghost"
					size="icon"
					aria-label="Close login"
					className="absolute top-3 right-3"
					onClick={onClose}
				>
					<X className="size-4" />
				</Button>
				<div className="mb-4 text-center">
					<NhostLogo className="mx-auto mb-2 size-11" />
					<h2 className="text-xl font-semibold">Garmin Dashboard</h2>
					<p className="text-muted-foreground text-sm">
						Enter your admin secret to continue.
					</p>
				</div>
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
							// biome-ignore lint/a11y/noAutofocus: focus the only field when the modal opens
							autoFocus
						/>
					</div>
					<Button type="submit" className="w-full">
						Continue
					</Button>
				</form>
			</div>
		</div>
	);
}
