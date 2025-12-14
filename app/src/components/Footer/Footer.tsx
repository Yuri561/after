import React from "react";
import { Cpu, HardDrive, ShieldCheck } from "lucide-react";
import useCurrentTime from "../../Helpers/useCurrentTime";


const Footer: React.FC = () => {
  const time = useCurrentTime()
  return (
    <footer className="h-10 w-full flex items-center justify-between px-4 sm:px-8 border-t border-cyan-400/10 bg-gradient-to-r from-slate-900/60 via-cyan-900/10 to-slate-800/40 backdrop-blur-lg text-[0.7rem] sm:text-xs font-mono text-cyan-300/80 shadow-[0_0_20px_rgba(0,255,255,0.05)]">
      {/* Left side: status indicators */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-cyan-400/80">
          <Cpu size={12} className="text-cyan-400" />
          <span>CPU 32%</span>
        </div>
        <div className="flex items-center gap-1 text-cyan-400/80">
          <HardDrive size={12} className="text-cyan-400" />
          <span>Disk 48%</span>
        </div>
        <div className="flex items-center gap-1 text-green-400/80">
          <ShieldCheck
            size={12}
            className="text-green-400 animate-[pulse_3s_ease_in_out_infinite]"
          />
          <span>Secure</span>
        </div>
      </div>

      {/* Center: system title */}
      <span className="mx-auto text-cyan-300 tracking-widest">
        A.F.T.E.R – Automated File Transfer Engine & Repository.
      </span>

      {/* Right side: timestamp */}
      <div className="flex items-center gap-1 text-cyan-400/70">
        <span className="animate-pulse text-cyan-300">●</span>
        <span>{time}</span>
      </div>
    </footer>
  );
};

export default Footer;
