from fastapi import FastAPI

from app.routers import auth
from app.routers import users

app = FastAPI(
    title="Secure Voting System",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "Backend running"}

app.include_router(auth.router)
app.include_router(users.router)