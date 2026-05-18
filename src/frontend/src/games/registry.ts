import { mazeChaseManifest } from './maze-chase/manifest';
import { snakeManifest } from './snake/manifest';
import { ticTacToeManifest } from './tic-tac-toe/manifest';
import type { GameManifest } from './shared/types';

export const gameManifests: GameManifest[] = [mazeChaseManifest, snakeManifest, ticTacToeManifest];

export function getGameManifestBySlug(slug: string): GameManifest | undefined {
  return gameManifests.find((manifest) => manifest.slug === slug);
}
