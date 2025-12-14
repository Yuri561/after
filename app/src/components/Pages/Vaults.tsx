import React, { useEffect, useState } from "react";
import {
  Folder,
  File,
  Image as ImageIcon,
  Video as VideoIcon,
  Music,
  FileText,
  HardDrive,
  ArrowLeft
} from "lucide-react";

import { readDir, BaseDirectory } from "@tauri-apps/plugin-fs";
import { listen } from "@tauri-apps/api/event";

const VAULT_ROOT = "ArkVault";

const categories = [
  { name: "Images", icon: <ImageIcon size={16} />, folder: "Images"},
  { name: "Videos", icon: <VideoIcon size={16} />, folder: "Videos"},
  { name: "Audio", icon: <Music size={16}/>, folder: "Audio"},
  { name: "Documents", icon: <FileText size={16}/>, folder: "Documents"},
  { name: "Other", icon: <HardDrive size={16} />, folder: "Other"},
];

const Vaults: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(VAULT_ROOT);
  const [history, setHistory] = useState<string[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load folder contents
  const loadDirectory = async (path: string) => {
    try {
      setLoading(true);

      const entries = await readDir(path, {
        baseDir: BaseDirectory.Document,
      });

      const cleaned = entries.filter(
        (entry) => !entry.name.startsWith(".") && entry.name !== "desktop.ini"
      );

      setItems(cleaned);
      setCurrentPath(path);
    } catch (err) {
      console.error("Error loading vault directory:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadDirectory(VAULT_ROOT);
  }, []);

  // Listen for "vault_updated" from TransferQueue
  useEffect(() => {
    let unlistenFn: (() => void) | null = null;

    (async () => {
      const unlisten = await listen("vault_updated", () => {
        loadDirectory(currentPath);
      });
      unlistenFn = unlisten;
    })();

    return () => {
      if (unlistenFn) unlistenFn();
    };
  }, [currentPath]);

  // Open subfolder
  const openFolder = (folderName: string) => {
    setHistory((prev) => [...prev, currentPath]);
    const newPath = `${currentPath}/${folderName}`;
    loadDirectory(newPath);
  };

  // Go back
  const goBack = () => {
    if (history.length === 0) return;

    const prev = history[history.length - 1];
    setHistory((prevHistory) => prevHistory.slice(0, -1));
    loadDirectory(prev);
  };

  return (
    <div className="w-full h-full flex flex-col p-6 font-mono text-cyan-100/80 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.05)]">

      {/* Header */}
      <div className="flex justify-between items-center border-b border-cyan-400/10 pb-3 mb-4">
        <h2 className="text-cyan-400 tracking-widest text-sm uppercase">
          ArkVault Explorer
        </h2>
      </div>

      <div className="flex-1 grid grid-cols-5 gap-4 overflow-hidden">

        {/* Sidebar */}
        <aside className="col-span-1 bg-white/5 border border-cyan-400/10 rounded-xl p-3 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-cyan-400/70 mb-2">
            <HardDrive size={16} />
            <span className="text-xs uppercase tracking-wide">Vault Categories</span>
          </div>

          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                setHistory((prev) => [...prev, currentPath]);
                loadDirectory(`${VAULT_ROOT}/${cat.folder}`);
              }}
              className="w-full flex items-center gap-2  cursor-pointer text-left text-xs px-2 py-1 rounded-md text-cyan-300/80 hover:bg-cyan-400/10 transition"
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <section className="col-span-4 bg-black/20 border border-cyan-400/10 rounded-xl p-4 overflow-y-auto">

          {/* Navigation */}
          <div className="flex items-center justify-between text-cyan-400/70 text-xs mb-4">
            <div className="flex items-center gap-2">
              {history.length > 0 && (
                <button
                  onClick={goBack}
                  className="flex items-center gap-1 px-2 py-1 text-cyan-300 cursor-pointer border border-cyan-400/20 rounded hover:bg-cyan-400/10 transition-all"
                >
                  <ArrowLeft size={12} /> Back
                </button>
              )}
              <span className="truncate max-w-xs">{currentPath}</span>
            </div>
          </div>

          {/* File Grid */}
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-10 gap-3">

            {loading && (
              <div className="col-span-full text-center text-cyan-400/50 text-xs py-8">
                Loading...
              </div>
            )}

            {!loading && items.length === 0 && (
              <div className="col-span-full text-center text-cyan-400/50 text-xs py-8">
                Empty folder
              </div>
            )}

            {!loading &&
              items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => item.isDir && openFolder(item.name)}
                  className="group flex flex-col items-center p-3 rounded-xl border border-transparent hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all cursor-pointer"
                >
                  {item.isDir ? (
                    <Folder
                      size={28}
                      className="text-cyan-400/70 group-hover:text-cyan-300 mb-2"
                    />
                  ) : (
                    <File
                      size={26}
                      className="text-cyan-400/50 group-hover:text-cyan-200 mb-2"
                    />
                  )}

                  <span className="text-[0.7rem] text-center truncate w-24 text-cyan-300/80 group-hover:text-cyan-100">
                    {item.name}
                  </span>
                </div>
              ))}
          </div>

        </section>
      </div>
    </div>
  );
};

export default Vaults;
