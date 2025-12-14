import { readDir } from "@tauri-apps/plugin-fs";

export const getSystemFiles = async (path: string = "C:\\") => {
  try {
    const files = await readDir(path);
    return files;
  } catch (error) {
    console.error("Failed to read directory:", error);
    return [];
  }
};
