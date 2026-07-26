import {
	Activity,
	CalendarDays,
	LayoutDashboard,
	LogIn,
	LogOut,
	Settings,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";

import { LoginDialog } from "@/components/login-dialog";
import { NhostLogo } from "@/components/nhost-logo";
import { SyncButton } from "@/components/sync-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
	useSidebar,
} from "@/components/ui/sidebar";

const NAV = [
	{ to: "/overview", label: "Overview", icon: LayoutDashboard },
	{ to: "/calendar", label: "Calendar", icon: CalendarDays },
	{ to: "/activities", label: "Activities", icon: Activity },
	{ to: "/settings", label: "Settings", icon: Settings },
];

function AppSidebar({
	secret,
	onLogin,
	onForget,
}: {
	secret: string | null;
	onLogin: () => void;
	onForget: () => void;
}) {
	const { setOpenMobile } = useSidebar();
	return (
		<Sidebar>
			<SidebarHeader>
				<div className="flex flex-col items-center gap-2 px-4 py-4">
					<NhostLogo className="size-16" />
					<span className="font-semibold">garmin-nhost</span>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{NAV.map(({ to, label, icon: Icon }) => (
							<SidebarMenuItem key={to}>
								<NavLink to={to} onClick={() => setOpenMobile(false)}>
									{({ isActive }) => (
										<SidebarMenuButton asChild isActive={isActive}>
											<span>
												<Icon className="size-4" />
												{label}
											</span>
										</SidebarMenuButton>
									)}
								</NavLink>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
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
			</SidebarFooter>
		</Sidebar>
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
	const [loginOpen, setLoginOpen] = useState(false);

	return (
		<SidebarProvider>
			<AppSidebar
				secret={secret}
				onLogin={() => setLoginOpen(true)}
				onForget={onForget}
			/>
			<SidebarInset>
				<header className="bg-sidebar text-sidebar-foreground border-sidebar-border flex h-14 shrink-0 items-center gap-2 border-b px-4 md:hidden">
					<SidebarTrigger />
					<div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-7 items-center justify-center rounded-md">
						<NhostLogo className="size-4" />
					</div>
					<span className="font-semibold">garmin-nhost</span>
				</header>
				<div className="min-w-0 flex-1 overflow-auto">{children}</div>
			</SidebarInset>

			<LoginDialog
				open={loginOpen}
				onClose={() => setLoginOpen(false)}
				onAuthenticated={onAuthenticated}
			/>
		</SidebarProvider>
	);
}
