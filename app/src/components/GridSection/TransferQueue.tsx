import React, { useEffect, useState, type JSX } from "react";
import { Upload } from "lucide-react";
import Checkbox from "@mui/material/Checkbox";


import { emit } from "@tauri-apps/api/event";
interface TransferItem {
  name: string;
  progress: number;
  icon?: JSX.Element;
  path: string;
}

interface TransferQueueProps {
  transfers: TransferItem[];
  setTransfers: React.Dispatch<React.SetStateAction<TransferItem[]>>;
}

const TransferQueue: React.FC<TransferQueueProps> = ({
  transfers,
  setTransfers,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [sending, setSending] = useState<Record<string, boolean>>({});




  useEffect(() => {

    const emitFunc = async () => {
      await emit("vault_updated");
    }
    if (transfers.length === 0) return;

    const interval = setInterval(() => {
      setTransfers((prev) =>
        prev.map((t) =>
          t.progress < 100
            ? { ...t, progress: Math.min(t.progress + Math.random() * 8, 100) }
            : t
        )
      );
    }, 2000);

    return () => clearInterval(interval);
    emitFunc()
  }, [transfers.length, setTransfers]);

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const clicked = event.target.value;

    setSelectedFiles((prev) =>
      prev.includes(clicked)
        ? prev.filter((f) => f !== clicked)
        : [...prev, clicked]
    );
  };
  const API_BASE = "http://127.0.0.1:8000"; // change port to your env port

  const handleSendToVault = async (path: string) => {
    if (!path) return;

    try {
      setSending((prev) => ({ ...prev, [path]: true }));

      const res = await fetch(`${API_BASE}/transfer/api/vault`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_path: path,
          mode: "copy",
          preserve_structure: false,
          dry_run: false,
          items_limit: 25,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.detail || `Request failed: ${res.status}`);
      }

      const data = await res.json();
      console.log("✅ Vault transfer success:", data);

      // optional: remove from queue after success
      setTransfers((prev) => prev.filter((f) => f.path !== path));

      // tell the app vault changed
      await emit("vault_updated");
    } catch (e) {
      console.error("❌ Vault transfer failed:", e);
    } finally {
      setSending((prev) => ({ ...prev, [path]: false }));
    }
  };
  const handleRemoveFolder = (path: string) => {
    if (!path || !selectedFiles.includes(path)) return;

    setTransfers((prev) => prev.filter((f) => f.path !== path));
    console.log(`Removing ${path} from queue...`);
  };

  return (
    <div className="ccol-span-1 sm:col-span-1 rounded-2xl border border-cyan-400/10 bg-gradient-to-br from-slate-900/60 via-cyan-900/10 to-slate-800/40 backdrop-blur-lg p-5 font-mono text-sm text-cyan-100/80 shadow-[0_0_25px_rgba(0,255,255,0.06)] transition-all duration-500 hover:shadow-[0_0_25px_rgba(0,255,255,0.15)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-cyan-400 text-sm tracking-wide font-semibold flex items-center gap-2">
          <Upload className="text-cyan-400" size={10} />
          Transfer Queue
        </h3>

        <button
          onClick={() => selectedFiles.forEach((p) => handleRemoveFolder(p))}
          className="bg-red-600 px-2 py-1 rounded-md cursor-pointer border border-red-400/50 text-red-200 hover:bg-red-600/30 transition"
        >
          Remove Folder
        </button>
      </div>

      {transfers.length === 0 && (
        <div className="flex flex-col items-center gap-2 opacity-70 justify-center py-5 text-cyan-400/50 text-xs font-mono">
          <Upload size={12} className="text-cyan-400" />
          <span>No files in queue yet</span>
        </div>
      )}

      <div className="space-y-4">
        {transfers.map((t, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-lg border border-cyan-400/10 p-3 transition-all duration-500 ${t.progress === 100
                ? "bg-gradient-to-r from-emerald-500/10 to-green-400/5"
                : "bg-gradient-to-r from-cyan-400/5 to-transparent hover:from-cyan-400/10"
              }`}
          >
            <div className="flex justify-between items-center mb-1 sm:text-[0.50rem] lg:text-[0.70rem]">
              <div className="flex items-center sm:p-2 gap-2 text-cyan-200/90">
                <Checkbox
                  value={t.path}
                  checked={selectedFiles.includes(t.path)}
                  onChange={handleSelect}
                />

                <span className="text-cyan-300">{t.icon}</span>
                <span className="truncate max-w-[10rem]">{t.name}</span>
              </div>

              <span
                className={`font-semibold ${t.progress === 100 ? "text-green-400" : "text-cyan-300"
                  }`}
              >
                {t.progress === 100 ? (
                  <button
                    disabled={!!sending[t.path]}
                    onClick={() => handleSendToVault(t.path)}
                    className="bg-cyan-400/20 px-3 py-1 rounded-md cursor-pointer border border-cyan-400/50 text-cyan-200 hover:bg-cyan-400/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending[t.path] ? "⏳ Sending..." : "✅ Send To Vault"}
                  </button>
                ) : (
                  <span>{Math.floor(t.progress)}%</span>
                )}
              </span>
            </div>

            <div className="h-1.5 bg-cyan-400/10 rounded overflow-hidden">
              <div
                className={`h-full rounded transition-all duration-700 ease-out ${t.progress === 100
                    ? "bg-green-400"
                    : "bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-300 animate-[pulse_2s_ease_in_out_infinite]"
                  }`}
                style={{ width: `${t.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-cyan-400/10 mt-4 pt-2 flex justify-between text-[0.7rem] text-cyan-400/60">
        <span>
          Completed: {transfers.filter((t) => t.progress === 100).length}/
          {transfers.length}
        </span>
        <span>
          Active Tasks: {transfers.filter((t) => t.progress < 100).length}
        </span>
      </div>
    </div>
  );
};

export default TransferQueue;
