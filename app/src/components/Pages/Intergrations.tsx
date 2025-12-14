import React from "react"
import { Plug, Wifi, Cloud } from "lucide-react"

const Integrations: React.FC = () => {
  return (
    <section className="w-full h-full flex flex-col p-6 font-mono text-cyan-100/80 bg-gradient-to-br from-slate-900/80 via-cyan-900/10 to-slate-800/60 backdrop-blur-xl border border-cyan-400/10 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.05)]">
      <div className="flex justify-between items-center border-b border-cyan-400/10 pb-3 mb-4">
        <h2 className="text-cyan-400 tracking-widest text-sm uppercase flex items-center gap-2">
          <Plug size={16} /> Integrations
        </h2>
        <Wifi size={14} className="text-cyan-400/60" />
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4">
        {[
          { name: "Google Drive", icon: <Cloud size={20} />, status: "Connected" },
          { name: "Dropbox", icon: <Cloud size={20} />, status: "Disconnected" },
          { name: "OneDrive", icon: <Cloud size={20} />, status: "Connected" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-cyan-400/20 bg-white/5 hover:bg-cyan-400/10 transition-all shadow-[0_0_20px_rgba(0,255,255,0.05)]"
          >
            <div className="text-cyan-400/80">{item.icon}</div>
            <span className="text-sm">{item.name}</span>
            <span
              className={`text-[0.7rem] ${
                item.status === "Connected" ? "text-green-400" : "text-red-400"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Integrations
