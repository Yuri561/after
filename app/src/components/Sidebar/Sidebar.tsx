import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  Map,
  ActivitySquare,
  FileText,
  Plug,
  Settings,
} from "lucide-react";

import useCurrentTime from "../../Helpers/useCurrentTime"


const Sidebar: React.FC<{ setLoading: React.Dispatch<React.SetStateAction<boolean>> }> = ({setLoading}) => {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate()
  const time = useCurrentTime()

  const items = [
    { label: "Dashboard", icon: <LayoutDashboard size={16} />, link: '/dashboard' },
    { label: "Vaults", icon: <Folder size={16} />, link: '/vaults' },
    { label: "Map", icon: <Map size={16} />, link: '/map' },
    { label: "Activity", icon: <ActivitySquare size={16} />, link: '/activity' },
    { label: "Logs", icon: <FileText size={16} />, link: '/logs' },
    { label: "Integrations", icon: <Plug size={16} />, link: '/integration' },
    { label: "Settings", icon: <Settings size={16} />, link: '/settings' },
  ];

 const handleOnClick = (item: { label: string; link: string }) => {
  setLoading(true)
  setActive(item.label);
  navigate(item.link);
  setTimeout(()=> setLoading(false), 2000)
};

  

  return (
    <aside className="hidden sm:flex w-[120px] flex-col justify-between p-4 border-r border-cyan-400/10 bg-gradient-to-b from-slate-900/60 via-cyan-900/10 to-slate-800/40 backdrop-blur-xl transition-all duration-500 shadow-[0_0_25px_rgba(0,255,255,0.05)]">
      {/* Top Logo */}
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="w-12 h-12 rounded-full animate-pulse border-2 border-cyan-400 flex items-center justify-center text-cyan-400 font-bold text-lg animate-[pulse_4s_ease_in_out_infinite] shadow-[0_0_12px_rgba(0,255,255,0.3)]">
            A
          </div>
          <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-[spin_10s_linear_infinite]" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 w-full text-xs font-mono">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={()=> handleOnClick(item)}
              className={`flex items-center cursor-pointer justify-center gap-2 py-2 px-2 rounded-md transition-all duration-300 border ${
                active === item.label
                  ? "bg-cyan-400/20 border-cyan-400/50 text-cyan-200 shadow-[0_0_12px_rgba(0,255,255,0.3)]"
                  : "border-transparent hover:bg-cyan-400/10 hover:border-cyan-400/30 text-cyan-400/70"
              }`}
            >
              {item.icon}
              <span className="text-[0.65rem]">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* System Info Footer */}
      <div className="text-[0.6rem] text-center text-cyan-400/70 border-t border-cyan-400/10 pt-3 leading-tight font-mono">
        <span className="animate-pulse text-cyan-300">SYS ONLINE ▮</span>
        <br />
        {time}
        <br />
        CPU 32% • MEM 58%
      </div>
    </aside>
  );
};

export default Sidebar;
