import { type ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import {
	Activity,
	CalendarDays,
	LayoutDashboard,
	LogIn,
	LogOut,
	Menu,
	X,
} from "lucide-react";

import { LoginDialog } from "@/components/login-dialog";
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

function SidebarContent({
	secret,
	onLogin,
	onForget,
	onNavigate,
}: {
	secret: string | null;
	onLogin: () => void;
	onForget: () => void;
	onNavigate?: () => void;
}) {
	return (
		<>
			<div className="flex flex-col items-center gap-2 px-4 py-6">
				<NhostLogo className="size-16" />
				<span className="font-semibold">garmin-nhost</span>
			</div>

			<nav className="flex flex-1 flex-col gap-1 p-2">
				{NAV.map(({ to, label, icon: Icon }) => (
					<NavLink
						key={to}
						to={to}
						onClick={onNavigate}
						className={({ isActive }) =>
							cn(
								"flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
								"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
								isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
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
				{secret ? (
					<Button
						variant="ghost"
						className="w-full justify-start"
						onClick={onForget}
					>
						<LogOut className="size-4" />
						Forget secret
					</Button>
				) : (
					<Button
						variant="ghost"
						className="w-full justify-start"
						onClick={onLogin}
					>
						<LogIn className="size-4" />
						Login
					</Button>
				)}
			</div>
		</>
	);
}

export function AppShell({
	children,
	secret,
	onAuthenticated,
	onForget,
}: {
	children: ReactNode;
	secret: string | null;
	onAuthenticated: (secret: string) => void;
	onForget: () => void;
}) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [loginOpen, setLoginOpen] = useState(false);

	return (
		<div className="flex h-svh flex-col md:flex-row">
			{/* Mobile top bar */}
			<header className="bg-sidebar text-sidebar-foreground border-sidebar-border flex h-14 shrink-0 items-center gap-2 border-b px-4 md:hidden">
				<Button
					variant="ghost"
					size="icon"
					aria-label="Open menu"
					onClick={() => setMobileOpen(true)}
				>
					<Menu className="size-5" />
				</Button>
				<div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-7 items-center justify-center rounded-md">
					<NhostLogo className="size-4" />
				</div>
				<span className="font-semibold">garmin-nhost</span>
			</header>

			{/* Desktop sidebar */}
			<aside className="bg-sidebar text-sidebar-foreground border-sidebar-border hidden w-60 shrink-0 flex-col border-r md:flex">
				<SidebarContent
					secret={secret}
					onLogin={() => setLoginOpen(true)}
					onForget={onForget}
				/>
			</aside>

			{/* Mobile drawer */}
			{mobileOpen && (
				<div className="fixed inset-0 z-50 md:hidden">
					<button
						type="button"
						aria-label="Close menu"
						className="absolute inset-0 bg-black/50"
						onClick={() => setMobileOpen(false)}
					/>
					<div className="bg-sidebar text-sidebar-foreground border-sidebar-border absolute inset-y-0 left-0 flex w-64 max-w-[80%] flex-col border-r shadow-xl">
						<div className="flex justify-end p-2">
							<Button
								variant="ghost"
								size="icon"
								aria-label="Close menu"
								onClick={() => setMobileOpen(false)}
							>
								<X className="size-5" />
							</Button>
						</div>
						<SidebarContent
							secret={secret}
							onLogin={() => {
								setMobileOpen(false);
								setLoginOpen(true);
							}}
							onForget={() => {
								setMobileOpen(false);
								onForget();
							}}
							onNavigate={() => setMobileOpen(false)}
						/>
					</div>
				</div>
			)}

			<main className="min-w-0 flex-1 overflow-auto">{children}</main>

			<LoginDialog
				open={loginOpen}
				onClose={() => setLoginOpen(false)}
				onAuthenticated={onAuthenticated}
			/>
		</div>
	);
}
