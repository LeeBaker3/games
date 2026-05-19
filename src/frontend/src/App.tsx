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

type GameMenuItem = {
    key: AppSection;
    label: string;
    modes: Array<'single-player' | 'multiplayer'>;
};

const sections: Array<{ key: AppSection; label: string }> = [
    { key: 'home', label: 'Home' },
    { key: 'leaderboards', label: 'Leaderboards' },
    { key: 'multiplayer', label: 'Multiplayer' },
    { key: 'account', label: 'Account' },
];

const gameMenuItems: GameMenuItem[] = [
    { key: 'maze-chase', label: 'Maze Chase', modes: ['single-player'] },
    { key: 'snake', label: 'Snake', modes: ['single-player'] },
    { key: 'multiplayer', label: 'Tic-Tac-Toe', modes: ['multiplayer'] },
];

export function App() {
    const [activeSection, setActiveSection] = useState<AppSection>('home');
    const [isGameMenuOpen, setIsGameMenuOpen] = useState(false);

    return (
        <AppLayout>
            <div className="app-frame">
                <header className="site-header" aria-label="Primary navigation">
                    <div className="brand-lockup">
                        <span className="brand-mark">FG</span>
                        <div>
                            <p className="brand-eyebrow">Fun Games</p>
                            <h1>Play instantly from a clean game menu.</h1>
                        </div>
                    </div>

                    <nav className="top-nav" aria-label="Games and account navigation">
                        <div className="game-menu">
                            <button
                                type="button"
                                className={isGameMenuOpen ? 'top-nav__item top-nav__item--active' : 'top-nav__item'}
                                aria-haspopup="menu"
                                aria-expanded={isGameMenuOpen}
                                onClick={() => setIsGameMenuOpen((currentValue) => !currentValue)}
                            >
                                Games
                            </button>

                            {isGameMenuOpen ? (
                                <div className="game-menu__panel" role="menu" aria-label="Select a game">
                                    {gameMenuItems.map((item) => (
                                        <button
                                            key={item.key}
                                            type="button"
                                            className="game-menu__item"
                                            role="menuitem"
                                            onClick={() => {
                                                setActiveSection(item.key);
                                                setIsGameMenuOpen(false);
                                            }}
                                        >
                                            <span className="game-menu__item-label">{item.label}</span>
                                            <span className="game-menu__item-tags">{item.modes.join(' · ')}</span>
                                        </button>
                                    ))}
                                </div>
                            ) : null}
                        </div>

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
                                onClick={() => {
                                    setActiveSection(section.key);
                                    setIsGameMenuOpen(false);
                                }}
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
