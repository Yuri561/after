from fastapi import APIRouter
from utils.system_info import get_system


router = APIRouter()

@router.get("/system/load")
def system_load():
    return get_system()
