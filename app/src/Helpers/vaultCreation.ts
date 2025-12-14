// we are going to create the function that checks if document folder exists
// if not we are going to create it
// if it does exist we will create the vault folder inside it
import { exists, mkdir, BaseDirectory } from "@tauri-apps/plugin-fs";


export const createVaultFolder = async () => {
  try {
    const base = "ArkVault";
    const categories = ["Images", "Videos", "Audio", "Documents", "Other"];
    // Create ArkVault base folder
    const vaultExists = await exists(base, {
      baseDir: BaseDirectory.Document,
    });
    if (!vaultExists) {
      await mkdir(base, {
        recursive: true,
        baseDir: BaseDirectory.Document,
      });
      console.log("ArkVault base folder created.");
    }
    // Create category folders
    for (const category of categories) {
      const categoryPath = `${base}/${category}`;

      const categoryExists = await exists(categoryPath, {
        baseDir: BaseDirectory.Document,
      });
      if (!categoryExists) {
        await mkdir(categoryPath, {
          recursive: true,
          baseDir: BaseDirectory.Document,
        });
        console.log(`Created folder: ${categoryPath}`);
      }
    }
  } catch (error) {
    console.error("Error creating vault structure:", error);
  }
};
