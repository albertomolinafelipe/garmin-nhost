import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

function currentTheme(): Theme {
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>(() => currentTheme());

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		try {
			localStorage.setItem("theme", theme);
		} catch {
			/* localStorage unavailable — theme just won't persist */
		}
	}, [theme]);

	return (
		<Button
			variant="ghost"
			className="w-full justify-start"
			onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
		>
			{theme === "dark" ? (
				<Sun className="size-4" />
			) : (
				<Moon className="size-4" />
			)}
			Theme
		</Button>
	);
}
