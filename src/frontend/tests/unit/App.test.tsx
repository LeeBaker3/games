import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { App } from '../../src/App';

describe('App shell', () => {
    it('renders the menu-driven home shell without API copy', () => {
        const markup = renderToStaticMarkup(<App />);

        expect(markup).toContain('Play instantly from a clean game menu.');
        expect(markup).toContain('Games');
        expect(markup).toContain('single-player');
        expect(markup).toContain('multiplayer');
        expect(markup).toContain('Home');
        expect(markup).toContain('Maze Chase');
        expect(markup).toContain('Snake');
        expect(markup).toContain('Tic-Tac-Toe');
        expect(markup).toContain('Play Maze Chase');
        expect(markup).toContain('Play Snake');
        expect(markup).toContain('Open Multiplayer');
        expect(markup).not.toContain('/api/v1/health');
    });
});