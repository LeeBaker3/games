export function openMatchSocket(matchId: string): WebSocket {
	return new WebSocket(`ws://${window.location.host}/ws/matches/${matchId}`);
}
