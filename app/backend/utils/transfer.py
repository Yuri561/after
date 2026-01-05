import os
import shutil
from pathlib import Path
from typing import Dict, List, Literal, Any
from utils.scanner import transfered_folder
from utils.vault import create_vault as vault

TransferMode = Literal["copy", "move"]

def _ensure_dir(path: str) -> None:
    os.makedirs(path, exist_ok=True)

def _unique_destination(dest_dir: str, filename: str) -> str:
    base, ext = os.path.splitext(filename)
    candidate = os.path.join(dest_dir, filename)

    if not os.path.exists(candidate):
        return candidate

    i = 1
    while True:
        new_name = f"{base} ({i}){ext}"
        candidate = os.path.join(dest_dir, new_name)
        if not os.path.exists(candidate):
            return candidate
        i += 1

def _transfer_one(src: str, dest: str, mode: TransferMode) -> None:
    if mode == "copy":
        shutil.copy2(src, dest)
    else:
        shutil.move(src, dest)

def transfer_to_vault(
    scan_result: Dict[str, Any],
    vault_info: Dict[str, Any],
    mode: TransferMode = "copy",
    preserve_structure: bool = False,
    dry_run: bool = False,
) -> Dict[str, Any]:

    vault_root = str(vault_info["vault_root"])
    subfolder_paths = vault_info["subfolder_paths"]

    source_root = scan_result.get("source_path")
    source_root_norm = os.path.normpath(source_root) if source_root else None

    categories = ["images", "documents", "videos", "audios", "others"]

    report = {
        "mode": mode,
        "dry_run": dry_run,
        "preserve_structure": preserve_structure,
        "source_path": source_root,
        "vault_root": vault_root,
        "totals": {c: 0 for c in categories},
        "moved": 0,
        "copied": 0,
        "skipped": 0,
        "errors": [],
        "items": [],
    }

    if not dry_run:
        _ensure_dir(vault_root)
        for c in categories:
            _ensure_dir(subfolder_paths[c])

    for category in categories:
        files: List[str] = scan_result.get(category, []) or []
        dest_base = subfolder_paths[category]
        report["totals"][category] = len(files)

        for src in files:
            try:
                if not os.path.exists(src):
                    report["skipped"] += 1
                    report["errors"].append({"file": src, "reason": "Source not found"})
                    continue

                dest_dir = dest_base

                if preserve_structure and source_root_norm:
                    src_norm = os.path.normpath(src)
                    try:
                        rel = os.path.relpath(src_norm, source_root_norm)
                        rel_dir = os.path.dirname(rel)
                        if rel_dir:
                            dest_dir = os.path.join(dest_base, rel_dir)
                    except ValueError:
                        dest_dir = dest_base

                filename = os.path.basename(src)
                final_dest = _unique_destination(dest_dir, filename)

                if not dry_run:
                    _ensure_dir(os.path.dirname(final_dest))
                    _transfer_one(src, final_dest, mode)

                action = "copied" if mode == "copy" else "moved"
                report[action] += 1
                report["items"].append(
                    {"src": src, "dest": final_dest, "category": category, "action": action}
                )

            except PermissionError as e:
                report["errors"].append({"file": src, "reason": f"PermissionError: {e}"})
            except OSError as e:
                report["errors"].append({"file": src, "reason": f"OSError: {e}"})
            except Exception as e:
                report["errors"].append({"file": src, "reason": f"Error: {e}"})

    report["success"] = len(report["errors"]) == 0
    report["total_files"] = sum(report["totals"].values())

    print("\n================= VAULT TARGET =================")
    print("VAULT ROOT:", report["vault_root"])
    for c in categories:
        print(f" - {c}: {subfolder_paths[c]}")
    print("===============================================\n")

    print("================= TRANSFER SUMMARY =================")
    print(f"SOURCE: {report['source_path']}")
    print(f"MODE: {report['mode']} | DRY_RUN: {report['dry_run']} | PRESERVE_STRUCTURE: {report['preserve_structure']}")
    print(f"TOTAL FILES: {report['total_files']}")
    print(f"COPIED: {report['copied']} | MOVED: {report['moved']} | SKIPPED: {report['skipped']}")
    print(f"ERRORS: {len(report['errors'])}")

    if report["items"]:
        print("\nFIRST 10 TRANSFERS:")
        for item in report["items"][:10]:
            print(f" [{item['category']}] {item['action'].upper()}")
            print(f"   SRC : {item['src']}")
            print(f"   DEST: {item['dest']}")

    if report["errors"]:
        print("\nFIRST 5 ERRORS:")
        for err in report["errors"][:5]:
            print(" -", err)

    print("====================================================\n")

    return report


if __name__ == "__main__":
    source_path = "C:/Users/hoube/OneDrive/Desktop/testing"

    # 1) scan (build scan_result dict)
    scan_result = transfered_folder(source_path)

    # 2) create/get vault (build vault_info dict)
    vault_info = vault()

    # 3) test first with dry run (no changes)
    print("\n DRY RUN FIRST (no files copied yet)...")
    transfer_to_vault(scan_result, vault_info, mode="copy", dry_run=True)

    # 4) real run
    print("\n REAL RUN (files will copy now)...")
    report = transfer_to_vault(scan_result, vault_info, mode="copy", dry_run=False)

    print("DONE. success =", report["success"])
