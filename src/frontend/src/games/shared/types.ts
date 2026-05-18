export type GameMode = 'single-player' | 'private-invite';

export interface GameManifest {
  slug: string;
  title: string;
  modes: GameMode[];
  supportsAnonymousPlay: boolean;
  supportsLeaderboards: boolean;
}
