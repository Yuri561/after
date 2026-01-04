import React, { useState, useEffect } from "react";
import { UploadCloud, FileCheck, AlertTriangle } from "lucide-react";
import { listen } from "@tauri-apps/api/event";
import { open } from "@tauri-apps/plugin-dialog";

interface DropZoneProps {
  onFilesQueued?: (paths: string[]) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFilesQueued }) => {
  const [uploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(false);

  const chooseFolder = async () => {
    try {
      const result = await open({
        title: "Select a folder",
        directory: true,
        multiple: false,
      });

      if (!result) return;

      const path = Array.isArray(result) ? result[0] : result;
      onFilesQueued?.([path]);

      setUploaded(true);
      setTimeout(() => setUploaded(false), 3000);
    } catch (err) {
      console.error("Dialog error:", err);
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  useEffect(() => {
    const unlistenPromise = listen("tauri://file-drop", (event) => {
      const paths = event.payload as string[];
      if (!paths?.length) return;

      onFilesQueued?.(paths);

      setUploaded(true);
      setTimeout(() => setUploaded(false), 3000);
    });

    return () => {
      unlistenPromise.then((unlisten) => unlisten());
    };
  }, [onFilesQueued]);

  return (
    <div
      className={`col-span-1 row-span-1 rounded-2xl border transition-all duration-500
      bg-gradient-to-br from-slate-900/60 via-cyan-900/10 to-slate-800/40 backdrop-blur-lg
      p-3 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(0,255,255,0.05)]
      border-cyan-400/10 hover:border-cyan-400/30 hover:shadow-[0_0_25px_rgba(0,255,255,0.2)]`}
    >
      <h2 className="text-cyan-400 text-2xl font-light tracking-widest mb-3 select-none">
        Drop Zone
      </h2>

      <div className="relative w-40 h-40 flex items-center justify-center">
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
          {uploaded ? (
            <>
              <FileCheck className="text-green-400 mb-2" size={28} />
              <span className="text-green-400 text-xs">Queued</span>
            </>
          ) : error ? (
            <>
              <AlertTriangle className="text-red-400 mb-2" size={28} />
              <span className="text-red-400 text-xs">Error</span>
            </>
          ) : (
            <>
              <UploadCloud className="text-cyan-400/80 mb-2" size={30} />
              <span className="text-xs font-mono text-cyan-400/70">
                CLICK TO SELECT
              </span>
            </>
          )}
        </div>
      </div>

      <p className="mt-4 text-[0.65rem] text-cyan-400/60 font-mono tracking-widest uppercase">
        Folders only (paths)
      </p>
    </div>
  );
};

export default DropZone;
