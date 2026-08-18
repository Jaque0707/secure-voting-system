from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.user import User
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse
from app.services.auth import hash_password, verify_password, create_access_token
from app.crypto.user_keys import validate_public_key

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db)
):
    if not validate_public_key(data.public_key):
        raise HTTPException(
            status_code=400,
            detail="Invalid RSA public key"
        )

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

    existing_public_key = (
        db.query(User)
        .filter(User.public_key == data.public_key)
        .first()
    )

    if existing_public_key:
        raise HTTPException(
            status_code=400,
            detail="Public key already registered"
        )

    hashed_password = hash_password(data.password)

    user = User(
        username=data.username,
        password_hash=hashed_password,
        public_key=data.public_key,
        is_admin=False
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "id": user.id_user,
        "username": user.username,
        "message": "User registered successfully"
    }

@router.post("/login",response_model=TokenResponse)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):
    user = (
        db.query(User)
        .filter(User.username == data.username)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    if not verify_password(
        data.password,
        user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    access_token = create_access_token(
        user_id=user.id_user,
        username=user.username,
        is_admin=user.is_admin
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }