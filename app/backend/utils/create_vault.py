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
    subfolders = ["images", "documents", "videos", "audios", "others"]
    for folder in subfolders:
        os.makedirs(vault_root / folder, exist_ok=True)
    #we also want to return the fullpath of the subfolders 
    subfolder_paths = {folder: str(vault_root / folder) for folder in subfolders}
    return {"vault_root": vault_root, 
            "subfolders": subfolders,
            "subfolder_paths": subfolder_paths}

if __name__ == "__main__":
    vault_path = create_vault()
    print(f"Vault created at: {vault_path['vault_root']}")
    print(f"Subfolders: {vault_path['subfolders']}")
    print(f"Subfolder paths: {vault_path['subfolder_paths']}")
