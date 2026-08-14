from fastapi import APIRouter
from pydantic import BaseModel
from pathlib import Path
import json
from pydantic import BaseModel

router = APIRouter(
    prefix="/settings",
    tags=["Settings"]
)

SETTINGS_FILE = Path("settings.json")


class SettingsData(BaseModel):
    model: str
    top_k: int
    temperature: float
    style: str

    chunk_size: int
    chunk_overlap: int


DEFAULT_SETTINGS = {
    "model":"nvidia/nemotron-3-ultra-550b-a55b",
    "top_k": 5,
    "temperature": 1.0,
    "style": "Balanced",

    "chunk_size": 500,
    "chunk_overlap": 100,
}


@router.get("/")
async def get_settings():

    if not SETTINGS_FILE.exists():
        return DEFAULT_SETTINGS

    with open(SETTINGS_FILE, "r") as f:
        return json.load(f)


@router.put("/")
async def save_settings(settings: SettingsData):

    with open(SETTINGS_FILE, "w") as f:
        json.dump(settings.dict(), f, indent=4)
    return settings