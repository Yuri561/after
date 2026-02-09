from fastapi import APIRouter, HTTPException, status
from models.user_model import User
from schemas.user_schema import UserCreate
from connections.mongo_connect import user_collection
import bcrypt

router = APIRouter()

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(payload: UserCreate):

    # check if user exists
    if User.find_by_email(payload.email, user_collection):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists"
        )

    # hash password 
    encoded_pw = payload.password.encode("utf-8")
    hashed_pw = bcrypt.hashpw(encoded_pw, bcrypt.gensalt())


    user = User(
        email=payload.email.lower(),
        name=payload.name,
        password=hashed_pw
    )

    user.save_to_db(user_collection)

    return {
        "message": "User registered successfully",
        "email": payload.email
    }
