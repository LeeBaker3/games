import logging
from time import perf_counter

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, health, leaderboards, matches, users, websocket_matches
from app.core.settings import get_settings

settings = get_settings()

logging.basicConfig(
	level=getattr(logging, settings.log_level.upper(), logging.INFO),
	format="%(asctime)s %(levelname)s %(name)s %(message)s",
)
logger = logging.getLogger("fun_games.api")

app = FastAPI(title=settings.app_name, version=settings.app_version)

if settings.cors_origin_list:
	app.add_middleware(
		CORSMiddleware,
		allow_origins=settings.cors_origin_list,
		allow_credentials=True,
		allow_methods=["*"],
		allow_headers=["*"],
	)


@app.middleware("http")
async def log_requests(request: Request, call_next):
	started = perf_counter()
	response = await call_next(request)
	duration_ms = (perf_counter() - started) * 1000
	response.headers["X-Request-Duration-Ms"] = f"{duration_ms:.2f}"
	logger.info("%s %s %s %.2fms", request.method, request.url.path, response.status_code, duration_ms)
	return response

app.include_router(health.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")
app.include_router(leaderboards.router, prefix="/api/v1")
app.include_router(matches.router, prefix="/api/v1")
app.include_router(websocket_matches.router)
