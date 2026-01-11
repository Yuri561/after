import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  Monitor,
  HardDrive,
  Cpu,
  Activity,
  Zap,
  Thermometer,
  BatteryCharging,
} from "lucide-react";


type DashboardContext = {
  cpu: number;
  memory: number;
  disk: number;
  free: number;
  total: number;
  uptime: string;
  host: string;
  cpuSpeed: number;
  cpuTemp: number;
  battery: number;
  plugged: boolean;
  time: string;
};

const SystemMetrics: React.FC = () => {
  const {
    cpu,
    memory,
    disk,
    free,
    total,
    uptime,
    host,
    cpuSpeed,
    cpuTemp,
    battery,
    plugged,
    time,
  } = useOutletContext<DashboardContext>();

  const usageMetrics = [
    { name: "CPU", value: cpu, icon: <Cpu size={14} /> },
    { name: "Memory", value: memory, icon: <Activity size={14} /> },
    { name: "Disk", value: disk, icon: <HardDrive size={14} /> },
  ];

  const infoMetrics = [
    {
      name: "CPU Speed",
      value: `${cpuSpeed.toFixed(2)} GHz`,
      icon: <Zap size={14} />,
    },
    {
      name: "Temp",
      value: cpuTemp ? `${cpuTemp.toFixed(0)}°C` : "N/A",
      icon: <Thermometer size={14} />,
    },
    {
      name: "Battery",
      value:
        battery > 0
          ? `${battery.toFixed(0)}% ${plugged ? "(Charging)" : "(On Battery)"}`
          : "N/A",
      icon: <BatteryCharging size={14} />,
    },
  ];

  return (
    <div className="col-span-1 rounded-2xl border border-cyan-400/10 bg-gradient-to-br from-slate-900/60 via-cyan-900/10 to-slate-800/40 backdrop-blur-lg p-5 font-mono text-sm text-cyan-100/80 shadow-[0_0_25px_rgba(0,255,255,0.06)] transition-all duration-500 hover:shadow-[0_0_25px_rgba(0,255,255,0.15)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Monitor className="text-cyan-400" size={16} />
          <h3 className="text-cyan-400 text-sm font-semibold tracking-wide">
            System Metrics
          </h3>
        </div>
        <span className="text-[0.7rem] text-cyan-400/70">{time}</span>
      </div>

      {/* Usage Bars */}
      <div className="space-y-4 mb-4">
        {usageMetrics.map(({ name, value, icon }) => (
          <div key={name}>
            <div className="flex justify-between mb-1 items-center">
              <div className="flex items-center gap-1">
                <span className="text-cyan-300">{icon}</span>
                <span>{name}</span>
              </div>
              <span className="text-cyan-200">{value}%</span>
            </div>
            <div className="relative h-1.5 bg-cyan-400/10 rounded overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-300 animate-[pulse_2s_ease_infinite] rounded"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-cyan-400/10 my-3" />

      {/* Info Metrics */}
      <div className="space-y-2">
        {infoMetrics.map(({ name, value, icon }) => (
          <div
            key={name}
            className="flex justify-between items-center text-[0.8rem] text-cyan-300/80"
          >
            <div className="flex items-center gap-1">
              <span className="text-cyan-300">{icon}</span>
              <span>{name}</span>
            </div>
            <span className="text-cyan-100">{value}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-cyan-400/10 my-3" />

      {/* Storage Summary */}
      <div className="flex justify-between text-[0.75rem] text-cyan-300/80">
        <span>Free Space</span>
        <span>
          {free} GB / {total} GB
        </span>
      </div>

      {/* System Meta */}
      <div className="mt-2 text-[0.7rem] text-cyan-400/70 flex justify-between items-center">
        <span>Host: {host || "N/A"}</span>
        <span>Uptime: {uptime || "--"}</span>
      </div>

      {/* Footer */}
      <div className="mt-3 text-[0.65rem] text-center text-cyan-400/50 tracking-widest uppercase">
        SYS ONLINE
      </div>
    </div>
  );
};

export default SystemMetrics;
