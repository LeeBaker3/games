export interface ApiError {
    message: string;
}

export interface UserProfile {
    id: string;
    displayName: string;
    email: string;
    authProvider: string | null;
    createdAt: string;
}

export interface AuthResponse {
    user: UserProfile;
    sessionToken: string;
}

export interface RegisterPayload {
    displayName: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface UpdateProfilePayload {
    displayName: string;
}
