import type { GameLifecycleState } from '../games/shared/lifecycle';

export function useGameLifecycle(): GameLifecycleState {
  return 'idle';
}
