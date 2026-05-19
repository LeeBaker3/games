import { useEffect, useState } from 'react';

import { getLeaderboard } from '../services/leaderboardClient';
import type { LeaderboardPageResponse } from '../types/api';

const GAME_SLUG = 'snake';

export function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardPageResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        getLeaderboard(GAME_SLUG)
            .then((response) => {
                if (isMounted) {
                    setLeaderboard(response);
                }
            })
            .catch((fetchError) => {
                if (isMounted) {
                    setError(fetchError instanceof Error ? fetchError.message : 'Request failed');
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="leaderboard-panel" aria-labelledby="leaderboard-title">
            <div className="section-heading">
                <p className="eyebrow">Scores</p>
                <h2 id="leaderboard-title">Snake leaderboard</h2>
            </div>

            <p className="leaderboard-summary">
                Global all-time rankings are shown for Snake. Submit a score after finishing a run to
                appear on the board.
            </p>

            {loading ? <p className="leaderboard-status">Loading leaderboard…</p> : null}
            {error ? <p className="leaderboard-status leaderboard-status--error">{error}</p> : null}

            {leaderboard ? (
                <>
                    <div className="leaderboard-meta">
                        <span>Total players: {leaderboard.total}</span>
                        <span>
                            Your rank: {leaderboard.currentUserRank ?? 'Sign in to track your rank'}
                        </span>
                    </div>

                    <table className="leaderboard-table">
                        <thead>
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col">Player</th>
                                <th scope="col">Score</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.entries.length > 0 ? (
                                leaderboard.entries.map((entry) => (
                                    <tr key={`${entry.user.id}-${entry.rank}`}>
                                        <td>{entry.rank}</td>
                                        <td>{entry.user.displayName}</td>
                                        <td>{entry.score}</td>
                                        <td>
                                            {entry.moderationStatus}
                                            {entry.moderationReason ? `: ${entry.moderationReason}` : ''}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4}>No scores submitted yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            ) : null}
        </section>
    );
}
