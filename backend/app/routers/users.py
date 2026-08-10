from fastapi import APIRouter, Depends

from app.dependencies.auth import get_current_user
from app.models.user import User


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id_user,
        "username": current_user.username,
        "is_admin": current_user.is_admin
    }