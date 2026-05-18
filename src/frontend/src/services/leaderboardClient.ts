import { apiRequest } from './apiClient';
import type {
	LeaderboardPageResponse,
	ScoreSubmissionPayload,
	ScoreSubmissionResponse,
} from '../types/api';

export async function getLeaderboard(
	gameSlug: string,
	limit = 10,
	offset = 0,
): Promise<LeaderboardPageResponse> {
	return apiRequest<LeaderboardPageResponse>(
		`/games/${gameSlug}/leaderboard?limit=${limit}&offset=${offset}`,
	);
}

export async function submitScore(
	gameSlug: string,
	payload: ScoreSubmissionPayload,
): Promise<ScoreSubmissionResponse> {
	return apiRequest<ScoreSubmissionResponse>(`/games/${gameSlug}/scores`, {
		method: 'POST',
		body: JSON.stringify(payload),
	});
}
