export type MatchStatus = 'waiting' | 'active' | 'complete';

export interface MatchPlayer {
	id: string;
	displayName: string;
}

export interface MatchSummary {
	id: string;
	gameSlug: string;
	inviteToken: string;
	status: MatchStatus;
	host: MatchPlayer;
	guest: MatchPlayer | null;
	winner: MatchPlayer | null;
	createdAt: string;
	updatedAt: string;
}

export interface CreateMatchPayload {
	gameSlug: string;
}

export interface JoinMatchPayload {
	inviteToken: string;
}

export interface MatchConnectionState {
	connected: boolean;
	message: string;
	match: MatchSummary | null;
}
