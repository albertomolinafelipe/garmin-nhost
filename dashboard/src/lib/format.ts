// Small formatting helpers shared across pages.

export function fmtDuration(seconds: number | null): string {
	if (!seconds) return "—";
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = Math.floor(seconds % 60);
	if (h > 0) return `${h}h ${m}m`;
	if (m > 0) return `${m}m ${s}s`;
	return `${s}s`;
}

export function fmtDistance(meters: number | null): string {
	if (!meters) return "—";
	return meters >= 1000
		? `${(meters / 1000).toFixed(2)} km`
		: `${Math.round(meters)} m`;
}

export function fmtDate(iso: string | null): string {
	if (!iso) return "—";
	const d = new Date(iso);
	return Number.isNaN(d.getTime()) ? iso : d.toLocaleString();
}

// Local YYYY-MM-DD key for a Date (matches the local date in a start_time string,
// avoiding the UTC drift you'd get from toISOString()).
export function dayKey(d: Date): string {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
}
