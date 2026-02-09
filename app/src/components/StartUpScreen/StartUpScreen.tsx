import OrbBackground from "./OrbBackground";
import TopBar from "./TopBar";
import MarketingPanel from "./MarketingPanel";
import AuthPanel from "./AuthPanel";

interface Props {
  onAccessGranted: () => void;
}

const StartUpScreen = ({ onAccessGranted }: Props) => {
  return (
    <div className="relative min-h-screen bg-black text-cyan-100 font-mono">
      <OrbBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <TopBar />

        <div className="mt-10 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <MarketingPanel
              onSignIn={() => document.getElementById("auth")?.scrollIntoView()}
              onSignUp={() => document.getElementById("auth")?.scrollIntoView()}
              onDevContinue={onAccessGranted}
            />
          </div>

          <div id="auth" className="col-span-12 lg:col-span-5">
            <AuthPanel onSuccess={onAccessGranted} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartUpScreen;
