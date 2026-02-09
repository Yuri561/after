from fastapi import APIRouter, HTTPException, status
from models.user_model import User
from connections.mongo_connect import user_collection
from schemas.user_schema import UserLogin


router = APIRouter()

@router.post("/login", status_code=status.HTTP_200_OK)
def login_user(payload: UserLogin):
    if not User.find_by_email(payload.email, user_collection):
        raise HTTPException(
            status_code=400,
            detail="unable to retrieve user"
        )
        if payload.password != user_collection["password"]:
            raise HTTPException(
                status_code=400,
                detail="password does not match"
            )
    return {
        "message": "login successful",
        "email": payload.email
    }