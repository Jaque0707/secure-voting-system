from sqlalchemy import Column,ForeignKey,Integer,String
from sqlalchemy.orm import relationship
from app.database.base import Base

class Option(Base):

    __tablename__ = "option"

    __table_args__ = {
        "schema": "ballotbox"
    }

    id_option = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    option_name = Column(
        String(30),
        nullable=False
    )

    vote_count = Column(
        Integer,
        nullable=False,
        default=0
    )

    id_election = Column(
        Integer,
        ForeignKey("election.election.id_election"),
        nullable=False
    )

    election = relationship(
        "Election",
        back_populates="options"
    )