from fastapi import APIRouter, Depends

from app.dependencies.auth import get_current_admin
from app.models.user import User


router = APIRouter(
    prefix="/elections",
    tags=["Elections"]
)


@router.post("/")
def create_election(
    current_admin: User = Depends(get_current_admin)
):
    return {
        "message": "Election created",
        "created_by": current_admin.username
    }