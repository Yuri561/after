import type { AuthTab } from "./AuthPanel";

interface Props {
  tab: AuthTab;
  values: {
    email: string;
    password: string;
    name: string;
    confirm: string;
  };
  setters: {
    setEmail: (v: string) => void;
    setPassword: (v: string) => void;
    setName: (v: string) => void;
    setConfirm: (v: string) => void;
  };
  canSubmit: boolean;
  loading: boolean;
  onSubmit: () => void;
}

const AuthForm = ({
  tab,
  values,
  setters,
  canSubmit,
  loading,
  onSubmit,
}: Props) => {
  return (
    <div className="mt-5 space-y-3">
      {tab === "signup" && (
        <div className="space-y-1">
          <label className="text-[0.7rem] text-cyan-200/60">Name</label>
          <input
            value={values.name}
            onChange={(e) => setters.setName(e.target.value)}
            className="w-full rounded-2xl border border-cyan-400/10 bg-black/20 px-4 py-3 text-sm"
            placeholder="Your name"
          />
        </div>
      )}

      <div className="space-y-1">
        <label className="text-[0.7rem] text-cyan-200/60">Email</label>
        <input
          value={values.email}
          onChange={(e) => setters.setEmail(e.target.value)}
          className="w-full rounded-2xl border border-cyan-400/10 bg-black/20 px-4 py-3 text-sm"
          placeholder="you@after.app"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[0.7rem] text-cyan-200/60">Password</label>
        <input
          type="password"
          value={values.password}
          onChange={(e) => setters.setPassword(e.target.value)}
          className="w-full rounded-2xl border border-cyan-400/10 bg-black/20 px-4 py-3 text-sm"
          placeholder="••••••••"
        />
      </div>

      {tab === "signup" && (
        <div className="space-y-1">
          <label className="text-[0.7rem] text-cyan-200/60">
            Confirm password
          </label>
          <input
            type="password"
            value={values.confirm}
            onChange={(e) => setters.setConfirm(e.target.value)}
            className="w-full rounded-2xl border border-cyan-400/10 bg-black/20 px-4 py-3 text-sm"
            placeholder="••••••••"
          />
        </div>
      )}

      <button
        disabled={!canSubmit || loading}
        onClick={onSubmit}
        className={`w-full rounded-2xl px-5 py-3 text-sm transition border ${
          !canSubmit || loading
            ? "opacity-50 cursor-not-allowed bg-white/5 border-cyan-400/10"
            : "bg-cyan-400/15 hover:bg-cyan-400/20 border-cyan-400/20"
        }`}
      >
        {loading
          ? "Authenticating..."
          : tab === "signin"
          ? "Enter AFTER"
          : "Create Account"}
      </button>
    </div>
  );
};

export default AuthForm;
