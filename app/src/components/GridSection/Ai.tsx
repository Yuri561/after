import React from "react";
import { Brain, Sparkles } from "lucide-react";

const Ai: React.FC = () => {
  const suggestions = [
    { label: "Optimize Duplicates", hint: "Scan system for redundant files" },
    { label: "Clean Temp Files", hint: "Free up unnecessary cache data" },
    { label: "Encrypt Vault", hint: "Secure sensitive documents" },
  ];

  return (
    <div className="col-span-1 sm:col-span-1 rounded-2xl border border-cyan-400/10 bg-gradient-to-br from-slate-900/60 via-cyan-900/10 to-slate-800/40 backdrop-blur-lg p-5 font-mono text-sm text-cyan-100/80 shadow-[0_0_25px_rgba(0,255,255,0.06)] transition-all duration-500 hover:shadow-[0_0_25px_rgba(0,255,255,0.25)]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="text-cyan-400" size={16} />
          <h3 className="text-cyan-400 text-sm tracking-wide font-semibold">
            AI Suggestions
          </h3>
        </div>
        <Sparkles className="text-cyan-300 animate-[pulse_2s_ease_in_out_infinite]" size={14} />
      </div>

      {/* Suggestions */}
      <div className="space-y-3">
        {suggestions.map((s, i) => (
          <button
            key={i}
            className="group relative w-full px-3 py-3 rounded-md border border-cyan-400/20 bg-cyan-400/5 hover:bg-cyan-400/15 hover:border-cyan-400/40 transition-all duration-500 flex justify-between items-center"
          >
            <span className="text-cyan-300 text-xs tracking-wide group-hover:text-cyan-200">
              {s.label}
            </span>
            <span className="text-[0.6rem] text-cyan-400/60 group-hover:text-cyan-300/80 transition-all">
              {s.hint}
            </span>
            {/* Glow overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-cyan-400/10 to-transparent blur-lg rounded-md pointer-events-none" />
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-cyan-400/10 mt-4 pt-2 flex justify-between text-[0.65rem] text-cyan-400/70">
        <span>Status: <span className="text-green-400 animate-pulse">Active</span></span>
        <span>Last Insight: Just now</span>
      </div>
    </div>
  );
};

export default Ai;
