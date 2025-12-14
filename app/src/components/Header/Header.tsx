import React from "react";
import { useNavigate } from "react-router-dom";
import { Wifi, RefreshCcw, User, LogOut } from "lucide-react";

interface HeaderProps {
  onLogout?: () => void;
  setSync: React.Dispatch<React.SetStateAction<boolean>>
}
const STORAGE_KEY = "AFTER_APP_QUEUE_v1";

const Header: React.FC<HeaderProps> = ({ onLogout, setSync }) => {
  const navigate = useNavigate();
  

const handleLogout = () => {
  setSync(true)
  setTimeout(() => {
    if (onLogout) onLogout();
    localStorage.removeItem(STORAGE_KEY)
    navigate("/");
    setTimeout(() => setSync(false), 1000); // turn OFF after navigation
  }, 2000);
};

const handleClick = () => {
  setSync(true);
  setTimeout(() => {
    navigate("/dashboard");
    setSync(false);
  }, 4000);
};
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 sm:px-10 py-4 border-b border-cyan-400/10 bg-gradient-to-r from-slate-900/60 via-cyan-900/10 to-slate-800/40 backdrop-blur-xl shadow-[0_0_25px_rgba(0,255,255,0.08)] transition-all duration-500">
      {/* A.F.T.E.R */}
      <div className="flex items-center gap-2 text-cyan-300 font-mono tracking-widest text-sm">
        <span className="font-bold text-cyan-400 drop-shadow-[0_0_6px_rgba(0,255,255,0.5)]">
          A.F.T.E.R
        </span>
        <span className="text-cyan-400/60">| Automated File Transfer Engine</span>
      </div>

      {/* System ICONS*/}
      <div className="flex items-center gap-6 text-xs font-mono text-cyan-400/70">
        {/* Wi-Fi icon */}
        <div className="flex items-center gap-1">
          <Wifi
            size={14}
            className="text-green-400 animate-[pulse_3s_ease_in_out_infinite]"
          />
          <span>Online</span>
        </div>

        {/* Sync btn */}
        <div 
        onClick={handleClick}
        className="flex items-center gap-1 cursor-pointer hover:text-cyan-300 transition-colors">
          <RefreshCcw
            size={14}
            className="text-cyan-400 animate-[spin_8s_linear_infinite]"
          />
          <span>Sync</span>
        </div>

        {/* User */}
        <div className="hidden sm:flex items-center gap-1">
          <User size={14} className="text-cyan-400" />
          <span>User</span>
        </div>

        {/* Logout btn */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 cursor-pointer border border-cyan-400/20 bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-300 px-3 py-1 rounded-md transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.25)]"
        >
          <LogOut size={14}/>
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
