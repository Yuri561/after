import React from 'react';

const QuickCommands: React.FC = () => {
  return (
   <div className="col-span-2 sm:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-4">
            <h3 className="text-cyan-400 text-sm mb-3 font-mono">Quick Commands</h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {["Analyze", "Encrypt", "Deploy", "Sync", "Purge"].map((cmd) => (
                <button
                  key={cmd}
                  className="px-3 py-1.5 rounded-md border border-cyan-400/20 bg-cyan-400/10 hover:bg-cyan-400/20 transition-all"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
  );
};

export default QuickCommands;