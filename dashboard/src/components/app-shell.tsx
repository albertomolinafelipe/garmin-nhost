import { LayoutDashboard } from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";

import { iconifyIcon } from "@/lib/activity-types";

const CalendarDays = iconifyIcon("mdi:calendar-month");
const Activity = iconifyIcon("mdi:format-list-bulleted");
const Target = iconifyIcon("material-symbols:target");
const Settings = iconifyIcon("mdi:cog");
const Megaphone = iconifyIcon("mdi:bullhorn");
const ChevronDown = iconifyIcon("mdi:chevron-down");
const LogIn = iconifyIcon("mdi:login");
const LogOut = iconifyIcon("mdi:logout");
import { NavLink } from "react-router-dom";

import { LoginDialog } from "@/components/login-dialog";
import { NhostLogo } from "@/components/nhost-logo";
import { SyncButton } from "@/components/sync-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarTrigger,
	useSidebar,
} from "@/components/ui/sidebar";
import { needsAnnotation, typeLabel } from "@/lib/activity-types";
import { fmtDay } from "@/lib/format";
import { useActivities } from "@/lib/queries";

const NAV = [
	{ to: "/overview", label: "Overview", icon: LayoutDashboard },
	{ to: "/calendar", label: "Calendar", icon: CalendarDays },
	{ to: "/activities", label: "Activities", icon: Activity },
	{ to: "/plans", label: "Plans", icon: Target },
	{ to: "/settings", label: "Settings", icon: Settings },
];

function NeedsAnnotationGroup({ onNavigate }: { onNavigate: () => void }) {
	const { data } = useActivities();
	const incomplete = useMemo(
		() =>
			(data?.activities ?? [])
				.filter(needsAnnotation)
				.sort((a, b) => (b.start_time ?? "").localeCompare(a.start_time ?? "")),
		[data?.activities],
	);

	if (incomplete.length === 0) return null;

	return (
		<SidebarGroup>
			<SidebarMenu>
				<Collapsible defaultOpen className="group/annotate">
					<SidebarMenuItem>
						<CollapsibleTrigger asChild>
							<SidebarMenuButton>
								<Megaphone className="size-4" />
								Needs annotation
								<span className="bg-sidebar-accent text-sidebar-accent-foreground ml-auto rounded-full px-1.5 text-xs">
									{incomplete.length}
								</span>
								<ChevronDown className="size-4 transition-transform group-data-[state=open]/annotate:rotate-180" />
							</SidebarMenuButton>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<SidebarMenuSub>
								{incomplete.map((activity) => (
									<SidebarMenuSubItem key={activity.id}>
										<NavLink
											to={`/activities/${activity.id}`}
											onClick={onNavigate}
										>
											{({ isActive }) => (
												<SidebarMenuSubButton asChild isActive={isActive}>
													<span>
														<span className="min-w-0 truncate">
															{activity.name ??
																typeLabel(
																	activity.activity_type,
																	activity.subtype,
																)}
														</span>
														<span className="text-muted-foreground ml-auto shrink-0 text-xs">
															{fmtDay(activity.start_time)}
														</span>
													</span>
												</SidebarMenuSubButton>
											)}
										</NavLink>
									</SidebarMenuSubItem>
								))}
							</SidebarMenuSub>
						</CollapsibleContent>
					</SidebarMenuItem>
				</Collapsible>
			</SidebarMenu>
		</SidebarGroup>
	);
}

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
				{secret ? (
					<NeedsAnnotationGroup onNavigate={() => setOpenMobile(false)} />
				) : null}
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
					<NhostLogo className="size-7" />
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
