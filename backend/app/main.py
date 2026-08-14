from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings

from app.api.upload import router as upload_router
from app.services.search import router as search_router
from app.api.chat import router as chat_router
from app.api.dashboard import router as dashboard_router
from app.api.activity import router as activity_router
from app.api.notes import router as notes_router
from app.routes.settings import router as settings_router


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.API_VERSION,
)


allowed_origins = [
    url.strip()
    for url in settings.FRONTEND_URLS.split(",")
    if url.strip()
]

print("CORS allowed origins:", allowed_origins)


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(search_router)
app.include_router(chat_router)
app.include_router(dashboard_router)
app.include_router(activity_router)
app.include_router(notes_router)
app.include_router(settings_router)
app.include_router(upload_router)


@app.get("/")
def home():
    return {"message": "Second Brain API"}


@app.get("/health")
def health():
    return {"status": "healthy"}