from fastapi import FastAPI

from app.api.routes import health

app = FastAPI(title="Fun Games API")
app.include_router(health.router, prefix="/api/v1")
