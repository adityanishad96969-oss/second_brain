import os
from pathlib import Path
from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
from datetime import datetime

from app.services.file_service import save_file
from app.services.loader import DocumentLoader
from app.services.chunker import TextChunker
from app.services.embeddings import EmbeddingService
from app.db.chroma import ChromaService
from app.services.activity_service import ActivityService

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/")
async def upload_document(
    file: UploadFile = File(...)
):
    try:
        saved = save_file(file)

        text = DocumentLoader.load(
            saved["filepath"]
        )

        chunker = TextChunker()

        chunks = chunker.split(
            text,
            saved["filename"]
        )

        embedding_service = EmbeddingService()

        embedded_chunks = embedding_service.embed_chunks(
            chunks
        )

        db = ChromaService()

        db.add_chunks(
            embedded_chunks
        )
        ActivityService.log(
         "upload",
         f"Uploaded {saved['filename']}"
)
        return {
            "success": True,
            "file": saved,
            "characters": len(text),
            "chunks": len(chunks),
            "database_documents": db.count()
        }

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.get("/files")
async def list_files():
    upload_dir = Path("uploads")

    files = []

    if upload_dir.exists():
        for file in upload_dir.iterdir():
            if file.is_file():
                files.append({
                    "name": file.name,
                    "size": f"{round(file.stat().st_size / (1024 * 1024), 2)} MB",
                    "date": datetime.fromtimestamp(
                        file.stat().st_mtime
                    ).strftime("%d %b %Y")
                })

    return files
@router.delete("/{filename}")
async def delete_file(filename: str):

    file_path = Path("uploads") / filename

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    # Delete the physical file
    os.remove(file_path)

    # Delete embeddings from ChromaDB
    db = ChromaService()
    db.delete_document(filename)
    ActivityService.log(
    "delete",
    f"Deleted {filename}"
    ) 

    return {
        "success": True,
        "message": f"{filename} deleted successfully"
    }