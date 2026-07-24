import { type FormEvent, StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import {
	clearAdminSecret,
	getAdminSecret,
	setAdminSecret,
} from "./adminSecret";
import { useActivitiesSmokeQuery } from "./graphql/hooks";
import { queryClient } from "./queryClient";
import "./style.css";

function Activities() {
	const query = useActivitiesSmokeQuery();
	if (query.isPending) return <p>Loading activities…</p>;
	if (query.isError)
		return (
			<p role="alert">Unable to load activities. Check the admin secret.</p>
		);
	if (query.data.activities.length === 0) return <p>No activities yet.</p>;
	return (
		<ul>
			{query.data.activities.map((activity) => (
				<li key={String(activity.id)}>
					{activity.name ??
						activity.activity_type ??
						`Activity ${String(activity.garmin_activity_id)}`}
				</li>
			))}
		</ul>
	);
}

function App() {
	const [secret, setSecretState] = useState(() => getAdminSecret());
	const [draft, setDraft] = useState("");

	useEffect(() => {
		const invalid = () => setSecretState(null);
		window.addEventListener("admin-secret-invalid", invalid);
		return () => window.removeEventListener("admin-secret-invalid", invalid);
	}, []);

	function submit(event: FormEvent) {
		event.preventDefault();
		const value = draft.trim();
		if (!value) return;
		setAdminSecret(value);
		setDraft("");
		setSecretState(value);
	}

	function forget() {
		clearAdminSecret();
		queryClient.clear();
		setSecretState(null);
	}

	if (!secret) {
		return (
			<main>
				<h1>Garmin Dashboard</h1>
				<form onSubmit={submit}>
					<label htmlFor="admin-secret">Hasura admin secret</label>
					<input
						id="admin-secret"
						type="password"
						autoComplete="current-password"
						value={draft}
						onChange={(event) => setDraft(event.target.value)}
					/>
					<button type="submit">Continue</button>
				</form>
			</main>
		);
	}

	return (
		<main>
			<header>
				<h1>Garmin Dashboard</h1>
				<button type="button" onClick={forget}>
					Forget secret
				</button>
			</header>
			<Activities />
		</main>
	);
}

const root = document.getElementById("root");
if (!root) throw new Error("Missing root element");
createRoot(root).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</StrictMode>,
);
