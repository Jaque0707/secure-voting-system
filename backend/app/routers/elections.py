from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.dependencies.auth import get_current_user, get_current_admin

from app.models.user import User
from app.models.election import Election

from app.schemas.election import ElectionCreate, ElectionResponse


router = APIRouter(
    prefix="/elections",
    tags=["Elections"]
)


@router.post("/", response_model=ElectionResponse)
def create_election(
    data: ElectionCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    if data.start_date >= data.end_date:
        raise HTTPException(
            status_code=400,
            detail="Start date must be before end date"
        )

    election = Election(
        election_name=data.election_name,
        start_date=data.start_date,
        end_date=data.end_date,
        public_key=data.public_key
    )

    db.add(election)
    db.commit()
    db.refresh(election)

    return election

@router.get("/", response_model=list[ElectionResponse])
def get_elections(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    elections = db.query(Election).all()

    return elections

# to specific election
@router.get("/{election_id}", response_model=ElectionResponse)
def get_election(
    election_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    election = (
        db.query(Election)
        .filter(Election.id_election == election_id)
        .first()
    )

    if not election:
        raise HTTPException(
            status_code=404,
            detail="Election not found"
        )

    return election

# modify election, only admin
@router.put("/{election_id}", response_model=ElectionResponse)
def update_election(
    election_id: int,
    data: ElectionCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    election = (
        db.query(Election)
        .filter(Election.id_election == election_id)
        .first()
    )

    if not election:
        raise HTTPException(
            status_code=404,
            detail="Election not found"
        )

    if data.start_date >= data.end_date:
        raise HTTPException(
            status_code=400,
            detail="Start date must be before end date"
        )

    election.election_name = data.election_name
    election.start_date = data.start_date
    election.end_date = data.end_date
    election.public_key = data.public_key

    db.commit()
    db.refresh(election)

    return election

@router.delete("/{election_id}")
def delete_election(
    election_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    election = (
        db.query(Election)
        .filter(Election.id_election == election_id)
        .first()
    )

    if not election:
        raise HTTPException(
            status_code=404,
            detail="Election not found"
        )

    db.delete(election)
    db.commit()

    return {
        "message": "Election deleted"
    }