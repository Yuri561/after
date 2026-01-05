from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Literal, Optional, Any, Dict

from utils.vault_transfer_system import vault_transfer_system

router = APIRouter(prefix="/api/vault", tags=["vault"])

TransferMode = Literal["copy", "move"]


class VaultTransferRequest(BaseModel):
    source_path: str = Field(..., description="Folder path to scan + transfer into the vault")
    mode: TransferMode = "copy"
    preserve_structure: bool = False
    dry_run: bool = False
    items_limit: int = Field(25, ge=0, le=500, description="How many transferred items to return in response")


@router.post("")
def vault_transfer(payload: VaultTransferRequest) -> Dict[str, Any]:
    try:
        return vault_transfer_system(
            source_path=payload.source_path,
            mode=payload.mode,
            preserve_structure=payload.preserve_structure,
            dry_run=payload.dry_run,
            items_limit=payload.items_limit,
        )
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # simple catch-all for unexpected errors
        raise HTTPException(status_code=500, detail=f"Vault transfer failed: {e}")
