from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    Text,
    DateTime,
    String
)

from sqlalchemy.orm import relationship

from app.database.base import Base


class Certificate(Base):

    __tablename__ = "certificate"

    __table_args__ = {
        "schema": "certificateauthority"
    }

    id_certificate = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    certificate_pem = Column(
        Text,
        nullable=False
    )

    id_user = Column(
        Integer,
        ForeignKey("election.user.id_user"),
        nullable=False,
        unique=True
    )

    public_key = Column(
        Text,
        nullable=False
    )

    issued_at = Column(
        DateTime,
        nullable=False
    )

    expires_at = Column(
        DateTime, 
        nullable=False
    )

    status = Column(
        String(20),
        nullable=False,
        default="active"
    )

    user = relationship(
        "User",
        back_populates="certificate"
    )