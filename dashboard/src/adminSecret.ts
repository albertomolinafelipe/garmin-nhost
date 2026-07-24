const STORAGE_KEY = "garmin.hasuraAdminSecret";

export function getAdminSecret(): string | null {
	return sessionStorage.getItem(STORAGE_KEY);
}

export function setAdminSecret(secret: string): void {
	sessionStorage.setItem(STORAGE_KEY, secret);
}

export function clearAdminSecret(): void {
	sessionStorage.removeItem(STORAGE_KEY);
}
