import hashlib
from datetime import datetime, timedelta, timezone
from jose import jwt
from app.core.config import settings

def hash_password(password: str) -> str:
    return hashlib.shake_128(password.encode('utf-8')).hexdigest(32)

def verify_password(password: str, password_hash_db: str) -> bool:
    password_test = hashlib.shake_128(password.encode('utf-8')).hexdigest(32)
    if  password_test == password_hash_db:
        return True 
    return False

def create_access_token(
    user_id: int,
    username: str,
    is_admin: bool
) -> str:

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": str(user_id),
        "username": username,
        "is_admin": is_admin,
        "exp": expire
    }

    token = jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )

    return token