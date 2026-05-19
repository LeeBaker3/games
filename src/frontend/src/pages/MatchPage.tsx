import { FormEvent, useState } from 'react';

import { useAuth } from '../hooks/useAuth';
import { createMatch, getMatch, joinMatch } from '../services/matchClient';
import { useWebSocketMatch } from '../hooks/useWebSocketMatch';
import type { MatchSummary } from '../types/match';

export function MatchPage() {
    const { user } = useAuth();
    const [gameSlug, setGameSlug] = useState('tic-tac-toe');
    const [inviteToken, setInviteToken] = useState('');
    const [match, setMatch] = useState<MatchSummary | null>(null);
    const [statusMessage, setStatusMessage] = useState('Create a private match to start');
    const connectionState = useWebSocketMatch(match?.id ?? null);

    const createPrivateMatch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await createMatch({ gameSlug });
            setMatch(response);
            setInviteToken(response.inviteToken);
            setStatusMessage(`Share invite token ${response.inviteToken} with a second player.`);
        } catch (error) {
            setStatusMessage(error instanceof Error ? error.message : 'Unable to create match.');
        }
    };

    const joinPrivateMatch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!match) {
            setStatusMessage('Create a match before joining it.');
            return;
        }

        try {
            const joined = await joinMatch(match.id, { inviteToken });
            setMatch(joined);
            setStatusMessage('Joined private match.');
        } catch (error) {
            setStatusMessage(error instanceof Error ? error.message : 'Unable to join match.');
        }
    };

    const refreshMatch = async () => {
        if (!match) {
            return;
        }
        const response = await getMatch(match.id);
        setMatch(response);
    };

    return (
        <section className="match-panel" aria-labelledby="match-title">
            <div className="section-heading">
                <p className="eyebrow">Private invite</p>
                <h2 id="match-title">Tic-Tac-Toe multiplayer</h2>
            </div>

            <p className="match-summary">
                Authenticated players can create a private room, share an invite token, and join a
                realtime match.
            </p>

            <p className="match-status">{user ? `Signed in as ${user.displayName}` : 'Sign in to play.'}</p>
            <p className="match-status">{statusMessage}</p>
            <p className="match-status">{connectionState.message}</p>

            <div className="match-grid">
                <form className="auth-card" onSubmit={createPrivateMatch}>
                    <h3>Create room</h3>
                    <label>
                        Game
                        <select value={gameSlug} onChange={(event) => setGameSlug(event.target.value)}>
                            <option value="tic-tac-toe">Tic-Tac-Toe</option>
                        </select>
                    </label>
                    <button type="submit" disabled={!user}>
                        Create private match
                    </button>
                </form>

                <form className="auth-card" onSubmit={joinPrivateMatch}>
                    <h3>Join room</h3>
                    <label>
                        Invite token
                        <input
                            type="text"
                            value={inviteToken}
                            onChange={(event) => setInviteToken(event.target.value)}
                        />
                    </label>
                    <button type="submit" disabled={!user || !match}>
                        Join private match
                    </button>
                </form>
            </div>

            {match ? (
                <article className="match-card">
                    <h3>Current room</h3>
                    <dl className="profile-details">
                        <div>
                            <dt>Status</dt>
                            <dd>{match.status}</dd>
                        </div>
                        <div>
                            <dt>Host</dt>
                            <dd>{match.host.displayName}</dd>
                        </div>
                        <div>
                            <dt>Guest</dt>
                            <dd>{match.guest?.displayName ?? 'Waiting for player 2'}</dd>
                        </div>
                        <div>
                            <dt>Invite token</dt>
                            <dd>{match.inviteToken}</dd>
                        </div>
                    </dl>
                    <button type="button" onClick={refreshMatch}>
                        Refresh room
                    </button>
                </article>
            ) : null}
        </section>
    );
}
