import React from "react"
import { ActivitySquare, Clock } from "lucide-react"

const Activity: React.FC = () => {
  return (
    <section className="w-full h-full flex flex-col p-6 font-mono text-cyan-100/80 bg-gradient-to-br from-slate-900/80 via-cyan-900/10 to-slate-800/60 backdrop-blur-xl border border-cyan-400/10 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.05)]">
      <div className="flex justify-between items-center border-b border-cyan-400/10 pb-3 mb-4">
        <h2 className="text-cyan-400 tracking-widest text-sm uppercase flex items-center gap-2">
          <ActivitySquare size={16} /> Recent Activity
        </h2>
        <Clock size={14} className="text-cyan-400/60" />
      </div>

      <div className="flex-1 flex flex-col justify-start space-y-3 text-xs text-cyan-300/80 overflow-y-auto">
        {["File moved to /Vaults/Docs", "Backup completed", "Vault optimized", "Sync with Cloud Node successful"].map(
          (log, index) => (
            <div
              key={index}
              className="border-b border-cyan-400/10 pb-2 hover:text-cyan-200 transition-all"
            >
              ▸ {log}
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Activity
