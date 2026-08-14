import json
from pathlib import Path

SETTINGS_FILE = Path("settings.json")

DEFAULT_SETTINGS = {
    "model": "Gemini 2.5 Flash",
    "top_k": 5,
    "temperature": 0.3,
    "style": "Balanced",
    "chunk_size": 500,
    "chunk_overlap": 100,
}


class SettingsService:

    @staticmethod
    def load():
        if SETTINGS_FILE.exists():
            with open(SETTINGS_FILE, "r") as f:
                return json.load(f)

        return DEFAULT_SETTINGS