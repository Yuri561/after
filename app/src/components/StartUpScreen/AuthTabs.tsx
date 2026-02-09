import type { AuthTab } from "./AuthPanel";

interface Props {
  tab: AuthTab;
  setTab: (tab: AuthTab) => void;
  reset: () => void;
}

const AuthTabs = ({ tab, setTab, reset }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-2xl border border-cyan-400/10 bg-black/20 p-2">
      <button
        onClick={() => {
          reset();
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
          reset();
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
  );
};

export default AuthTabs;
