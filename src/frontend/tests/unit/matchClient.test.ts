import { afterEach, describe, expect, it, vi } from 'vitest';

import { createMatch, getMatch, joinMatch } from '../../src/services/matchClient';

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('match client', () => {
    it('creates private matches with credentials included', async () => {
        const fetchMock = vi.fn().mockResolvedValue(
            new Response(
                JSON.stringify({
                    id: 'match-1',
                    gameSlug: 'tic-tac-toe',
                    inviteToken: 'invite-token',
                    status: 'waiting',
                    host: { id: 'user-1', displayName: 'Host' },
                    guest: null,
                    winner: null,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }),
                { status: 200 },
            ),
        );
        vi.stubGlobal('fetch', fetchMock);

        const response = await createMatch({ gameSlug: 'tic-tac-toe' });

        expect(fetchMock).toHaveBeenCalledWith(
            '/api/v1/matches',
            expect.objectContaining({ method: 'POST', credentials: 'include' }),
        );
        expect(response.inviteToken).toBe('invite-token');
    });

    it('joins and fetches a private match', async () => {
        const fetchMock = vi
            .fn()
            .mockResolvedValueOnce(
                new Response(
                    JSON.stringify({
                        id: 'match-1',
                        gameSlug: 'tic-tac-toe',
                        inviteToken: 'invite-token',
                        status: 'active',
                        host: { id: 'user-1', displayName: 'Host' },
                        guest: { id: 'user-2', displayName: 'Guest' },
                        winner: null,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    }),
                    { status: 200 },
                ),
            )
            .mockResolvedValueOnce(
                new Response(
                    JSON.stringify({
                        id: 'match-1',
                        gameSlug: 'tic-tac-toe',
                        inviteToken: 'invite-token',
                        status: 'active',
                        host: { id: 'user-1', displayName: 'Host' },
                        guest: { id: 'user-2', displayName: 'Guest' },
                        winner: null,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    }),
                    { status: 200 },
                ),
            );
        vi.stubGlobal('fetch', fetchMock);

        const joinResponse = await joinMatch('match-1', { inviteToken: 'invite-token' });
        const getResponse = await getMatch('match-1');

        expect(fetchMock).toHaveBeenCalledWith(
            '/api/v1/matches/match-1/join',
            expect.objectContaining({ method: 'POST', credentials: 'include' }),
        );
        expect(joinResponse.status).toBe('active');
        expect(getResponse.id).toBe('match-1');
    });
});