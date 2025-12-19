import React from "react";
import { Globe2, RefreshCcw, Radio, Wifi, Crosshair } from "lucide-react";

const Map: React.FC = () => {
  return (
    <section
      className="
        w-full h-full p-6 font-mono text-cyan-100/80
        bg-gradient-to-br from-slate-900/80 via-cyan-900/10 to-slate-800/60
        backdrop-blur-xl rounded-2xl border border-cyan-400/10
        shadow-[0_0_25px_rgba(0,255,255,0.05)]
        flex flex-col
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-cyan-400/10 pb-3 mb-4">
        <h2 className="text-cyan-400 tracking-widest text-sm uppercase flex items-center gap-2">
          <Globe2 size={16} /> Global System Map
        </h2>

        <button
          className="px-3 py-1 rounded-md border border-cyan-400/20 bg-cyan-400/10 hover:bg-cyan-400/20 transition-all text-xs flex items-center gap-1"
        >
          <RefreshCcw size={12} /> Refresh
        </button>
      </div>

      {/* Map Container */}
      <div
        className="
          relative flex-1 flex flex-col items-center justify-center select-none
          bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2000px-World_map_-_low_resolution.svg.png')]
          bg-contain bg-center bg-no-repeat opacity-20
        "
      >
        {/* Hologram overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,255,255,0.06)_1px,_transparent_1px)] bg-[size:22px_22px]" />

        {/* Rotating Compass */}
        <div className="absolute top-6 right-6 animate-spin-slow opacity-50">
          <Crosshair size={32} className="text-cyan-400/50" />
        </div>

        {/* Nodes */}
        {/* Vault Node */}
        <div className="absolute top-1/3 left-1/4 flex flex-col items-center gap-1 animate-pulse">
          <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(0,255,255,0.7)]" />
          <p className="text-[0.6rem] text-cyan-300/80">Vault Node</p>
        </div>

        {/* Local System */}
        <div className="absolute bottom-1/4 left-1/2 flex flex-col items-center gap-1 animate-pulse delay-100">
          <span className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_12px_rgba(0,255,150,0.7)]" />
          <p className="text-[0.6rem] text-green-300/80">Local System</p>
        </div>

        {/* Cloud Relay */}
        <div className="absolute top-1/4 right-1/3 flex flex-col items-center gap-1 animate-pulse delay-200">
          <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(255,255,100,0.7)]" />
          <p className="text-[0.6rem] text-yellow-200/80">Cloud Relay</p>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line
            x1="25%"
            y1="35%"
            x2="50%"
            y2="75%"
            stroke="rgba(0,255,255,0.4)"
            strokeWidth="1.5"
            className="animate-pulse"
          />
          <line
            x1="25%"
            y1="35%"
            x2="70%"
            y2="30%"
            stroke="rgba(255,255,150,0.4)"
            strokeWidth="1.5"
            className="animate-pulse"
          />
        </svg>

        {/* Status Indicators */}
        <div className="absolute bottom-6 flex items-center gap-6 text-xs text-cyan-300/60">
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-green-400" /> Stable Connection
          </div>
          <div className="flex items-center gap-2">
            <Wifi size={14} className="text-yellow-300" /> Sync Active
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
