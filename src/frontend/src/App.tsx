import { gameManifests } from './games/registry';

const hubHighlights = [
  'Play instantly as a guest',
  'Use your account for scores and multiplayer',
  'Keep every game contract in one shared manifest',
];

export function App() {
  return (
    <main className="app-shell">
      <section className="hero-panel" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Fun Games Platform</p>
          <h1 id="hero-title">One hub for quick games, scores, and private matches.</h1>
          <p className="hero-summary">
            Sprint 1 establishes the versioned backend, shared game contracts, and the
            public-facing shell that the rest of the MVP builds on.
          </p>
        </div>

        <ul className="hero-highlights" aria-label="Platform highlights">
          {hubHighlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>

      <section className="catalog-panel" aria-labelledby="catalog-title">
        <div className="section-heading">
          <p className="eyebrow">Game catalog</p>
          <h2 id="catalog-title">Manifest-driven games</h2>
        </div>

        <div className="game-grid">
          {gameManifests.map((manifest) => (
            <article key={manifest.slug} className="game-card">
              <div className="game-card__header">
                <h3>{manifest.title}</h3>
                <span className="game-card__slug">/{manifest.slug}</span>
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
            </article>
          ))}
        </div>
      </section>

      <section className="foundation-panel" aria-labelledby="foundation-title">
        <div className="section-heading">
          <p className="eyebrow">Foundation</p>
          <h2 id="foundation-title">Versioned API and shared contract baseline</h2>
        </div>

        <p>
          The backend health route is available at <strong>/api/v1/health</strong>, and the
          frontend consumes a shared manifest shape so every game is described consistently.
        </p>
      </section>
    </main>
  );
}
