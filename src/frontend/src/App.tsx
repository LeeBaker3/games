import { AppLayout } from './layouts/AppLayout';
import { GameHubPage } from './pages/GameHubPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { LoginPage } from './pages/LoginPage';
import { MatchPage } from './pages/MatchPage';
import { ProfilePage } from './pages/ProfilePage';
import { MazeChaseGame } from './games/maze-chase/MazeChaseGame';
import { SnakeGame } from './games/snake/SnakeGame';

export function App() {
    return (
        <AppLayout>
            <main className="app-shell">
                <GameHubPage />
                <MazeChaseGame />
                <SnakeGame />
                <LeaderboardPage />
                <LoginPage />
                <ProfilePage />
                <MatchPage />
            </main>
        </AppLayout>
    );
}
