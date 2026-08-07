from sqlalchemy import Column,DateTime,Integer,String,Text
from sqlalchemy.orm import relationship
from app.database.base import Base


class Election(Base):

    __tablename__ = "election"

    __table_args__ = {
        "schema": "election"
    }

    id_election = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    election_name = Column(
        String(60),
        nullable=False
    )

    start_date = Column(
        DateTime,
        nullable=False
    )

    end_date = Column(
        DateTime,
        nullable=False
    )

    public_key = Column(
        Text,
        nullable=False
    )

    users = relationship(
        "UserElection",
        back_populates="election"
    )

    options = relationship(
        "Option",
        back_populates="election"
    )