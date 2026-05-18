import { useEffect, useMemo, useState } from 'react';

import {
    advanceSnakeGame,
    createSnakeGameState,
    pauseSnakeGame,
    restartSnakeGame,
    resumeSnakeGame,
    turnSnakeGame,
    type SnakeDirection,
    type SnakeGameState,
} from './snake-engine';
import { useAuth } from '../../hooks/useAuth';
import { submitScore } from '../../services/leaderboardClient';

const controls: Array<{ label: string; direction: SnakeDirection }> = [
    { label: 'Up', direction: 'up' },
    { label: 'Left', direction: 'left' },
    { label: 'Right', direction: 'right' },
    { label: 'Down', direction: 'down' },
];

function cellClassName(state: SnakeGameState, x: number, y: number): string {
    const isHead = state.snake[0]?.x === x && state.snake[0]?.y === y;
    const isSnake = state.snake.some((segment) => segment.x === x && segment.y === y);
    const isFood = state.food.x === x && state.food.y === y;

    return [
        'snake-cell',
        isHead ? 'snake-cell--head' : '',
        !isHead && isSnake ? 'snake-cell--body' : '',
        isFood ? 'snake-cell--food' : '',
    ]
        .filter(Boolean)
        .join(' ');
}

export function SnakeGame() {
    const [state, setState] = useState<SnakeGameState>(() => createSnakeGameState());
    const { user } = useAuth();
    const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);

    useEffect(() => {
        if (state.status !== 'running') {
            return undefined;
        }

        const timer = window.setInterval(() => {
            setState((currentState) => advanceSnakeGame(currentState));
        }, 300);

        return () => window.clearInterval(timer);
    }, [state.status]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                setState((currentState) => turnSnakeGame(currentState, 'up'));
            }

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setState((currentState) => turnSnakeGame(currentState, 'down'));
            }

            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                setState((currentState) => turnSnakeGame(currentState, 'left'));
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                setState((currentState) => turnSnakeGame(currentState, 'right'));
            }

            if (event.key === ' ') {
                event.preventDefault();
                setState((currentState) =>
                    currentState.status === 'running' ? pauseSnakeGame(currentState) : resumeSnakeGame(currentState),
                );
            }

            if (event.key.toLowerCase() === 'r') {
                event.preventDefault();
                setState((currentState) => restartSnakeGame(currentState));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const statusText = useMemo(() => {
        if (state.status === 'complete') {
            return state.message;
        }

        if (state.status === 'running') {
            return state.message;
        }

        return state.message;
    }, [state.message, state.status]);

    const handleSubmitScore = async () => {
        try {
            setSubmissionMessage(null);
            const response = await submitScore('snake', {
                score: state.score,
                metadata: { status: state.status },
            });
            setSubmissionMessage(
                response.moderationStatus === 'flagged'
                    ? `Score submitted and flagged for review at rank ${response.rank}.`
                    : `Score submitted at rank ${response.rank}.`,
            );
        } catch (submissionError) {
            setSubmissionMessage(
                submissionError instanceof Error ? submissionError.message : 'Unable to submit score.',
            );
        }
    };

    return (
        <section className="snake-panel" id="snake-game" aria-labelledby="snake-title">
            <div className="section-heading">
                <p className="eyebrow">Anonymous play</p>
                <h2 id="snake-title">Snake</h2>
            </div>

            <div className="snake-layout">
                <div className="snake-board" role="grid" aria-label="Snake playfield">
                    {Array.from({ length: state.gridSize }, (_, y) => (
                        <div className="snake-row" role="row" key={y}>
                            {Array.from({ length: state.gridSize }, (_, x) => (
                                <div
                                    aria-label={`Cell ${x + 1}, ${y + 1}`}
                                    className={cellClassName(state, x, y)}
                                    key={`${x}-${y}`}
                                    role="gridcell"
                                />
                            ))}
                        </div>
                    ))}
                </div>

                <div className="snake-sidebar">
                    <p className="snake-status" aria-live="polite">
                        {statusText}
                    </p>

                    <dl className="snake-stats">
                        <div>
                            <dt>Score</dt>
                            <dd>{state.score}</dd>
                        </div>
                        <div>
                            <dt>Speed</dt>
                            <dd>{state.speedLabel}</dd>
                        </div>
                    </dl>

                    <div className="snake-actions">
                        <button type="button" onClick={() => setState((currentState) => resumeSnakeGame(currentState))}>
                            Start
                        </button>
                        <button type="button" onClick={() => setState((currentState) => pauseSnakeGame(currentState))}>
                            Pause
                        </button>
                        <button type="button" onClick={() => setState((currentState) => resumeSnakeGame(currentState))}>
                            Resume
                        </button>
                        <button type="button" onClick={() => setState((currentState) => restartSnakeGame(currentState))}>
                            Restart
                        </button>
                    </div>

                    <div className="snake-controls" aria-label="Direction controls">
                        {controls.map((control) => (
                            <button
                                key={control.label}
                                type="button"
                                onClick={() => setState((currentState) => turnSnakeGame(currentState, control.direction))}
                            >
                                {control.label}
                            </button>
                        ))}
                    </div>

                    <p className="snake-help">
                        Use the arrow keys to steer, space to pause or resume, and R to restart.
                    </p>

                    <div className="snake-score-actions">
                        <button
                            type="button"
                            onClick={handleSubmitScore}
                            disabled={state.status !== 'complete' || !user}
                        >
                            Submit score
                        </button>
                        <p className="snake-score-note">
                            {user
                                ? state.status === 'complete'
                                    ? 'Submit your completed run to the Snake leaderboard.'
                                    : 'Finish a run before submitting a score.'
                                : 'Sign in to submit scores to the leaderboard.'}
                        </p>
                    </div>

                    {submissionMessage ? (
                        <p className="snake-status snake-status--success" aria-live="polite">
                            {submissionMessage}
                        </p>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
