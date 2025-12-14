import React, { useEffect, useState } from "react";
import { fetchSystemData } from "../../api/fetchSystemData";
import { HardDrive } from "lucide-react";

const StorageMap: React.FC = () => {
  const [usage, setUsage] = useState<number>(0);
  const [free, setFree] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getUsage = async () => {
      try {
        const data = await fetchSystemData();
        setUsage(data.disk || 0);
        setFree(data.free_space || 0);
        setTotal(data.total_space || 0);
      } catch (err) {
        console.error("error retrieving info", err);
      }
    };

    getUsage();
    const interval = setInterval(getUsage, 4000);
    return () => clearInterval(interval);
  }, []);

  const used = (total - free).toFixed(1);
  const progress = Math.min(usage, 100);

  return (
    <div className="col-span-1 rounded-2xl border border-cyan-400/10 bg-gradient-to-br from-slate-900/60 via-cyan-900/10 to-slate-800/40 backdrop-blur-lg flex flex-col items-center justify-center p-5 font-mono text-cyan-100/90 shadow-[0_0_25px_rgba(0,255,255,0.06)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]">
      
      {/* Animated Circular Gauge */}
      <div className="relative w-28 h-28 mb-4">
        <svg className="absolute inset-0" viewBox="0 0 36 36">
          <path
            className="text-cyan-400/10"
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
            strokeDasharray="100,100"
            d="M18 2a16 16 0 1 1 0 32a16 16 0 1 1 0-32"
          />
          <path
            className="text-cyan-400 drop-shadow-[0_0_6px_rgba(0,255,255,0.7)] transition-all duration-500"
            strokeWidth="3"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            strokeDasharray={`${progress},100`}
            d="M18 2a16 16 0 1 1 0 32a16 16 0 1 1 0-32"
          />
        </svg>

        {/* Inner glow & text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-lg font-bold text-cyan-300 ">
            {progress.toFixed(0)}%
          </div>
          <div className="text-[0.65rem] text-cyan-400/70">Used</div>
        </div>
      </div>

      {/* Title & icon */}
      <div className="flex items-center gap-2 mb-1">
        <HardDrive className="text-cyan-400" size={14} />
        <p className="text-xs font-semibold text-cyan-300 tracking-wide">
          Storage Overview
        </p>
      </div>

      {/* Storage Details */}
      <div className="text-[0.7rem] text-cyan-400/70 flex flex-col items-center gap-0.5">
        <p>
          <span className="text-cyan-300">Used:</span> {used} GB
        </p>
        <p>
          <span className="text-cyan-300">Free:</span> {free.toFixed(1)} GB
        </p>
        <p className="mt-1 text-cyan-400/60 text-[0.65rem]">
          Total Capacity: {total.toFixed(1)} GB
        </p>
      </div>
    </div>
  );
};

export default StorageMap;
