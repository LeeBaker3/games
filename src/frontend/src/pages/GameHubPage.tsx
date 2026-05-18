import { gameManifests } from '../games/registry';

type GameHubPageProps = {
    onLaunchGame: (section: 'maze-chase' | 'snake' | 'leaderboards' | 'multiplayer' | 'account') => void;
};

export function GameHubPage({ onLaunchGame }: GameHubPageProps) {
    return (
        <>
            <section className="hero-panel" aria-labelledby="hero-title">
                <div className="hero-copy">
                    <p className="eyebrow">Fun Games Platform</p>
                    <h1 id="hero-title">One screen for quick games, scores, and private matches.</h1>
                    <p className="hero-summary">
                        Launch a game from the top menu, jump back to the hub at any time, and keep the
                        whole experience focused on play instead of implementation details.
                    </p>
                </div>

                <div className="hero-actions" aria-label="Quick launch actions">
                    <button type="button" onClick={() => onLaunchGame('maze-chase')}>
                        Play Maze Chase
                    </button>
                    <button type="button" onClick={() => onLaunchGame('snake')}>
                        Play Snake
                    </button>
                    <button type="button" onClick={() => onLaunchGame('multiplayer')}>
                        Open Multiplayer
                    </button>
                </div>
            </section>

            <section className="catalog-panel" aria-labelledby="catalog-title">
                <div className="section-heading">
                    <p className="eyebrow">Game catalog</p>
                    <h2 id="catalog-title">Available games</h2>
                </div>

                <div className="game-grid">
                    {gameManifests.map((manifest) => (
                        <article key={manifest.slug} className="game-card game-card--launchable">
                            <div className="game-card__header">
                                <h3>{manifest.title}</h3>
                            </div>

                            <dl className="game-card__details">
                                <div>
                                    <dt>Modes</dt>
                                    <dd>{manifest.modes.join(', ')}</dd>
                                </div>
                                <div>
                                    <dt>Anonymous play</dt>
                                    <dd>{manifest.supportsAnonymousPlay ? 'Yes' : 'No'}</dd>
                                </div>
                                <div>
                                    <dt>Leaderboards</dt>
                                    <dd>{manifest.supportsLeaderboards ? 'Yes' : 'No'}</dd>
                                </div>
                            </dl>

                            <button
                                type="button"
                                className="game-card__launch"
                                onClick={() => {
                                    if (manifest.slug === 'maze-chase') {
                                        onLaunchGame('maze-chase');
                                    }

                                    if (manifest.slug === 'snake') {
                                        onLaunchGame('snake');
                                    }
                                }}
                                disabled={manifest.slug === 'tic-tac-toe'}
                            >
                                {manifest.slug === 'tic-tac-toe' ? 'Private invite only' : 'Play now'}
                            </button>
                        </article>
                    ))}
                </div>
            </section>

            <section className="foundation-panel" aria-labelledby="foundation-title">
                <div className="section-heading">
                    <p className="eyebrow">Foundation</p>
                    <h2 id="foundation-title">Accounts, scores, and multiplayer live in one place</h2>
                </div>

                <p>
                    Use the menu bar to move between games, account screens, leaderboards, and private
                    matches without leaving the app chrome.
                </p>
            </section>
        </>
    );
}
