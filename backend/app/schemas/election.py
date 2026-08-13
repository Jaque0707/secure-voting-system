from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ElectionCreate(BaseModel):
    election_name: str
    start_date: datetime
    end_date: datetime
    public_key: str


class ElectionResponse(BaseModel):
    id_election: int
    election_name: str
    start_date: datetime
    end_date: datetime
    public_key: str

    model_config = ConfigDict(from_attributes=True)