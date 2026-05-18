import type { GameManifest } from '../shared/types';

export const snakeManifest: GameManifest = {
  slug: 'snake',
  title: 'Snake',
  modes: ['single-player'],
  supportsAnonymousPlay: true,
  supportsLeaderboards: true,
};
