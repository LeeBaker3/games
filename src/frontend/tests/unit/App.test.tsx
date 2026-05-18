import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { App } from '../../src/App';

describe('App shell', () => {
  it('renders the hub shell, catalog, and snake controls', () => {
    const markup = renderToStaticMarkup(<App />);

    expect(markup).toContain('One hub for quick games, scores, and private matches.');
    expect(markup).toContain('Maze Chase');
    expect(markup).toContain('Snake');
    expect(markup).toContain('Tic-Tac-Toe');
    expect(markup).toContain('/api/v1/health');
    expect(markup).toContain('Start');
    expect(markup).toContain('Pause');
    expect(markup).toContain('Resume');
  });
});