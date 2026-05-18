import { describe, expect, it } from 'vitest';

import {
  advanceSnakeGame,
  createSnakeGameState,
  pauseSnakeGame,
  restartSnakeGame,
  resumeSnakeGame,
  startSnakeGame,
  turnSnakeGame,
} from '../../src/games/snake/snake-engine';

describe('snake engine', () => {
  it('starts, pauses, resumes, and restarts the game', () => {
    const started = startSnakeGame(createSnakeGameState());
    const paused = pauseSnakeGame(started);
    const resumed = resumeSnakeGame(paused);
    const restarted = restartSnakeGame(resumed);

    expect(started.status).toBe('running');
    expect(paused.status).toBe('paused');
    expect(resumed.status).toBe('running');
    expect(restarted.status).toBe('running');
    expect(restarted.score).toBe(0);
  });

  it('prevents reversing directly into the snake body', () => {
    const started = startSnakeGame(createSnakeGameState());
    const turned = turnSnakeGame(started, 'left');

    expect(turned.direction).toBe('right');
  });

  it('advances the snake and grows after eating food', () => {
    const started = startSnakeGame({
      ...createSnakeGameState(),
      food: { x: 6, y: 5 },
    });

    const advanced = advanceSnakeGame(started);

    expect(advanced.score).toBe(1);
    expect(advanced.snake[0]).toEqual({ x: 6, y: 5 });
    expect(advanced.message).toContain('Nice catch');
  });
});