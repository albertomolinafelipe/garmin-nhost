import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Activity, CalendarDays, LayoutDashboard, LogOut } from "lucide-react";

import { NhostLogo } from "@/components/nhost-logo";
import { SyncButton } from "@/components/sync-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
	{ to: "/overview", label: "Overview", icon: LayoutDashboard },
	{ to: "/calendar", label: "Calendar", icon: CalendarDays },
	{ to: "/activities", label: "Activities", icon: Activity },
];

export function AppShell({
	children,
	onForget,
}: {
	children: ReactNode;
	onForget: () => void;
}) {
	return (
		<div className="flex h-svh">
			<aside className="bg-sidebar text-sidebar-foreground border-sidebar-border flex w-60 shrink-0 flex-col border-r">
				<div className="flex h-14 items-center gap-2 px-4 font-semibold">
					<div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-7 items-center justify-center rounded-md">
						<NhostLogo className="size-4" />
					</div>
					garmin-nhost
				</div>

				<nav className="flex flex-1 flex-col gap-1 p-2">
					{NAV.map(({ to, label, icon: Icon }) => (
						<NavLink
							key={to}
							to={to}
							className={({ isActive }) =>
								cn(
									"flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
									"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
									isActive &&
										"bg-sidebar-accent text-sidebar-accent-foreground",
								)
							}
						>
							<Icon className="size-4" />
							{label}
						</NavLink>
					))}
				</nav>

				<div className="border-sidebar-border flex flex-col gap-1 border-t p-2">
					<SyncButton />
					<ThemeToggle />
					<Button
						variant="ghost"
						className="w-full justify-start"
						onClick={onForget}
					>
						<LogOut className="size-4" />
						Forget secret
					</Button>
				</div>
			</aside>

			<main className="min-w-0 flex-1 overflow-auto">{children}</main>
		</div>
	);
}
