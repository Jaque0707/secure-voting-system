from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.user import User
from app.schemas.auth import RegisterRequest
from app.services.auth import hash_password


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.username == data.username)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    hashed_password = hash_password(data.password)

    user = User(
        username=data.username,
        password_hash=hashed_password,
        is_admin=False
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "id": user.id_user,
        "username": user.username
    }