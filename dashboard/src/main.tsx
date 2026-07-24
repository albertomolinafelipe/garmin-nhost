import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
	return (
		<main>
			<h1>Garmin Dashboard</h1>
			<p>The Nhost dashboard shell is ready.</p>
		</main>
	);
}

const root = document.getElementById("root");
if (!root) throw new Error("Missing root element");
createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
