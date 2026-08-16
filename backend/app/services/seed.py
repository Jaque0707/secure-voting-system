from sqlalchemy.orm import Session

from app.models.user import User
from app.services.auth import hash_password

from app.core.config import settings


def create_initial_admin(db: Session):
    existing_admin = (
        db.query(User)
        .filter(User.is_admin == True)
        .first()
    )

    if existing_admin:
        return

    admin = User(
        username=settings.INITIAL_ADMIN_USERNAME,
        password_hash=hash_password(
            settings.INITIAL_ADMIN_PASSWORD
        ),
        is_admin=True
    )

    db.add(admin)
    db.commit()