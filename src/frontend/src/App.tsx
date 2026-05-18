import { AppLayout } from './layouts/AppLayout';
import { GameHubPage } from './pages/GameHubPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { SnakeGame } from './games/snake/SnakeGame';

export function App() {
    return (
        <AppLayout>
            <main className="app-shell">
                <GameHubPage />
                <SnakeGame />
                <LoginPage />
                <ProfilePage />
            </main>
        </AppLayout>
    );
}
