import { createElement, type ComponentType, type CSSProperties } from "react";
import { Icon } from "@iconify/react";
import { Snowflake, Sun, CloudLightning } from "lucide-react";

// Presentation-layer taxonomy that abstracts Garmin's many raw activity types
// into a handful of categories, plus optional subtypes. Ported from garmin-dash.

export type IconComponent = ComponentType<{
	className?: string;
	size?: number;
	style?: CSSProperties;
}>;

// Adapts an Iconify icon to our lucide-compatible IconComponent shape so the
// categoryIcon map can mix lucide and Iconify glyphs transparently.
export function iconifyIcon(name: string): IconComponent {
	return ({ className, size = 24, style }) =>
		createElement(Icon, {
			icon: name,
			width: size,
			height: size,
			className,
			style,
		});
}

export type Category =
	| "running"
	| "climbing"
	| "strength"
	| "hiking"
	| "swimming"
	| "cycling"
	| "other";

// Canonical order for filters / legends.
export const CATEGORY_ORDER: Category[] = [
	"running",
	"climbing",
	"strength",
	"hiking",
	"swimming",
	"cycling",
	"other",
];

export const RUNNING_SUBTYPES = [
	"road",
	"treadmill",
	"trail",
	"mountain",
] as const;
export const CLIMBING_SUBTYPES = ["boulder", "route", "board", "mix"] as const;

export const CLIMBING_FOCUS = [
	{ value: "general-strength", label: "General strength" },
	{ value: "specific-strength", label: "Specific strength" },
	{ value: "power", label: "Power" },
	{ value: "endurance", label: "Endurance" },
	{ value: "power-endurance", label: "Power-endurance" },
	{ value: "mix", label: "Mix" },
];

export const SCALE_OPTIONS = ["I", "II", "III", "IV", "V"].map(
	(label, index) => ({ value: String(index + 1), label }),
);

export const CAFFEINE_OPTIONS = ["no", "residual", "yes"] as const;

// Empty weather means normal conditions.
export const WEATHER_OPTIONS: {
	value: string;
	icon: IconComponent;
	label: string;
}[] = [
	{ value: "cold", icon: Snowflake, label: "Exceptionally cold" },
	{ value: "hot", icon: Sun, label: "Hot" },
	{ value: "bad", icon: CloudLightning, label: "Bad conditions" },
];

const CLIMBING_GARMIN = new Set([
	"rock_climbing",
	"bouldering",
	"indoor_climbing",
	"climbing",
]);

const isClimbingSubtype = (s: string | null): boolean =>
	!!s && (CLIMBING_SUBTYPES as readonly string[]).includes(s);

export function categoryOf(
	activityType: string | null,
	subtype: string | null,
): Category {
	if (isClimbingSubtype(subtype)) return "climbing";
	const at = (activityType ?? "").toLowerCase();
	if (CLIMBING_GARMIN.has(at)) return "climbing";
	if (at.includes("running")) return "running";
	if (at.includes("swimming")) return "swimming";
	if (at.includes("cycling") || at.includes("biking")) return "cycling";
	if (["hiking", "mountaineering", "walking"].includes(at)) return "hiking";
	if (at.includes("strength")) return "strength";
	return "other";
}

function defaultRunningSubtype(activityType: string | null): string | null {
	const at = (activityType ?? "").toLowerCase();
	if (at.includes("trail")) return "trail";
	if (at.includes("treadmill") || at.includes("indoor")) return "treadmill";
	if (at.includes("running")) return "road";
	return null;
}

// The subtype to display: the user's value if set, else a sensible default.
export function effectiveSubtype(
	activityType: string | null,
	subtype: string | null,
): string | null {
	if (subtype) return subtype;
	if (categoryOf(activityType, subtype) === "running") {
		return defaultRunningSubtype(activityType);
	}
	return null;
}

export function terrainOptions(
	activityType: string | null,
): { value: string; label: string; disabled: boolean }[] {
	const at = (activityType ?? "").toLowerCase();
	let enabled: readonly string[];
	if (at.includes("trail")) enabled = ["trail", "mountain"];
	else if (at.includes("treadmill") || at.includes("indoor")) {
		enabled = ["treadmill"];
	} else enabled = ["road", "trail", "mountain"];

	return RUNNING_SUBTYPES.map((subtype) => ({
		value: subtype,
		label: subtype[0].toUpperCase() + subtype.slice(1),
		disabled: !enabled.includes(subtype),
	}));
}

export function needsSubtype(
	activityType: string | null,
	subtype: string | null,
): boolean {
	const at = (activityType ?? "").toLowerCase();
	if (categoryOf(activityType, subtype) === "climbing" && !subtype) return true;
	return at.includes("trail") && subtype !== "trail" && subtype !== "mountain";
}

export const ANNOTATED_CUTOFF = "2026-07-13";

type AnnotationCompletenessActivity = {
	start_time: string | null;
	activity_type: string | null;
	subtype: string | null;
	feeling: number | null;
	effort: number | null;
	caffeine: string | null;
	focus: string | null;
};

export function needsAnnotation(a: AnnotationCompletenessActivity): boolean {
	if (a.start_time && a.start_time.slice(0, 10) < ANNOTATED_CUTOFF) {
		return false;
	}
	const category = categoryOf(a.activity_type, a.subtype);
	if (category === "running") {
		return (
			needsSubtype(a.activity_type, a.subtype) ||
			a.feeling == null ||
			a.effort == null ||
			!a.caffeine
		);
	}
	if (category === "climbing") {
		return !a.subtype || !a.focus || a.feeling == null || a.effort == null;
	}
	if (category === "strength") {
		return a.feeling == null || a.effort == null;
	}
	return false;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Human label, e.g. "Running · Trail" or "Climbing".
export function typeLabel(
	activityType: string | null,
	subtype: string | null,
): string {
	const category = categoryOf(activityType, subtype);
	const sub = effectiveSubtype(activityType, subtype);
	return sub ? `${cap(category)} · ${cap(sub)}` : cap(category);
}

export const categoryIcon: Record<Category, IconComponent> = {
	running: iconifyIcon("mdi:run"),
	climbing: iconifyIcon("mdi:rock-climbing"),
	strength: iconifyIcon("mdi:weights"),
	hiking: iconifyIcon("mdi:pine-tree"),
	swimming: iconifyIcon("mdi:swim"),
	cycling: iconifyIcon("mdi:bike"),
	other: iconifyIcon("mdi:heart-pulse"),
};

// Category accent colors (Kanagawa "autumn" tones). One place to tweak per-category
// colors used by the calendar chips + week totals + charts.
export const categoryColor: Record<Category, string> = {
	running: "#658594", // dragonBlue
	climbing: "#DCA561", // autumnYellow
	strength: "#C34043", // autumnRed
	hiking: "#76946A", // autumnGreen
	swimming: "#7AA89F", // waveAqua2
	cycling: "#957FB8", // oniViolet
	other: "#727169", // fujiGray
};

// A more saturated, slightly brighter take on a category color, used where plan
// items (workouts, requirement bars) borrow the sport's identity but need to pop.
export function saturatedColor(hex: string): string {
	const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
	if (!m) return hex;
	const [r, g, b] = [m[1], m[2], m[3]].map((h) => parseInt(h, 16) / 255);
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	const d = max - min;
	let h = 0;
	if (d !== 0) {
		if (max === r) h = ((g - b) / d) % 6;
		else if (max === g) h = (b - r) / d + 2;
		else h = (r - g) / d + 4;
		h *= 60;
		if (h < 0) h += 360;
	}
	let s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
	s = Math.min(1, s * 1.8);
	const l2 = Math.min(0.62, l * 1.05);
	return `hsl(${h.toFixed(0)} ${(s * 100).toFixed(0)}% ${(l2 * 100).toFixed(0)}%)`;
}

// Saturated color for a plan sport; falls back to the plan accent token when the
// sport is null ("all sports") or unknown.
export function sportColor(sport: string | null): string {
	const base = sport ? categoryColor[sport as Category] : undefined;
	return base ? saturatedColor(base) : "var(--plan)";
}
