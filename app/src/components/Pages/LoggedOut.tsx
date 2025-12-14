import React from 'react';

const LoggedOut: React.FC = () => {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#050505] to-[#0b0c10] text-cyan-400 font-mono">
            <h1 className="text-4xl mb-6 animate-pulse">A.R.K. OS</h1>
            <p className="text-sm opacity-70 mb-8">Session ended</p>
            <button
                onClick={() => (window.location.href = "/")}
                className="px-6 py-2 rounded-md border border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-300 transition-all duration-300"
            >
                Re-login
            </button>
        </div>
    );
};

export default LoggedOut;