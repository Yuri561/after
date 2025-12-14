import { readDir } from "@tauri-apps/plugin-fs";

export const scanFolder = async (
  folderPath: string
): Promise<{ name: string; path: string }[]> => {
  try {
    const files = await readDir(folderPath);
    const files_obj_lst: { name: string; path: string }[] = [];

    // loop through each file
    for (const file of files) {
      if (file.isDirectory) {
        // 
        const subFiles = await scanFolder(`${folderPath}/${file.name}`);
        files_obj_lst.push(...subFiles);
        
      } else {
        // 
        files_obj_lst.push({
          name: file.name,
          path: `${folderPath}/${file.name}`,
        });
      }
    }

    console.log("Scanned files:", files_obj_lst);
    return files_obj_lst;
  } catch (error) {
    console.error("error scanning folder:", error);
    return []; //  returns an array
  }
};
