# FastAPI entry point
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.system import router as system_router
from routes.vault_route import router as vault_route
import os

app = FastAPI()

cors_option = ["http://localhost:1420", "http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_option,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# your system route already uses prefix="/api" here
app.include_router(system_router, prefix="/api")

# vault router already has /api/vault 
app.include_router(vault_route, prefix="/transfer")

@app.get("/")
async def root():
    return {"message": "Fast API is online"}

if __name__ == "__main__":
    import uvicorn

    host = os.getenv("APP_HOST", "127.0.0.1")
    port = int(os.getenv("APP_PORT", "8000"))

    uvicorn.run("main:app", host=host, port=port, reload=True)
