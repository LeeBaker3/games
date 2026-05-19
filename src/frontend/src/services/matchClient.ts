import { apiRequest } from './apiClient';
import type { CreateMatchPayload, JoinMatchPayload, MatchSummary } from '../types/match';

export async function createMatch(payload: CreateMatchPayload): Promise<MatchSummary> {
	return apiRequest<MatchSummary>('/matches', {
		method: 'POST',
		body: JSON.stringify(payload),
	});
}

export async function joinMatch(matchId: string, payload: JoinMatchPayload): Promise<MatchSummary> {
	return apiRequest<MatchSummary>(`/matches/${matchId}/join`, {
		method: 'POST',
		body: JSON.stringify(payload),
	});
}

export async function getMatch(matchId: string): Promise<MatchSummary> {
	return apiRequest<MatchSummary>(`/matches/${matchId}`);
}
