from turtle import title

from fastapi import APIRouter
from pydantic import BaseModel
from pathlib import Path
import json
from datetime import datetime

router = APIRouter(
    prefix="/notes",
    tags=["Notes"]
)

NOTES_FILE = Path("notes.json")


class Note(BaseModel):
    title: str
    content: str
    tag: str


@router.post("/")
async def create_note(note: Note):

    notes = []

    if NOTES_FILE.exists():
        with open(NOTES_FILE, "r") as f:
            notes = json.load(f)

    new_note = {
        "id": len(notes) + 1,
        "title": note.title,
        "content": note.content,
        "tag": note.tag,
        "date": datetime.now().strftime("%d %b %Y"),
        "pinned": False
    }
    notes.append(new_note)

    with open(NOTES_FILE, "w") as f:
        json.dump(notes, f, indent=4)

    return new_note
@router.get("/")
async def get_notes():

    if not NOTES_FILE.exists():
        return []

    with open(NOTES_FILE, "r") as f:
        return json.load(f)

@router.delete("/{title}")
async def delete_note(title: str):

    if not NOTES_FILE.exists():
        return {"success": False}

    with open(NOTES_FILE, "r") as f:
        notes = json.load(f)

    notes = [
        note for note in notes
        if note["title"] != title
    ]

    with open(NOTES_FILE, "w") as f:
        json.dump(notes, f, indent=4)

    return {
        "success": True
    }    
