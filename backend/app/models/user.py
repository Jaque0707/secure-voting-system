from sqlalchemy import Boolean,Column,Integer,String,Text

from sqlalchemy.orm import relationship

from app.database.base import Base


class User(Base):

    __tablename__ = "user"

    __table_args__ = {
        "schema": "election"
    }

    id_user = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    username = Column(
        String(30),
        nullable=False,
        unique=True
    )

    password_hash = Column(
        String(64),
        nullable=False
    )

    public_key = Column(
        Text,
        nullable=True,
        unique=True
    )

    is_admin = Column(
        Boolean,
        nullable=False
    )

    certificate = relationship(
        "Certificate",
        back_populates="user",
        uselist=False
    )

    elections = relationship(
        "UserElection",
        back_populates="user"
    )