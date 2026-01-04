import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { Eye, FolderOpen, Activity } from "lucide-react";

const WatcherMode: React.FC = () => {
  const [active, setActive] = useState(false);
  const label = { inputProps: { "aria-label": "Watcher Mode" } };

  const handleToggle = () => setActive((prev) => !prev);

  return (
    <div
      className={`col-span-1 sm:col-span-1 rounded-2xl border transition-all duration-500 
      bg-gradient-to-br from-slate-900/60 via-cyan-900/10 to-slate-800/40 backdrop-blur-lg p-5 font-mono text-sm shadow-[0_0_25px_rgba(0,255,255,0.06)]
      ${
        active
          ? "border-cyan-400/40 shadow-[0_0_25px_rgba(0,255,255,0.25)] animate-[pulse_6s_ease_in_out_infinite]"
          : "border-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Eye
            size={16}
            className={`transition-colors ${
              active ? "text-cyan-400" : "text-cyan-400/60"
            }`}
          />
          <h3 className="text-cyan-400 text-sm tracking-wide font-semibold">
            Watcher Mode
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <span className={`${active ? "text-cyan-300/40" : "text-cyan-300"}`}>
            OFF
          </span>
          <Switch {...label} checked={active} onChange={handleToggle} />
          <span className={`${active ? "text-cyan-300" : "text-cyan-300/40"}`}>
            ON
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="border-t border-cyan-400/10 pt-3">
        <div className="flex items-center gap-2 mb-2">
          <FolderOpen size={14} className="text-cyan-400" />
          <h3 className="text-xs text-cyan-400/90">Folder: ~/Downloads</h3>
        </div>

        <h3
          className={`text-xs mb-2 transition-all ${
            active
              ? "text-green-400 flex items-center gap-1"
              : "text-cyan-400 flex items-center gap-1"
          }`}
        >
          <Activity
            size={12}
            className={active ? "animate-spin-slow text-green-400" : "text-cyan-400/60"}
          />
          Status: {active ? "Watching..." : "Idle"}
        </h3>

        <h4 className="text-cyan-400/80 text-xs mt-1 mb-3">
          {active
            ? "Monitoring folder for file changes..."
            : "Select a folder to enable Watcher Mode."}
        </h4>

        <button
          className={`w-full px-3 py-2 rounded-md border transition-all text-xs tracking-widest uppercase ${
            active
              ? "bg-cyan-400/20 border-cyan-400/40 hover:bg-cyan-400/30"
              : "bg-cyan-400/10 border-cyan-400/20 hover:bg-cyan-400/20"
          }`}
        >
          Choose Folder
        </button>
      </div>

      {/* Recent Events */}
      <div className="mt-5 border-t border-cyan-400/10 pt-3">
        <h4 className="text-cyan-400 text-xs mb-2 tracking-wide">Recent Events</h4>
        <div className="space-y-1 text-[0.7rem] text-cyan-300/80">
          {active ? (
            <>
              <p className="flex items-center gap-1">
                <span className="text-cyan-400/70">→</span> Moved photo_23.png → /Vaults/Images
              </p>
              <p className="flex items-center gap-1">
                <span className="text-cyan-400/70">→</span> Moved notes.docx → /Vaults/Docs
              </p>
              <p className="flex items-center gap-1">
                <span className="text-cyan-400/70">→</span> Moved clip.mp4 → /Vaults/Videos
              </p>
            </>
          ) : (
            <p className="text-cyan-300/50">No recent actions.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 border-t border-cyan-400/10 pt-2 text-[0.65rem] text-cyan-400/60 flex justify-between items-center">
        <span>
          Last action:{" "}
          <span className="text-cyan-300">
            {active ? "Just now" : "—"}
          </span>
        </span>
        {active && (
          <span className="text-green-400/80 animate-pulse text-[0.6rem] uppercase">
            Live
          </span>
        )}
      </div>
    </div>
  );
};

export default WatcherMode;
