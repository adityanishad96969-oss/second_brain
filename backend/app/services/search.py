from fastapi import APIRouter
from pydantic import BaseModel

from app.services.retriever import Retriever

router = APIRouter(
    prefix="/search",
    tags=["Semantic Search"]
)


class SearchRequest(BaseModel):
    query: str
    top_k: int = 5


@router.post("/")
async def search_documents(
    request: SearchRequest
):

    retriever = Retriever()

    results = retriever.search(
        request.query,
        request.top_k
    )

    return {
        "query": request.query,
        "results": results
    }