from fastapi import APIRouter
from pathlib import Path
from datetime import datetime

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
async def dashboard():

    upload_dir = Path("uploads")

    documents = []
    total_size = 0

    if upload_dir.exists():
        for file in upload_dir.iterdir():
            if file.is_file():

                size = file.stat().st_size
                total_size += size

                documents.append({
                    "title": file.name,
                    "size": round(size / (1024 * 1024), 2),
                    "date": datetime.fromtimestamp(
                        file.stat().st_mtime
                    ).strftime("%d %b %Y")
                })

    documents.sort(
        key=lambda x: x["date"],
        reverse=True
    )

    return {
        "documents": len(documents),
        "storage": round(total_size / (1024 * 1024), 2),
        "recent_documents": documents[:5]
    }