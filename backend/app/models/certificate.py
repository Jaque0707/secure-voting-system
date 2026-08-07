from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    Text
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
        nullable=False
    )

    user = relationship(
        "User",
        back_populates="certificate"
    )