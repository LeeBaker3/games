export type SnakeDirection = 'up' | 'down' | 'left' | 'right';

export type SnakeLifecycleState = 'idle' | 'running' | 'paused' | 'complete';

export interface SnakePoint {
  readonly x: number;
  readonly y: number;
}

export interface SnakeGameState {
  readonly gridSize: number;
  readonly status: SnakeLifecycleState;
  readonly direction: SnakeDirection;
  readonly snake: readonly SnakePoint[];
  readonly food: SnakePoint;
  readonly score: number;
  readonly message: string;
  readonly speedLabel: string;
}

const GRID_SIZE = 11;
const INITIAL_SNAKE: readonly SnakePoint[] = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 },
];
const START_FOOD = { x: 8, y: 5 };

function isSamePoint(left: SnakePoint, right: SnakePoint): boolean {
  return left.x === right.x && left.y === right.y;
}

function isOppositeDirection(current: SnakeDirection, next: SnakeDirection): boolean {
  return (
    (current === 'up' && next === 'down') ||
    (current === 'down' && next === 'up') ||
    (current === 'left' && next === 'right') ||
    (current === 'right' && next === 'left')
  );
}

function createFood(snake: readonly SnakePoint[], score: number, gridSize: number): SnakePoint {
  const occupied = new Set(snake.map((segment) => `${segment.x}:${segment.y}`));
  const startIndex = (score + 1) % (gridSize * gridSize);

  for (let offset = 0; offset < gridSize * gridSize; offset += 1) {
    const index = (startIndex + offset) % (gridSize * gridSize);
    const x = index % gridSize;
    const y = Math.floor(index / gridSize);
    const key = `${x}:${y}`;

    if (!occupied.has(key)) {
      return { x, y };
    }
  }

  return { x: 0, y: 0 };
}

export function createSnakeGameState(): SnakeGameState {
  return {
    gridSize: GRID_SIZE,
    status: 'idle',
    direction: 'right',
    snake: INITIAL_SNAKE,
    food: START_FOOD,
    score: 0,
    message: 'Press Start to play Snake anonymously.',
    speedLabel: 'Normal',
  };
}

export function startSnakeGame(state: SnakeGameState): SnakeGameState {
  return {
    ...state,
    status: 'running',
    message: 'Snake is moving. Use the arrow keys to steer.',
  };
}

export function pauseSnakeGame(state: SnakeGameState): SnakeGameState {
  if (state.status !== 'running') {
    return state;
  }

  return {
    ...state,
    status: 'paused',
    message: 'Snake is paused. Press Resume or space to continue.',
  };
}

export function resumeSnakeGame(state: SnakeGameState): SnakeGameState {
  if (state.status === 'running') {
    return state;
  }

  return {
    ...state,
    status: 'running',
    message: 'Snake is moving. Use the arrow keys to steer.',
  };
}

export function restartSnakeGame(state: SnakeGameState): SnakeGameState {
  return {
    ...createSnakeGameState(),
    status: 'running',
    message: 'Snake restarted. Use the arrow keys to steer.',
  };
}

export function turnSnakeGame(state: SnakeGameState, direction: SnakeDirection): SnakeGameState {
  if (state.status === 'complete') {
    return state;
  }

  if (direction === state.direction || isOppositeDirection(state.direction, direction)) {
    return state;
  }

  return {
    ...state,
    direction,
    message: `Snake is now moving ${direction}.`,
  };
}

export function advanceSnakeGame(state: SnakeGameState): SnakeGameState {
  if (state.status !== 'running') {
    return state;
  }

  const head = state.snake[0];
  const nextHead =
    state.direction === 'up'
      ? { x: head.x, y: head.y - 1 }
      : state.direction === 'down'
        ? { x: head.x, y: head.y + 1 }
        : state.direction === 'left'
          ? { x: head.x - 1, y: head.y }
          : { x: head.x + 1, y: head.y };

  const hitsWall =
    nextHead.x < 0 || nextHead.y < 0 || nextHead.x >= state.gridSize || nextHead.y >= state.gridSize;
  const eatsFood = isSamePoint(nextHead, state.food);
  const bodyToCheck = eatsFood ? state.snake : state.snake.slice(0, -1);
  const hitsSnake = bodyToCheck.some((segment) => isSamePoint(segment, nextHead));

  if (hitsWall || hitsSnake) {
    return {
      ...state,
      status: 'complete',
      message: 'Snake hit the wall. Press Restart to play again.',
    };
  }

  const nextSnake = eatsFood
    ? [nextHead, ...state.snake]
    : [nextHead, ...state.snake.slice(0, -1)];
  const nextScore = eatsFood ? state.score + 1 : state.score;
  const nextFood = eatsFood ? createFood(nextSnake, nextScore, state.gridSize) : state.food;

  return {
    ...state,
    snake: nextSnake,
    food: nextFood,
    score: nextScore,
    message: eatsFood ? 'Nice catch. Keep going.' : 'Snake is moving. Use the arrow keys to steer.',
  };
}
