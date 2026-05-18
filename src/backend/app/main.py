from fastapi import FastAPI

from app.api.routes import auth, health, leaderboards, matches, users, websocket_matches

app = FastAPI(title="Fun Games API")
app.include_router(health.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")
app.include_router(leaderboards.router, prefix="/api/v1")
app.include_router(matches.router, prefix="/api/v1")
app.include_router(websocket_matches.router)
