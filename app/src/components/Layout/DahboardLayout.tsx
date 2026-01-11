import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import SyncingAnimation from "../LoadingAnimation/SyncingAnimation";
import { fetchSystemData } from "../../api/fetchSystemData";

const DashboardLayout: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [sync, setSync] = useState(false);

  // 🔹 system metrics (single source of truth)
  const [cpu, setCpu] = useState(0);
  const [memory, setMemory] = useState(0);
  const [disk, setDisk] = useState(0);

  const [free, setFree] = useState(0);
  const [total, setTotal] = useState(0);
  const [uptime, setUptime] = useState("");
  const [host, setHost] = useState("");

  const [cpuSpeed, setCpuSpeed] = useState(0);
  const [cpuTemp, setCpuTemp] = useState(0);

  const [battery, setBattery] = useState(0);
  const [plugged, setPlugged] = useState(false);

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateSystem = async () => {
      try {
        const data = await fetchSystemData();

        // 🔹 normalize API response here (IMPORTANT)
        setCpu(data.cpu ?? 0);
        setMemory(data.memory ?? 0);
        setDisk(data.disk ?? 0);

        setFree(data.free_space ?? 0);
        setTotal(data.total_space ?? 0);

        setUptime(data.uptime ?? "");
        setHost(data.hostname ?? "");

        setCpuSpeed(data.speed ?? 0);
        setCpuTemp(data.temp ?? 0);

        setBattery(data.battery_percent ?? 0);
        setPlugged(data.battery_plugged ?? false);
      } catch (err) {
        console.error("System fetch failed:", err);
      }
    };

    const updateClock = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };

    updateSystem();
    updateClock();

    const interval = setInterval(() => {
      updateSystem();
      updateClock();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  
  const contextValue = {
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
    setSync,
    setLoading,
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-[#04080F] via-[#021218]/90 to-[#001018]/90 text-cyan-100/80 font-mono">
      <Header setSync={setSync} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar setLoading={setLoading} />

        <main className="flex-1 relative overflow-y-auto bg-black/30 border-l border-cyan-400/10">
          <Outlet context={contextValue} />

          {loading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <LoadingAnimation />
            </div>
          )}

          {sync && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <SyncingAnimation />
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
