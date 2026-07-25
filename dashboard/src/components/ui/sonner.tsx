import { Toaster as Sonner, type ToasterProps } from "sonner";

function currentTheme(): "light" | "dark" {
	if (typeof document === "undefined") return "light";
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function Toaster(props: ToasterProps) {
	return (
		<Sonner
			theme={currentTheme()}
			className="toaster group"
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
}

export { Toaster };
