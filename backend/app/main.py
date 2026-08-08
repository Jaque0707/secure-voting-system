from fastapi import FastAPI

from app.routers import auth

app = FastAPI(
    title="Secure Voting System",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "Backend running"}

app.include_router(auth.router)