from fastapi import APIRouter
from pydantic import BaseModel

from app.services.rag import RAGService
from app.services.activity_service import ActivityService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


class ChatRequest(BaseModel):
    question: str


@router.post("/")
async def chat(request: ChatRequest):

    rag = RAGService()

    result = rag.ask(
        request.question
    )
    ActivityService.log(
    "chat",
    f"Asked: {request.question}"
    )

    return result