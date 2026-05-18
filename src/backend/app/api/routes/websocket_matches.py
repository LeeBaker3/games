"""WebSocket routes for private invite matches."""

from __future__ import annotations

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.services import match_service

router = APIRouter()


@router.websocket("/ws/matches/{match_id}")
async def websocket_match(websocket: WebSocket, match_id: str) -> None:
	await websocket.accept()
	try:
		match = match_service.get_match_by_id(match_id)
		await websocket.send_json({"type": "join-ack", "match": match.model_dump(by_alias=True)})
		while True:
			payload = await websocket.receive_json()
			message_type = payload.get("type")
			if message_type == "heartbeat":
				await websocket.send_json({"type": "heartbeat", "status": "ok"})
			elif message_type == "state-snapshot":
				await websocket.send_json({"type": "state-snapshot", "match": match.model_dump(by_alias=True)})
			else:
				await websocket.send_json({"type": "error", "message": "Unsupported message type"})
	except WebSocketDisconnect:
		return
