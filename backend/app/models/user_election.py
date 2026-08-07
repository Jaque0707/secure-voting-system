from sqlalchemy import Boolean,Column,ForeignKey,Integer
from sqlalchemy.orm import relationship
from app.database.base import Base

class UserElection(Base):

    __tablename__ = "user_election"

    __table_args__ = {
        "schema": "election"
    }

    id_user = Column(
        Integer,
        ForeignKey("election.user.id_user"),
        primary_key=True
    )

    id_election = Column(
        Integer,
        ForeignKey("election.election.id_election"),
        primary_key=True
    )

    has_voted = Column(
        Boolean,
        nullable=False
    )

    user = relationship(
        "User",
        back_populates="elections"
    )

    election = relationship(
        "Election",
        back_populates="users"
    )