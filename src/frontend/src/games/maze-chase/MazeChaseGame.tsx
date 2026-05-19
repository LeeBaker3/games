import { useEffect, useState } from 'react';

type MazePoint = {
    x: number;
    y: number;
};

type MazeChaseStatus = 'idle' | 'running' | 'paused' | 'complete';

type MazeChaseState = {
    status: MazeChaseStatus;
    player: MazePoint;
    collectedBeacons: string[];
    steps: number;
    score: number;
    message: string;
};

const MAZE_LAYOUT = ['#######', '#.....#', '#.###.#', '#..B..#', '#.###.#', '#B..BE#', '#######'] as const;

const START: MazePoint = { x: 1, y: 1 };
const EXIT: MazePoint = { x: 5, y: 5 };

const BEACONS = [
    { key: 'amber-core', label: 'amber core', point: { x: 3, y: 3 } },
    { key: 'river-lantern', label: 'river lantern', point: { x: 1, y: 5 } },
    { key: 'sun-shard', label: 'sun shard', point: { x: 4, y: 5 } },
] as const;

const DIRECTIONS = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
} as const;

function createMazeChaseState(): MazeChaseState {
    return {
        status: 'idle',
        player: START,
        collectedBeacons: [],
        steps: 0,
        score: 0,
        message: 'Collect all three beacons and guide the explorer to the exit gate.',
    };
}

function isWall(point: MazePoint): boolean {
    return MAZE_LAYOUT[point.y]?.[point.x] === '#';
}

function isExit(point: MazePoint): boolean {
    return point.x === EXIT.x && point.y === EXIT.y;
}

function beaconAt(point: MazePoint) {
    return BEACONS.find((beacon) => beacon.point.x === point.x && beacon.point.y === point.y);
}

function remainingBeacons(state: MazeChaseState): number {
    return BEACONS.length - state.collectedBeacons.length;
}

function advanceMazeChaseGame(state: MazeChaseState, direction: keyof typeof DIRECTIONS): MazeChaseState {
    if (state.status === 'complete' || state.status === 'paused') {
        return state;
    }

    const delta = DIRECTIONS[direction];
    const nextPoint = { x: state.player.x + delta.x, y: state.player.y + delta.y };

    if (isWall(nextPoint)) {
        return {
            ...state,
            status: state.status === 'idle' ? 'running' : state.status,
            message: 'A stone wall blocks the path.',
        };
    }

    const collectedBeacons = [...state.collectedBeacons];
    let score = state.score + 5;
    let message = 'Keep moving through the maze.';

    const beacon = beaconAt(nextPoint);
    if (beacon && !collectedBeacons.includes(beacon.key)) {
        collectedBeacons.push(beacon.key);
        score += 100;
        message = `Collected the ${beacon.label}. ${BEACONS.length - collectedBeacons.length} beacon(s) remain.`;
    }

    const allBeaconsCollected = collectedBeacons.length === BEACONS.length;
    let status: MazeChaseStatus = 'running';

    if (isExit(nextPoint) && allBeaconsCollected) {
        status = 'complete';
        score += 250;
        message = 'Maze cleared. The explorer escaped with every beacon.';
    } else if (isExit(nextPoint)) {
        message = 'The exit gate is locked until every beacon is collected.';
    }

    return {
        ...state,
        status,
        player: nextPoint,
        collectedBeacons,
        steps: state.steps + 1,
        score,
        message,
    };
}

function pauseMazeChaseGame(state: MazeChaseState): MazeChaseState {
    if (state.status === 'complete') {
        return state;
    }

    return { ...state, status: 'paused', message: 'The explorer is waiting in the maze shadows.' };
}

function resumeMazeChaseGame(state: MazeChaseState): MazeChaseState {
    if (state.status === 'complete') {
        return state;
    }

    return { ...state, status: 'running', message: 'The explorer is moving again.' };
}

function restartMazeChaseGame(): MazeChaseState {
    return createMazeChaseState();
}

function cellClassName(state: MazeChaseState, point: MazePoint): string {
    const classes = ['maze-chase-cell'];

    if (isWall(point)) {
        classes.push('maze-chase-cell--wall');
    } else {
        classes.push('maze-chase-cell--path');
    }

    if (isExit(point)) {
        classes.push('maze-chase-cell--exit');
    }

    const beacon = beaconAt(point);
    if (beacon && !state.collectedBeacons.includes(beacon.key)) {
        classes.push('maze-chase-cell--beacon');
    }

    if (state.player.x === point.x && state.player.y === point.y) {
        classes.push('maze-chase-cell--player');
    }

    if (state.status === 'complete' && isExit(point)) {
        classes.push('maze-chase-cell--complete');
    }

    if (point.x === START.x && point.y === START.y) {
        classes.push('maze-chase-cell--start');
    }

    return classes.join(' ');
}

export function MazeChaseGame() {
    const [state, setState] = useState<MazeChaseState>(() => createMazeChaseState());

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.key === 'ArrowUp' ||
                event.key === 'ArrowDown' ||
                event.key === 'ArrowLeft' ||
                event.key === 'ArrowRight'
            ) {
                event.preventDefault();
                setState((currentState) =>
                    advanceMazeChaseGame(currentState, event.key as keyof typeof DIRECTIONS),
                );
            }

            if (event.key === ' ') {
                event.preventDefault();
                setState((currentState) =>
                    currentState.status === 'paused'
                        ? resumeMazeChaseGame(currentState)
                        : pauseMazeChaseGame(currentState),
                );
            }

            if (event.key.toLowerCase() === 'r') {
                event.preventDefault();
                setState(() => restartMazeChaseGame());
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const statusText =
        state.status === 'complete'
            ? state.message
            : `${state.message} ${remainingBeacons(state)} beacon(s) remain.`;

    return (
        <section className="maze-chase-panel" aria-labelledby="maze-chase-title">
            <div className="section-heading">
                <p className="eyebrow">Anonymous play</p>
                <h2 id="maze-chase-title">Maze Chase</h2>
            </div>

            <p className="maze-chase-summary">
                Collect all three beacons and guide the explorer to the exit gate. No sign-in is required.
            </p>

            <div className="maze-chase-layout">
                <div className="maze-chase-board" role="grid" aria-label="Maze Chase playfield">
                    {MAZE_LAYOUT.map((row, y) => (
                        <div className="maze-chase-row" role="row" key={row}>
                            {Array.from(row).map((cell, x) => {
                                const point = { x, y };
                                const isPlayer = state.player.x === x && state.player.y === y;
                                const isBeacon = Boolean(beaconAt(point)) && !state.collectedBeacons.includes(`${beaconAt(point)?.key}`);

                                return (
                                    <div
                                        key={`${x}-${y}`}
                                        aria-label={`Cell ${x + 1}, ${y + 1}`}
                                        className={cellClassName(state, point)}
                                        role="gridcell"
                                    >
                                        {isPlayer ? '▲' : null}
                                        {!isPlayer && isBeacon ? '•' : null}
                                        {!isPlayer && !isBeacon && isExit(point) ? '⇢' : null}
                                        {!isPlayer && !isBeacon && !isExit(point) && cell === '#' ? ' ' : null}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className="maze-chase-sidebar">
                    <p className="maze-chase-status" aria-live="polite">
                        {statusText}
                    </p>

                    <dl className="maze-chase-stats">
                        <div>
                            <dt>Status</dt>
                            <dd>{state.status}</dd>
                        </div>
                        <div>
                            <dt>Score</dt>
                            <dd>{state.score}</dd>
                        </div>
                        <div>
                            <dt>Steps</dt>
                            <dd>{state.steps}</dd>
                        </div>
                    </dl>

                    <div className="maze-chase-actions">
                        <button type="button" onClick={() => setState((currentState) => resumeMazeChaseGame(currentState))}>
                            Start
                        </button>
                        <button type="button" onClick={() => setState((currentState) => pauseMazeChaseGame(currentState))}>
                            Pause
                        </button>
                        <button type="button" onClick={() => setState((currentState) => resumeMazeChaseGame(currentState))}>
                            Resume
                        </button>
                        <button type="button" onClick={() => setState(() => restartMazeChaseGame())}>
                            Restart
                        </button>
                    </div>

                    <div className="maze-chase-controls" aria-label="Maze Chase controls">
                        <button type="button" onClick={() => setState((currentState) => advanceMazeChaseGame(currentState, 'ArrowUp'))}>
                            Up
                        </button>
                        <button type="button" onClick={() => setState((currentState) => advanceMazeChaseGame(currentState, 'ArrowLeft'))}>
                            Left
                        </button>
                        <button type="button" onClick={() => setState((currentState) => advanceMazeChaseGame(currentState, 'ArrowRight'))}>
                            Right
                        </button>
                        <button type="button" onClick={() => setState((currentState) => advanceMazeChaseGame(currentState, 'ArrowDown'))}>
                            Down
                        </button>
                    </div>

                    <p className="maze-chase-help">Use the arrow keys or the on-screen controls. Space pauses or resumes. R restarts the run.</p>
                </div>
            </div>
        </section>
    );
}
