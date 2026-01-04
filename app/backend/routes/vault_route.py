from fastapi import APIRouter
from utils.vault_transfer_system import vault_transfer_system

router = APIRouter()

@router.post("/api/vault")

def vault_transfer(source_path: str, mode: str = "copy"):
    return vault_transfer_system(source_path, mode)
