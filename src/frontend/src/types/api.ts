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

export interface LeaderboardPlayer {
    id: string;
    displayName: string;
}

export interface LeaderboardEntry {
    rank: number;
    user: LeaderboardPlayer;
    score: number;
    submittedAt: string;
    moderationStatus: 'approved' | 'flagged';
    moderationReason: string | null;
}

export interface LeaderboardPageResponse {
    gameSlug: string;
    entries: LeaderboardEntry[];
    total: number;
    limit: number;
    offset: number;
    currentUserRank: number | null;
}

export interface ScoreSubmissionPayload {
    score: number;
    metadata?: Record<string, string>;
}

export interface ScoreSubmissionResponse {
    gameSlug: string;
    score: number;
    rank: number;
    moderationStatus: 'approved' | 'flagged';
    moderationReason: string | null;
}
