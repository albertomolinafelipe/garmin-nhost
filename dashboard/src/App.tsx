import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { clearAdminSecret, getAdminSecret } from "@/adminSecret";
import { AppShell } from "@/components/app-shell";
import { Activities } from "@/pages/Activities";
import { Calendar } from "@/pages/Calendar";
import { Login } from "@/pages/Login";
import { Overview } from "@/pages/Overview";
import { queryClient } from "@/queryClient";

export default function App() {
	const [secret, setSecret] = useState(() => getAdminSecret());

	useEffect(() => {
		const invalid = () => setSecret(null);
		window.addEventListener("admin-secret-invalid", invalid);
		return () => window.removeEventListener("admin-secret-invalid", invalid);
	}, []);

	if (!secret) {
		return <Login onAuthenticated={setSecret} />;
	}

	function forget() {
		clearAdminSecret();
		queryClient.clear();
		setSecret(null);
	}

	return (
		<AppShell onForget={forget}>
			<Routes>
				<Route path="/" element={<Navigate to="/overview" replace />} />
				<Route path="/overview" element={<Overview />} />
				<Route path="/calendar" element={<Calendar />} />
				<Route path="/activities" element={<Activities />} />
				<Route path="*" element={<Navigate to="/overview" replace />} />
			</Routes>
		</AppShell>
	);
}
