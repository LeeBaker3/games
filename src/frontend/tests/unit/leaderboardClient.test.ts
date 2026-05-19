import { afterEach, describe, expect, it, vi } from 'vitest';

import { getLeaderboard, submitScore } from '../../src/services/leaderboardClient';

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('leaderboard client', () => {
    it('requests leaderboard data for a game', async () => {
        const fetchMock = vi.fn().mockResolvedValue(
            new Response(
                JSON.stringify({
                    gameSlug: 'snake',
                    entries: [],
                    total: 0,
                    limit: 10,
                    offset: 0,
                    currentUserRank: null,
                }),
                { status: 200 },
            ),
        );
        vi.stubGlobal('fetch', fetchMock);

        const response = await getLeaderboard('snake', 10, 0);

        expect(fetchMock).toHaveBeenCalledWith(
            '/api/v1/games/snake/leaderboard?limit=10&offset=0',
            expect.objectContaining({ credentials: 'include' }),
        );
        expect(response.gameSlug).toBe('snake');
    });

    it('submits a score with credentials included', async () => {
        const fetchMock = vi.fn().mockResolvedValue(
            new Response(
                JSON.stringify({
                    gameSlug: 'snake',
                    score: 12,
                    rank: 1,
                    moderationStatus: 'approved',
                    moderationReason: null,
                }),
                { status: 200 },
            ),
        );
        vi.stubGlobal('fetch', fetchMock);

        const response = await submitScore('snake', { score: 12, metadata: { status: 'complete' } });

        expect(fetchMock).toHaveBeenCalledWith(
            '/api/v1/games/snake/scores',
            expect.objectContaining({
                method: 'POST',
                credentials: 'include',
            }),
        );
        expect(response.rank).toBe(1);
    });
});