import { useState } from 'react';

import { AppLayout } from './layouts/AppLayout';
import { GameHubPage } from './pages/GameHubPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { LoginPage } from './pages/LoginPage';
import { MatchPage } from './pages/MatchPage';
import { ProfilePage } from './pages/ProfilePage';
import { MazeChaseGame } from './games/maze-chase/MazeChaseGame';
import { SnakeGame } from './games/snake/SnakeGame';

type AppSection = 'home' | 'maze-chase' | 'snake' | 'leaderboards' | 'multiplayer' | 'account';

const sections: Array<{ key: AppSection; label: string }> = [
    { key: 'home', label: 'Home' },
    { key: 'maze-chase', label: 'Maze Chase' },
    { key: 'snake', label: 'Snake' },
    { key: 'leaderboards', label: 'Leaderboards' },
    { key: 'multiplayer', label: 'Multiplayer' },
    { key: 'account', label: 'Account' },
];

export function App() {
    const [activeSection, setActiveSection] = useState<AppSection>('home');

    return (
        <AppLayout>
            <div className="app-frame">
                <header className="site-header" aria-label="Primary navigation">
                    <div className="brand-lockup">
                        <span className="brand-mark">FG</span>
                        <div>
                            <p className="brand-eyebrow">Fun Games</p>
                            <h1>Play instantly, from one clean menu.</h1>
                        </div>
                    </div>

                    <nav className="top-nav" aria-label="Games and account navigation">
                        {sections.map((section) => (
                            <button
                                key={section.key}
                                type="button"
                                className={
                                    section.key === activeSection
                                        ? 'top-nav__item top-nav__item--active'
                                        : 'top-nav__item'
                                }
                                aria-current={section.key === activeSection ? 'page' : undefined}
                                onClick={() => setActiveSection(section.key)}
                            >
                                {section.label}
                            </button>
                        ))}
                    </nav>
                </header>

                <main className="app-shell app-shell--immersive">
                    {activeSection === 'home' ? <GameHubPage onLaunchGame={setActiveSection} /> : null}
                    {activeSection === 'maze-chase' ? <MazeChaseGame /> : null}
                    {activeSection === 'snake' ? <SnakeGame /> : null}
                    {activeSection === 'leaderboards' ? <LeaderboardPage /> : null}
                    {activeSection === 'multiplayer' ? <MatchPage /> : null}
                    {activeSection === 'account' ? (
                        <section className="account-stage" aria-label="Account management">
                            <LoginPage />
                            <ProfilePage />
                        </section>
                    ) : null}
                </main>
            </div>
        </AppLayout>
    );
}
