import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { MazeChaseGame } from '../../src/games/maze-chase/MazeChaseGame';

describe('Maze Chase game', () => {
    it('renders the anonymous play surface and controls', () => {
        const markup = renderToStaticMarkup(<MazeChaseGame />);

        expect(markup).toContain('Maze Chase');
        expect(markup).toContain('Collect all three beacons');
        expect(markup).toContain('Start');
        expect(markup).toContain('Restart');
        expect(markup).toContain('maze-chase-board');
    });
});