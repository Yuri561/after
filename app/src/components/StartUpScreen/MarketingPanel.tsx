interface Props {
  onSignIn: () => void;
  onSignUp: () => void;
  onDevContinue: () => void;
}

const MarketingPanel = ({ onSignIn, onSignUp, onDevContinue }: Props) => (
  <div className="rounded-3xl border border-cyan-400/10 bg-white/5 p-8">
    <h1 className="text-4xl text-cyan-200">
      Move files like a machine.
      <span className="text-cyan-400"> Organize like a boss.</span>
    </h1>

    <p className="mt-4 text-cyan-100/60">
      AFTER scans folders, categorizes files, and keeps your vault clean.
    </p>

    <div className="mt-7 flex gap-3">
      <button onClick={onSignIn} className="btn-primary">Sign In</button>
      <button onClick={onSignUp} className="btn-secondary">Create Account</button>
      <button onClick={onDevContinue} className="btn-dev ml-auto">
        Continue (Dev)
      </button>
    </div>
  </div>
);

export default MarketingPanel;
