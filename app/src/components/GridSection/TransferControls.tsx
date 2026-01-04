import React from "react";
import {
  SlidersHorizontal,
  Copy,
  ArrowRightLeft,
  FolderTree,
  FileWarning,
  FileType2,
  ShieldCheck,
} from "lucide-react";

const TransferControls: React.FC = () => {
  return (
    <section className="w-full h-[460px] flex flex-col p-3 font-mono text-cyan-100/80 bg-gradient-to-br from-slate-900/80 via-cyan-900/10 to-slate-800/60 backdrop-blur-xl border border-cyan-400/10 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.05)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-400/10 pb-3 mb-4">
        <h2 className="text-cyan-400 tracking-widest text-sm uppercase flex items-center gap-2">
          <SlidersHorizontal size={16} /> Transfer Controls
        </h2>
        <span className="text-[0.7rem] text-cyan-400/60">UI only</span>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 gap-4 flex-1">
        {/* Transfer Mode */}
        <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-cyan-200">
              <ArrowRightLeft size={16} className="text-cyan-300/80" />
              <span className="text-xs tracking-widest uppercase">Mode</span>
            </div>
            <span className="text-[0.65rem] text-cyan-400/60">Copy is safest</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="rounded-lg border border-cyan-400/20 bg-cyan-400/15 hover:bg-cyan-400/25 transition px-3 py-2 text-xs text-cyan-200 flex items-center justify-center gap-2">
              <Copy size={14} /> Copy
            </button>
            <button className="rounded-lg border border-red-400/20 bg-red-400/5 hover:bg-red-400/10 transition px-3 py-2 text-xs text-red-200 flex items-center justify-center gap-2">
              <FileWarning size={14} /> Move
            </button>
          </div>
        </div>

        {/* Folder Structure + Duplicates */}
        <div className="grid grid-cols-2 gap-3">
          {/* Preserve Structure */}
          <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-4">
            <div className="flex items-center gap-2 text-cyan-200 mb-3">
              <FolderTree size={14} className="text-cyan-300/80" />
              <span className="text-xs tracking-widest uppercase">Structure</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[0.65rem] text-cyan-100/70">Preserve folders</span>
              <div className="flex items-center gap-2">
                <span className="text-[0.65rem] text-cyan-400/60">OFF</span>
                <div className="w-10 h-5 rounded-full bg-cyan-400/10 border border-cyan-400/20 relative">
                  <div className="w-4 h-4 rounded-full bg-cyan-400/40 absolute top-0.5 left-0.5" />
                </div>
                <span className="text-[0.65rem] text-cyan-400/60">ON</span>
              </div>
            </div>

            <p className="mt-3 text-[0.65rem] text-cyan-400/60 leading-relaxed">
              OFF = categorize into Images/Documents/etc.
              <br />
              ON = keep original tree.
            </p>
          </div>

          {/* Duplicate Policy */}
          <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-2">
            <div className="flex items-center gap-2 text-cyan-200 mb-3">
              <ShieldCheck size={16} className="text-cyan-300/80" />
              <span className="text-xs tracking-widest uppercase">Duplicates</span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center">
              <button className="rounded-lg border border-cyan-400/20 bg-cyan-400/15 hover:bg-cyan-400/25 transition px-2 py-2 text-[0.5rem] text-cyan-200">
                Rename
              </button>
              <button className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 hover:bg-cyan-400/15 transition px-2 py-2 text-[0.5rem] text-cyan-200/80">
                Skip
              </button>
              <button className="rounded-lg border border-red-400/20 bg-red-400/5 hover:bg-red-400/10 transition px-2 py-2 text-[0.5rem] text-red-200/80">
                Overwrite
              </button>
            </div>

            <p className="mt-3 text-[0.65rem] text-cyan-400/60 leading-relaxed">
              Rename is recommended to avoid accidental data loss.
            </p>
          </div>
        </div>

        {/* File Type Filters */}
        <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-cyan-200">
              <FileType2 size={14} className="text-cyan-300/80" />
              <span className="text-xs tracking-widest uppercase">File Filters</span>
            </div>
            <span className="text-[0.5rem] text-cyan-400/60">Allow selected</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Images", "Documents", "Videos", "Audios", "Archives", "Others"].map((label) => (
              <button
                key={label}
                className="px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 hover:bg-cyan-400/20 transition text-[0.7rem] text-cyan-200/80"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransferControls;
