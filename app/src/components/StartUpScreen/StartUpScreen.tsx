import React, { useMemo, useState } from "react";
import Orb from "../ogl/orb";

interface HomeScreenProps {
  onAccessGranted: () => void; // same as before
}

type AuthTab = "signin" | "signup";
type Status = "idle" | "loading" | "success" | "error";

const HomeScreen: React.FC<HomeScreenProps> = ({ onAccessGranted }) => {
  const [tab, setTab] = useState<AuthTab>("signin");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  // Auth fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup fields
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");

  const canSubmit = useMemo(() => {
    if (tab === "signin") return email.trim() && password.trim();
    return name.trim() && email.trim() && password.trim() && confirm.trim();
  }, [tab, name, email, password, confirm]);

  const resetStatus = () => {
    setStatus("idle");
    setMessage("");
  };

  const fakeAuth = async () => {
    // replace later with real backend call
    setStatus("loading");
    setMessage("");

    await new Promise((r) => setTimeout(r, 800));

    // basic demo validation
    if (!email.includes("@")) {
      setStatus("error");
      setMessage("That email looks sus. Add a real one 😅");
      return;
    }

    if (password.length < 4) {
      setStatus("error");
      setMessage("Password too short. Give it some muscle.");
      return;
    }

    if (tab === "signup" && password !== confirm) {
      setStatus("error");
      setMessage("Passwords don’t match. Y’all gotta agree.");
      return;
    }

    setStatus("success");
    setMessage(tab === "signin" ? "Welcome back ✅" : "Account created ✅");

    setTimeout(() => {
      onAccessGranted();
    }, 650);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-cyan-100/80 font-mono">
      {/* ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.10),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(0,255,255,0.06),transparent_40%)] pointer-events-none" />

      {/* Orb background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[1200px] h-[1200px] sm:w-[950px] sm:h-[950px] opacity-50">
          <Orb hoverIntensity={0.45} rotateOnHover={true} hue={180} forceHoverState={false} />
        </div>
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-cyan-400/20 bg-cyan-400/10 shadow-[0_0_18px_rgba(0,255,255,0.12)]" />
            <div className="leading-tight">
              <div className="text-cyan-300 tracking-[0.35em] text-sm">A.F.T.E.R</div>
              <div className="text-[0.7rem] text-cyan-200/50">Automated File Transfer Engine</div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-cyan-200/50">
            <span className="px-2 py-1 rounded-lg border border-cyan-400/10 bg-white/5">
              ArkVault • Rules • Watcher • Dry Run
            </span>
          </div>
        </div>

        {/* main grid */}
        <div className="mt-10 grid grid-cols-12 gap-6">
          {/* LEFT: product story */}
          <div className="col-span-12 lg:col-span-7">
            <div className="rounded-3xl border border-cyan-400/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_0_30px_rgba(0,255,255,0.06)]">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200/70">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
                vault-ready • automated • secure
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl text-cyan-200 tracking-tight">
                Move files like a machine.
                <span className="text-cyan-400"> Organize like a boss.</span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-cyan-100/60 leading-relaxed">
                AFTER scans any folder, categorizes your files (images, docs, videos, audio, etc),
                and transfers them into your vault structure automatically — with optional <span className="text-cyan-200">dry runs</span>,
                <span className="text-cyan-200"> rules</span>, and <span className="text-cyan-200"> watcher mode</span>.
                It’s basically “clean up my life” but for storage.
              </p>

              {/* feature cards */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Smart Categorization",
                    desc: "Scans folders and sorts into Images / Docs / Videos / Audio / Other automatically.",
                  },
                  {
                    title: "Vault Integrity",
                    desc: "Avoid overwrites with unique naming + optional structure preservation.",
                  },
                  {
                    title: "Dry Run Mode",
                    desc: "Preview what would happen before committing — no surprises.",
                  },
                  {
                    title: "System Awareness",
                    desc: "Metrics + watcher mode = transfers that behave like a real ops tool.",
                  },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-cyan-400/10 bg-black/20 p-4 hover:bg-cyan-400/5 transition"
                  >
                    <div className="text-cyan-300 text-sm font-semibold">{f.title}</div>
                    <div className="mt-1 text-[0.8rem] text-cyan-100/55 leading-relaxed">{f.desc}</div>
                  </div>
                ))}
              </div>

              {/* mini CTA row */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    resetStatus();
                    setTab("signin");
                    const el = document.getElementById("auth-panel");
                    el?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className="rounded-2xl px-5 py-3 text-sm border border-cyan-400/20 bg-cyan-400/10 hover:bg-cyan-400/15 transition shadow-[0_0_16px_rgba(0,255,255,0.08)]"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    resetStatus();
                    setTab("signup");
                    const el = document.getElementById("auth-panel");
                    el?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className="rounded-2xl px-5 py-3 text-sm border border-cyan-400/15 bg-white/5 hover:bg-white/10 transition"
                >
                  Create Account
                </button>

                <button
                  onClick={onAccessGranted}
                  className="ml-auto rounded-2xl px-5 py-3 text-sm border border-emerald-400/20 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/15 transition"
                  title="Temporary dev shortcut"
                >
                  Continue (Dev)
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: auth panel */}
          <div id="auth-panel" className="col-span-12 lg:col-span-5">
            <div className="rounded-3xl border border-cyan-400/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_0_30px_rgba(0,255,255,0.06)]">
              {/* tab switch */}
              <div className="grid grid-cols-2 gap-2 rounded-2xl border border-cyan-400/10 bg-black/20 p-2">
                <button
                  onClick={() => {
                    resetStatus();
                    setTab("signin");
                  }}
                  className={`rounded-xl py-2 text-xs transition ${
                    tab === "signin"
                      ? "bg-cyan-400/15 border border-cyan-400/20 text-cyan-200"
                      : "text-cyan-200/50 hover:bg-white/5"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    resetStatus();
                    setTab("signup");
                  }}
                  className={`rounded-xl py-2 text-xs transition ${
                    tab === "signup"
                      ? "bg-cyan-400/15 border border-cyan-400/20 text-cyan-200"
                      : "text-cyan-200/50 hover:bg-white/5"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <div className="mt-5">
                <div className="text-cyan-300 text-sm font-semibold">
                  {tab === "signin" ? "Welcome back" : "Create your access"}
                </div>
                <div className="mt-1 text-xs text-cyan-100/50">
                  {tab === "signin"
                    ? "Sign in to manage transfers, rules, and your ArkVault."
                    : "Make an account so your vault can be tied to a user profile later."}
                </div>

                <div className="mt-5 space-y-3">
                  {tab === "signup" && (
                    <div className="space-y-1">
                      <label className="text-[0.7rem] text-cyan-200/60">Name</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-2xl border border-cyan-400/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-cyan-400/30"
                        placeholder="Your name"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[0.7rem] text-cyan-200/60">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-cyan-400/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-cyan-400/30"
                      placeholder="you@after.app"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[0.7rem] text-cyan-200/60">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-2xl border border-cyan-400/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-cyan-400/30"
                      placeholder="••••••••"
                    />
                  </div>

                  {tab === "signup" && (
                    <div className="space-y-1">
                      <label className="text-[0.7rem] text-cyan-200/60">Confirm password</label>
                      <input
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="w-full rounded-2xl border border-cyan-400/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-cyan-400/30"
                        placeholder="••••••••"
                      />
                    </div>
                  )}

                  <button
                    disabled={!canSubmit || status === "loading"}
                    onClick={fakeAuth}
                    className={`w-full rounded-2xl px-5 py-3 text-sm transition border shadow-[0_0_16px_rgba(0,255,255,0.08)]
                      ${
                        !canSubmit || status === "loading"
                          ? "cursor-not-allowed opacity-50 bg-white/5 border-cyan-400/10"
                          : "bg-cyan-400/15 hover:bg-cyan-400/20 border-cyan-400/20"
                      }`}
                  >
                    {status === "loading"
                      ? "Authenticating..."
                      : tab === "signin"
                      ? "Enter AFTER"
                      : "Create Account"}
                  </button>

                  {/* status */}
                  <div className="min-h-[1.25rem] text-xs">
                    {status === "success" && <span className="text-emerald-300">{message}</span>}
                    {status === "error" && <span className="text-red-300">{message}</span>}
                    {status === "idle" && <span className="text-cyan-200/40">Tip: wire this to FastAPI later.</span>}
                  </div>

                  {/* extra links */}
                  <div className="flex items-center justify-between pt-2 text-[0.7rem] text-cyan-200/40">
                    <button
                      onClick={() => {
                        setEmail("");
                        setPassword("");
                        setName("");
                        setConfirm("");
                        resetStatus();
                      }}
                      className="hover:text-cyan-200/70 transition"
                    >
                      Clear
                    </button>
                    <button className="hover:text-cyan-200/70 transition">
                      Forgot password?
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* footer mini */}
            <div className="mt-4 text-[0.7rem] text-cyan-200/35">
              © {new Date().getFullYear()} AFTER • built for clean transfers and clean vibes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
