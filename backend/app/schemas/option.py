from pydantic import BaseModel, Field

class OptionCreate(BaseModel):
    option_name: str = Field(min_length=1, max_length=30)

class OptionResponse(BaseModel):
    id_option: int
    option_name: str
    vote_count: int

    class Config:
        from_attributes = True