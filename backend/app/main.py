from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import dashboard

app = FastAPI(title="FINEX API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3003",
        "https://finex.lifexos.co.in",
        "https://staax.lifexos.co.in",
        "https://lifexos.co.in",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router, prefix="/api/v1")


@app.get("/health")
async def health():
    return {"status": "ok", "service": "finex"}
