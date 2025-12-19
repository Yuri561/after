import os
from pathlib import Path


def get_desktop_folder():
    one_drive_desktop = Path.home() / "OneDrive" / "Desktop"
    if one_drive_desktop.exists():
        return one_drive_desktop
    return Path.home() / "Desktop"

def create_vault():
    vault_root = get_desktop_folder() / "A.F.T.E.R"
    os.makedirs(vault_root, exist_ok=True)
    subfolders = ["Images", "Documents", "Videos", "Audios", "Others"]
    for folder in subfolders:
        os.makedirs(vault_root / folder, exist_ok=True)

    return str(vault_root)

if __name__ == "__main__":
    vault_path = create_vault()
    print(f"Vault created at: {vault_path}")
