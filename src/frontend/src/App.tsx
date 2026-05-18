import { AppLayout } from './layouts/AppLayout';
import { GameHubPage } from './pages/GameHubPage';
import { SnakeGame } from './games/snake/SnakeGame';

export function App() {
  return (
    <AppLayout>
      <main className="app-shell">
        <GameHubPage />
        <SnakeGame />
      </main>
    </AppLayout>
  );
}
