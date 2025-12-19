import React, { useRef, useState, useEffect } from "react";
import { UploadCloud, FileCheck, AlertTriangle } from "lucide-react";
import { listen } from "@tauri-apps/api/event";

interface DropZoneProps {
  onFilesQueued?: (files: (File | string)[]) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFilesQueued }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(false);


  const folderInput = useRef<HTMLInputElement>(null);

  const chooseFolder = () => {
    folderInput.current?.click();
  };

  // User selects a folder
  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    onFilesQueued?.(fileArray);
    setUploaded(true);
    setTimeout(() => setUploaded(false), 3000);

    // Allow same folder reselect
    e.target.value = "";
  };

  // Listen for drag/drop events from Tauri
  useEffect(() => {
    const unlisten = listen("tauri://file-drop", (event) => {
      const paths = event.payload as string[];
      if (!paths || paths.length === 0) return;

      onFilesQueued?.(paths);

      setUploaded(true);
      setTimeout(() => setUploaded(false), 3000);
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return (
    <div
      className={`col-span-3 md:col-span-2 sm:col-span-2 row-span-2 rounded-2xl border transition-all duration-500
      bg-gradient-to-br from-slate-900/60 via-cyan-900/10 to-slate-800/40 backdrop-blur-lg
      p-6 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(0,255,255,0.05)]
      ${
        isDragging
          ? "border-cyan-400/60 shadow-[0_0_25px_rgba(0,255,255,0.4)] scale-[1.02]"
          : "border-cyan-400/10 hover:border-cyan-400/30 hover:shadow-[0_0_25px_rgba(0,255,255,0.2)]"
      }`}
    >
      {/* Hidden folder picker */}
      <input
        type="file"
        ref={folderInput}
        {...({ webkitdirectory: "true" } as any)}
        directory=""
        multiple
        className="hidden"
        onChange={handleFolderSelect}
      />

      <h2 className="text-cyan-400 text-4xl font-light tracking-widest mb-6 select-none">
        Drop Zone
      </h2>

      <div className="relative w-52 h-52 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-[2px] border-cyan-400/20 animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border-[2px] border-cyan-400/40 animate-[spin_12s_linear_reverse_infinite]" />

        <div
          onClick={chooseFolder}
          className={`relative z-10 w-full h-full rounded-full border-2 flex flex-col items-center justify-center transition-all duration-500 cursor-pointer
          ${
            uploading
              ? "bg-cyan-400/15 border-cyan-400/40 animate-pulse"
              : uploaded
              ? "bg-green-400/20 border-green-400 shadow-[0_0_20px_rgba(0,255,100,0.4)]"
              : error
              ? "bg-red-400/20 border-red-400 shadow-[0_0_20px_rgba(255,100,100,0.4)]"
              : "bg-cyan-400/5 border-cyan-400/20"
          }`}
        >
          {uploading ? (
            <>
              <UploadCloud className="text-cyan-300 animate-bounce mb-2" size={32} />
              <span className="text-sm text-cyan-300 animate-pulse">Uploading...</span>
            </>
          ) : uploaded ? (
            <>
              <FileCheck className="text-green-400 mb-2" size={32} />
              <span className="text-green-400 text-sm">Upload Complete!</span>
            </>
          ) : error ? (
            <>
              <AlertTriangle className="text-red-400 mb-2" size={32} />
              <span className="text-red-400 text-sm">Upload Failed</span>
            </>
          ) : (
            <>
              <UploadCloud className="text-cyan-400/80 mb-2" size={34} />
              <span className="text-sm font-mono text-cyan-400/70">DROP FOLDERS</span>
            </>
          )}
        </div>
      </div>

      <p className="mt-6 text-[0.7rem] text-cyan-400/60 font-mono tracking-widest uppercase">
        Supported: PDF, ZIP, Folders
      </p>
    </div>
  );
};

export default DropZone;
