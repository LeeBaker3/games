import { apiRequest } from './apiClient';
import type {
	AuthResponse,
	LoginPayload,
	RegisterPayload,
	UpdateProfilePayload,
	UserProfile,
} from '../types/api';

export async function registerAccount(payload: RegisterPayload): Promise<AuthResponse> {
	return apiRequest<AuthResponse>('/auth/register', {
		method: 'POST',
		body: JSON.stringify(payload),
	});
}

export async function loginAccount(payload: LoginPayload): Promise<AuthResponse> {
	return apiRequest<AuthResponse>('/auth/login', {
		method: 'POST',
		body: JSON.stringify(payload),
	});
}

export async function logoutAccount(): Promise<{ status: string }> {
	return apiRequest<{ status: string }>('/auth/logout', {
		method: 'POST',
	});
}

export async function getCurrentUser(): Promise<UserProfile> {
	return apiRequest<UserProfile>('/me');
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
	return apiRequest<UserProfile>('/me', {
		method: 'PATCH',
		body: JSON.stringify(payload),
	});
}
