from app.database.connection import SessionLocal
from app.models.user import User


session = SessionLocal()


# Create user
user = User(
    username="juan",
    password_hash="123",
    is_admin=False
)

session.add(user)
session.commit()

print("User created:", user.username)


# Test
usuario_db = session.query(User).first()

print("User find:", usuario_db.username)


session.close()