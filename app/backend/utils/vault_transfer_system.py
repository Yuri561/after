from .create_vault import create_vault
from .scanner import transfered_folder
from .transfer import transfer_to_vault

def vault_transfer_system(source_path: str, mode: str = "copy"):
    vault_info = create_vault()
    scan_result = transfered_folder(source_path)

    # mode="copy" or mode="move"
    report = transfer_to_vault(
        scan_result=scan_result,
        vault_info=vault_info,
        mode=mode,
        preserve_structure=False,  # set True if you want to keep folder tree
        dry_run=False
    )

    return {
        "vault": vault_info,
        "scan": scan_result,
        "transfer": report,
    }
