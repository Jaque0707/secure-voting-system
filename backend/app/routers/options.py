from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.dependencies.auth import get_current_user, get_current_admin
from app.models.user import User
from app.models.election import Election
from app.models.option import Option
from app.schemas.option import OptionCreate, OptionResponse


router = APIRouter(
    prefix="/elections",
    tags=["Options"]
)


@router.post("/{id_election}/options")
def create_option(
    id_election: int,
    data: OptionCreate,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    election = (
        db.query(Election)
        .filter(Election.id_election == id_election)
        .first()
    )

    if not election:
        raise HTTPException(
            status_code=404,
            detail="Election not found"
        )

    option = Option(
        option_name=data.option_name,
        vote_count=0,
        id_election=id_election
    )

    db.add(option)
    db.commit()
    db.refresh(option)

    return {
        "id_option": option.id_option,
        "option_name": option.option_name,
        "vote_count": option.vote_count
    }


@router.get("/{id_election}/options")
def get_options(
    id_election: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    election = (
        db.query(Election)
        .filter(Election.id_election == id_election)
        .first()
    )

    if not election:
        raise HTTPException(
            status_code=404,
            detail="Election not found"
        )

    options = (
        db.query(Option)
        .filter(Option.id_election == id_election)
        .all()
    )

    return options