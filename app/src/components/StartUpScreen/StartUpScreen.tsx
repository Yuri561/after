import React, { useState, useEffect } from "react";
import Orb from "../ogl/orb";

interface StartUpScreenProps {
  onAccessGranted: () => void;
}

const StartUpScreen: React.FC<StartUpScreenProps> = ({ onAccessGranted }) => {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (/^[0-9]$/.test(e.key)) handlePress(e.key);
    else if (e.key === "Enter") handleEnter();
    else if (e.key === "Backspace") handleClear();
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [code]);
  const handlePress = (num: string) => {
    if (code.length < 4) setCode((prev) => prev + num);
  };

  const handleClear = () => {
    setCode("");
    setStatus("idle");
  };

  const handleEnter = () => {
    if (code === "1234") {
      setStatus("success");
      setTimeout(() => {
        onAccessGranted();
      }, 1500);
    } else {
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
        setCode("");
      }, 1500);
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center text-cyan-400 font-mono bg-black overflow-hidden">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.05),_transparent_70%)] pointer-events-none z-0" />

        {/* GIANT ORB */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] sm:w-[900px] sm:h-[900px] opacity-60 z-10">
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={180}
            forceHoverState={false}
          />
        </div>

        {/* UI content “inside” the orb */}
        <div className="relative z-20 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl tracking-[0.3em] mb-4 animate-pulse">
            A.F.T.E.R
          </h1>
          <p className="text-xs text-cyan-200/60 mb-10">
            Secure Access Terminal • Enter 4-digit code
          </p>

          {/* Code display */}
          <div
            className={`flex gap-3 mb-8 transition-all duration-500 ${
              status === "error" ? "animate-shake text-red-400" : ""
            }`}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-6 h-6 sm:w-8 sm:h-8 border-b-2 ${
                  code[i]
                    ? "border-cyan-400 text-cyan-300"
                    : "border-cyan-400/30 text-cyan-400/30"
                } text-center text-lg`}
              >
                {code[i] ? "•" : ""}
              </div>
            ))}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "↵"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === "C") handleClear();
                  else if (item === "↵") handleEnter();
                  else handlePress(item.toString());
                }}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl text-xl border border-cyan-400/30 bg-white/5 hover:bg-cyan-400/10 transition-all duration-300 backdrop-blur-lg shadow-[0_0_10px_rgba(0,255,255,0.1)] ${
                  item === "C"
                    ? "text-red-400 border-red-400/30 hover:bg-red-400/10"
                    : item === "↵"
                    ? "text-green-400 border-green-400/30 hover:bg-green-400/10"
                    : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Status */}
          <div className="mt-10 h-6 text-sm tracking-widest">
            {status === "success" && (
              <span className="text-green-400 animate-pulse">
                ACCESS GRANTED ✅
              </span>
            )}
            {status === "error" && (
              <span className="text-red-400 animate-pulse">
                ACCESS DENIED ❌
              </span>
            )}
            {status === "idle" && (
              <span className="text-cyan-400/60">SYSTEM IDLE ▮</span>
            )}
          </div>
        </div>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </>
  );
};

export default StartUpScreen;
