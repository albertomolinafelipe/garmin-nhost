import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { clearAdminSecret, getAdminSecret } from "@/adminSecret";
import { AppShell } from "@/components/app-shell";
import { Activities } from "@/pages/Activities";
import { ActivityDetail } from "@/pages/ActivityDetail";
import { Calendar } from "@/pages/Calendar";
import { Overview } from "@/pages/Overview";
import { queryClient } from "@/queryClient";

export default function App() {
	const [secret, setSecret] = useState(() => getAdminSecret());

	useEffect(() => {
		const invalid = () => setSecret(null);
		window.addEventListener("admin-secret-invalid", invalid);
		return () => window.removeEventListener("admin-secret-invalid", invalid);
	}, []);

	function forget() {
		clearAdminSecret();
		queryClient.clear();
		setSecret(null);
	}

	return (
		<AppShell secret={secret} onAuthenticated={setSecret} onForget={forget}>
			<Routes>
				<Route path="/" element={<Navigate to="/overview" replace />} />
				<Route path="/overview" element={<Overview />} />
				<Route path="/calendar" element={<Calendar />} />
				<Route path="/activities" element={<Activities />} />
				<Route path="/activities/:id" element={<ActivityDetail />} />
				<Route path="*" element={<Navigate to="/overview" replace />} />
			</Routes>
		</AppShell>
	);
}
