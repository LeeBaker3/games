import { AppLayout } from './layouts/AppLayout';
import { GameHubPage } from './pages/GameHubPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { SnakeGame } from './games/snake/SnakeGame';

export function App() {
    return (
        <AppLayout>
            <main className="app-shell">
                <GameHubPage />
                <SnakeGame />
                <LeaderboardPage />
                <LoginPage />
                <ProfilePage />
            </main>
        </AppLayout>
    );
}
