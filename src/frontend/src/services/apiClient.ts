export const API_BASE_PATH = '/api/v1';

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
	const response = await fetch(`${API_BASE_PATH}${path}`, {
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			...(init.headers ?? {}),
		},
		...init,
	});

	if (!response.ok) {
		const payload = (await response.json().catch(() => null)) as { detail?: string } | null;
		throw new Error(payload?.detail ?? 'Request failed');
	}

	if (response.status === 204) {
		return undefined as T;
	}

	return response.json() as Promise<T>;
}
