from fastapi import FastAPI

app = FastAPI(title="Certificate Authority")


@app.get("/health")
def health():
    return {
        "status": "Certificate Authority running"
    }