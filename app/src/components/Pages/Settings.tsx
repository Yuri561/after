import React, { useState } from "react"
import { Settings, Shield, Bell, Wifi, Monitor, Cpu, Info } from "lucide-react"
import Switch from "@mui/material/Switch"

const SettingsPage: React.FC = () => {
  const [toggles, setToggles] = useState({
    darkMode: true,
    animations: true,
    notifications: false,
    autoSync: true,
    encryption: true,
  })

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const label = { inputProps: { "aria-label": "toggle" } }

  return (
    <section className="w-full h-full flex flex-col p-6 font-mono text-cyan-100/80 bg-gradient-to-br from-[#03080E] via-[#011219]/90 to-[#001016]/80 backdrop-blur-2xl border border-cyan-400/10 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.05)] overflow-y-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-cyan-400/10 pb-3 mb-6">
        <h2 className="text-cyan-400 tracking-widest text-sm uppercase flex items-center gap-2">
          <Settings size={16} /> System Settings
        </h2>
        <span className="text-[0.7rem] text-cyan-400/60">v1.0.0 • Stable</span>
      </div>

      {/* GRID SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-cyan-300/80">

        {/* Display Section */}
        <div className="bg-white/5 border border-cyan-400/10 p-5 rounded-xl hover:bg-cyan-400/10 transition-all duration-500 shadow-[inset_0_0_25px_rgba(0,255,255,0.05)]">
          <h3 className="text-cyan-400 mb-3 flex items-center gap-2">
            <Monitor size={14} /> Display
          </h3>
          <div className="flex justify-between items-center mb-3">
            <span>Dark Mode</span>
            <Switch {...label} checked={toggles.darkMode} onChange={() => handleToggle("darkMode")} />
          </div>
          <div className="flex justify-between items-center mb-3">
            <span>Animations</span>
            <Switch {...label} checked={toggles.animations} onChange={() => handleToggle("animations")} />
          </div>
          <div className="flex flex-col mt-3">
            <label className="mb-1 text-cyan-400/80">Brightness</label>
            <input type="range" min="0" max="100" className="accent-cyan-400 w-full cursor-pointer" />
          </div>
        </div>

        {/* System Section */}
        <div className="bg-white/5 border border-cyan-400/10 p-5 rounded-xl hover:bg-cyan-400/10 transition-all duration-500 shadow-[inset_0_0_25px_rgba(0,255,255,0.05)]">
          <h3 className="text-cyan-400 mb-3 flex items-center gap-2">
            <Cpu size={14} /> System
          </h3>
          <div className="flex justify-between items-center mb-3">
            <span>Auto Sync</span>
            <Switch {...label} checked={toggles.autoSync} onChange={() => handleToggle("autoSync")} />
          </div>
          <div className="flex justify-between items-center mb-3">
            <span>Startup Launch</span>
            <Switch {...label} />
          </div>
          <p className="text-cyan-400/70 mt-3">Performance mode: <span className="text-cyan-300">Balanced</span></p>
        </div>

        {/* Network Section */}
        <div className="bg-white/5 border border-cyan-400/10 p-5 rounded-xl hover:bg-cyan-400/10 transition-all duration-500 shadow-[inset_0_0_25px_rgba(0,255,255,0.05)]">
          <h3 className="text-cyan-400 mb-3 flex items-center gap-2">
            <Wifi size={14} /> Network
          </h3>
          <div className="text-cyan-300/70 mb-2">Active Connection:</div>
          <p className="text-sm text-cyan-200 mb-3">Wi-Fi • LUMOS-01</p>
          <div className="flex gap-2 text-[0.75rem]">
            <button className="px-3 py-1 rounded-md border border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400/20 transition">
              Test Connection
            </button>
            <button className="px-3 py-1 rounded-md border border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400/20 transition">
              Change Network
            </button>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white/5 border border-cyan-400/10 p-5 rounded-xl hover:bg-cyan-400/10 transition-all duration-500 shadow-[inset_0_0_25px_rgba(0,255,255,0.05)]">
          <h3 className="text-cyan-400 mb-3 flex items-center gap-2">
            <Shield size={14} /> Security
          </h3>
          <div className="flex justify-between items-center mb-3">
            <span>File Encryption</span>
            <Switch {...label} checked={toggles.encryption} onChange={() => handleToggle("encryption")} />
          </div>
          <div className="flex justify-between items-center mb-3">
            <span>Require Auth</span>
            <Switch {...label} />
          </div>
          <button className="mt-2 px-3 py-2 text-[0.75rem] rounded-md border border-cyan-400/20 bg-cyan-400/10 hover:bg-cyan-400/20 transition-all">
            Manage Keys
          </button>
        </div>

        {/* Notifications Section */}
        <div className="bg-white/5 border border-cyan-400/10 p-5 rounded-xl hover:bg-cyan-400/10 transition-all duration-500 shadow-[inset_0_0_25px_rgba(0,255,255,0.05)]">
          <h3 className="text-cyan-400 mb-3 flex items-center gap-2">
            <Bell size={14} /> Notifications
          </h3>
          <div className="flex justify-between items-center mb-3">
            <span>Enable Notifications</span>
            <Switch {...label} checked={toggles.notifications} onChange={() => handleToggle("notifications")} />
          </div>
          <div className="flex justify-between items-center mb-3">
            <span>System Sounds</span>
            <Switch {...label} />
          </div>
          <div className="flex flex-col mt-3">
            <label className="mb-1 text-cyan-400/80">Notification Volume</label>
            <input type="range" min="0" max="100" className="accent-cyan-400 w-full cursor-pointer" />
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white/5 border border-cyan-400/10 p-5 rounded-xl hover:bg-cyan-400/10 transition-all duration-500 shadow-[inset_0_0_25px_rgba(0,255,255,0.05)]">
          <h3 className="text-cyan-400 mb-3 flex items-center gap-2">
            <Info size={14} /> About F.A.T.E
          </h3>
          <p className="text-cyan-300/70 text-[0.75rem] leading-relaxed">
            A.F.T.E.R (Automated File Transfer Engine & Repository) is a modular system for managing and automating
            file organization, synchronization, and encryption across local and cloud environments.
          </p>
          <p className="text-cyan-400/60 text-[0.7rem] mt-3">Build: 2025.10.08 • Engine: React + Tauri</p>
        </div>

      </div>
    </section>
  )
}

export default SettingsPage
