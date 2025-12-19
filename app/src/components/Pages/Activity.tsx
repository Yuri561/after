import React from "react";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  X,
  Search,
} from "lucide-react";

const NotificationPage: React.FC = () => {
  const notificationsToday = [
    {
      id: 1,
      title: "Backup Completed",
      message: "Your vault snapshot has been saved successfully.",
      type: "success",
      time: "2:41 PM",
    },
    {
      id: 2,
      title: "Cloud Sync Error",
      message: "Cloud Node unreachable. Retrying...",
      type: "error",
      time: "1:13 PM",
    },
  ];

  const notificationsEarlier = [
    {
      id: 3,
      title: "Low Storage Warning",
      message: "Vault is reaching capacity, consider optimizing.",
      type: "warning",
      time: "Yesterday",
    },
    {
      id: 4,
      title: "System Update Available",
      message: "A new version of AFTER is ready for install.",
      type: "info",
      time: "Yesterday",
    },
  ];

  const iconFor = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-400" size={20} />;
      case "warning":
        return <AlertTriangle className="text-yellow-400" size={20} />;
      case "error":
        return <XCircle className="text-red-400" size={20} />;
      default:
        return <Info className="text-cyan-400" size={20} />;
    }
  };

  const Section = ({ title, items }: any) => (
    <div className="space-y-4">
      <h3 className="text-cyan-400/70 text-xs tracking-wider uppercase mb-2">
        {title}
      </h3>

      {items.map((n: any) => (
        <div
          key={n.id}
          className="
            bg-slate-900/40 border border-cyan-400/10 rounded-xl p-4 relative
            shadow-[0_0_12px_rgba(0,255,255,0.05)]
            hover:border-cyan-300/20 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]
            transition-all duration-300
          "
        >
          {/* Dismiss button */}
          <button className="absolute top-2 right-2 text-cyan-400/40 hover:text-cyan-200 transition">
            <X size={14} />
          </button>

          <div className="flex items-start gap-3">
            {iconFor(n.type)}

            <div>
              <h4 className="text-cyan-200 text-sm font-semibold">
                {n.title}
              </h4>
              <p className="text-cyan-300/60 text-xs mt-1">{n.message}</p>
              <span className="text-[0.6rem] text-cyan-400/40">{n.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      className="
        w-full h-full p-8 font-mono bg-gradient-to-br
        from-slate-900/80 via-cyan-900/10 to-slate-800/60
        backdrop-blur-xl rounded-2xl border border-cyan-400/10
        shadow-[0_0_25px_rgba(0,255,255,0.05)]
        flex flex-col
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-cyan-300 text-xl tracking-widest uppercase">
          Notification Center
        </h1>

        <button
          className="
            text-xs text-cyan-300 border border-cyan-400/20 px-3 py-1 rounded
            hover:border-cyan-300 hover:text-cyan-100 transition
          "
        >
          Mark All as Read
        </button>
      </div>

      {/* Search + Category Tabs */}
      <div className="mb-6 space-y-3">
        {/* Search Bar */}
        <div
          className="
            bg-slate-900/40 border border-cyan-400/20 rounded-lg
            px-3 py-2 flex items-center gap-2
          "
        >
          <Search size={16} className="text-cyan-400/50" />
          <input
            placeholder="Search notifications..."
            className="
              bg-transparent text-cyan-300 text-xs outline-none w-full
            "
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-3 text-xs text-cyan-400/60 uppercase tracking-wide">
          {["All", "Success", "Warnings", "Errors", "Info"].map((tab) => (
            <button
              key={tab}
              className="
                px-3 py-1 rounded border border-cyan-400/10
                hover:border-cyan-300/30 hover:text-cyan-200 transition
              "
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scroll space-y-12">
        <Section title="Today" items={notificationsToday} />
        <Section title="Earlier" items={notificationsEarlier} />
      </div>
    </section>
  );
};

export default NotificationPage;
