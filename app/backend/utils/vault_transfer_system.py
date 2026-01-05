from typing import Any, Dict, Literal, Optional

from utils.scanner import transfered_folder
from utils.vault import create_vault
from utils.transfer import transfer_to_vault

TransferMode = Literal["copy", "move"]


def vault_transfer_system(
    source_path: str,
    mode: TransferMode = "copy",
    preserve_structure: bool = False,
    dry_run: bool = False,
    items_limit: int = 25,
) -> Dict[str, Any]:
    if not source_path or not isinstance(source_path, str):
        raise ValueError("source_path is required and must be a string.")

    if mode not in ("copy", "move"):
        raise ValueError("mode must be 'copy' or 'move'.")

    # 1) scan source folder -> dict
    scan_result = transfered_folder(source_path)
    if not scan_result:
        raise FileNotFoundError(f"Source folder not found or not a directory: {source_path}")

    # 2) create/get vault -> dict
    vault_info = create_vault()

    # 3) transfer -> report dict
    report = transfer_to_vault(
        scan_result=scan_result,
        vault_info=vault_info,
        mode=mode,
        preserve_structure=preserve_structure,
        dry_run=dry_run,
    )

    # 4) trim items so you don’t send 5000 file entries to the frontend
    items = report.get("items", []) or []
    report["items_total"] = len(items)
    report["items_preview"] = items[: max(0, items_limit)]
    report["items"] = []  # keep response light

    # extra UI-friendly fields
    report["vault_root"] = str(vault_info.get("vault_root"))
    report["subfolder_paths"] = vault_info.get("subfolder_paths", {})
    return report
