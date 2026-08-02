from fastapi import FastAPI

app = FastAPI(
    title="Secure Voting System",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "Backend running"}