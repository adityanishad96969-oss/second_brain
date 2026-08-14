from fastapi import APIRouter
from app.services.activity_service import ActivityService

router = APIRouter(
    prefix="/activity",
    tags=["Activity"]
)


@router.get("/")
async def get_activity():
    return ActivityService.get()