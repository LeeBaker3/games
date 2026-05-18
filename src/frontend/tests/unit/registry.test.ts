import { describe, expect, it } from 'vitest';

import { gameManifests, getGameManifestBySlug } from '../../src/games/registry';

describe('game registry', () => {
  it('exposes the MVP game manifests', () => {
    expect(gameManifests.map((manifest) => manifest.slug)).toEqual([
      'maze-chase',
      'snake',
      'tic-tac-toe',
    ]);
  });

  it('looks up a manifest by slug', () => {
    expect(getGameManifestBySlug('snake')).toMatchObject({
      slug: 'snake',
      title: 'Snake',
      supportsAnonymousPlay: true,
    });
  });

  it('returns undefined for an unknown slug', () => {
    expect(getGameManifestBySlug('unknown-game')).toBeUndefined();
  });
});
