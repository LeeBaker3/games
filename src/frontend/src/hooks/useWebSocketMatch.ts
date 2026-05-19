import { useEffect, useState } from 'react';

import { openMatchSocket } from '../services/websocketClient';
import type { MatchConnectionState, MatchSummary } from '../types/match';

export function useWebSocketMatch(matchId: string | null) {
    const [state, setState] = useState<MatchConnectionState>({
        connected: false,
        message: 'Not connected',
        match: null,
    });

    useEffect(() => {
        if (!matchId) {
            setState({ connected: false, message: 'No match selected', match: null });
            return undefined;
        }

        const socket = openMatchSocket(matchId);
        socket.addEventListener('open', () => {
            setState((currentState) => ({ ...currentState, connected: true, message: 'Connected' }));
        });
        socket.addEventListener('message', (event) => {
            const payload = JSON.parse(event.data) as { type?: string; match?: MatchSummary; message?: string };
            if (payload.type === 'join-ack' && payload.match) {
                setState({ connected: true, message: 'Connected to match', match: payload.match });
            }
            if (payload.type === 'error' && payload.message) {
                setState((currentState) => ({
                    ...currentState,
                    message: payload.message ?? currentState.message,
                }));
            }
        });
        socket.addEventListener('close', () => {
            setState((currentState) => ({ ...currentState, connected: false, message: 'Disconnected' }));
        });

        return () => socket.close();
    }, [matchId]);

    return state;
}
