import React from "react"
import { Globe2, Navigation, MapPin } from "lucide-react"

const Map: React.FC = () => {
  return (
    <section className="w-full h-full flex flex-col p-6 font-mono text-cyan-100/80 bg-gradient-to-br from-slate-900/80 via-cyan-900/10 to-slate-800/60 backdrop-blur-xl border border-cyan-400/10 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.05)]">
      <div className="flex justify-between items-center border-b border-cyan-400/10 pb-3 mb-4">
        <h2 className="text-cyan-400 tracking-widest text-sm uppercase flex items-center gap-2">
          <Globe2 size={16} /> System Map
        </h2>
        <button className="px-3 py-1 rounded-md border border-cyan-400/20 bg-cyan-400/10 hover:bg-cyan-400/20 transition-all text-xs">
          Refresh
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-cyan-300/80">
        <Navigation size={48} className="animate-pulse text-cyan-400/70" />
        <p className="text-sm text-cyan-400/70">Visualizing file network routes...</p>
        <MapPin size={20} className="text-cyan-400/50 animate-bounce" />
      </div>
    </section>
  )
}

export default Map
