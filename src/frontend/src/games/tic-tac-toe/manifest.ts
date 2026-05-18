import type { GameManifest } from '../shared/types';

export const ticTacToeManifest: GameManifest = {
  slug: 'tic-tac-toe',
  title: 'Tic-Tac-Toe',
  modes: ['private-invite'],
  supportsAnonymousPlay: false,
  supportsLeaderboards: false,
};
