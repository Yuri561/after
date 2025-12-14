import React from "react"
import { FileText, Terminal } from "lucide-react"

const Logs: React.FC = () => {
  return (
    <section className="w-full h-full flex flex-col p-6 font-mono text-cyan-100/80 bg-gradient-to-br from-slate-900/80 via-cyan-900/10 to-slate-800/60 backdrop-blur-xl border border-cyan-400/10 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.05)]">
      <div className="flex justify-between items-center border-b border-cyan-400/10 pb-3 mb-4">
        <h2 className="text-cyan-400 tracking-widest text-sm uppercase flex items-center gap-2">
          <FileText size={16} /> System Logs
        </h2>
        <Terminal size={14} className="text-cyan-400/60" />
      </div>

      <div className="flex-1 bg-black/30 border border-cyan-400/10 rounded-xl p-4 text-xs text-cyan-300/80 overflow-y-auto font-mono shadow-[inset_0_0_20px_rgba(0,255,255,0.05)]">
        <p>[12:01:24] INIT :: Service started successfully</p>
        <p>[12:03:18] SYNC :: Connected to node lumos-01</p>
        <p>[12:05:42] FS :: File moved → /Vaults/Documents</p>
        <p>[12:06:02] CRON :: Cleanup routine complete</p>
      </div>
    </section>
  )
}

export default Logs
