import React from 'react';

const Logs: React.FC = () => {
  return (
     <div className="col-span-3 sm:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-4 overflow-y-auto font-mono text-xs text-cyan-100/70">
            <h3 className="text-cyan-400 text-sm mb-2">Recent Logs</h3>
            <ul className="space-y-1">
              {[
                "> sorted /Downloads/photos",
                "> moved 43 images",
                "> backup completed",
                "> analysis complete",
              ].map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
  );
};

export default Logs;