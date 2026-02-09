const TopBar = () => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-xl border border-cyan-400/20 bg-cyan-400/10" />
      <div>
        <div className="text-cyan-300 tracking-[0.35em] text-sm">A.F.T.E.R</div>
        <div className="text-[0.7rem] text-cyan-200/50">
          Automated File Transfer Engine
        </div>
      </div>
    </div>

    <div className="hidden sm:flex text-xs text-cyan-200/50">
      ArkVault • Rules • Watcher • Dry Run
    </div>
  </div>
);

export default TopBar;
