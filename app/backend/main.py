#FastAPI entry point 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import system
import os

port = os.getenv("APP_PORT")
host = os.getenv("APP_HOST")
app = FastAPI()

cors_option = [
    "http://localhost:1420",
    "http://localhost:5173"
]

app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_option,
        allow_credentials=True, 
        allow_methods=["*"],     
        allow_headers=["*"],     
    )
#system load route
app.include_router(system.router)

@app.get("/")
async def root():
    return {"message": "Fast API is online"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=str(host), port=int(port), reload=True)
