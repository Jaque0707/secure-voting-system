from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database.connection import SessionLocal
from app.services.seed import create_initial_admin

from app.routers import auth
from app.routers import users
from app.routers import elections
from app.routers import options

@asynccontextmanager
async def lifespan(app: FastAPI):

    db = SessionLocal()

    try:
        create_initial_admin(db)
        yield
    finally:
        db.close()

app = FastAPI(
    title="Secure Voting System",
    version="1.0.0",
    lifespan=lifespan
)

@app.get("/")
def root():
    return {"message": "Backend running"}

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(elections.router)
app.include_router(options.router)