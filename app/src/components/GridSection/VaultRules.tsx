import React from "react";
import { ShieldCheck, FileType2, AlertTriangle, Copy, FolderTree } from "lucide-react";

const RuleRow: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  badge?: string;
}> = ({ icon, title, desc, badge }) => (
  <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-4 hover:bg-cyan-400/10 transition">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-cyan-300/80">{icon}</div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-cyan-200 text-sm tracking-wide">{title}</h4>
            {badge && (
              <span className="text-[0.65rem] font-mono px-2 py-0.5 rounded-md border border-cyan-400/20 bg-cyan-400/10 text-cyan-200/80">
                {badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-cyan-100/60 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  </div>
);

const VaultRules: React.FC = () => {
  return (
    <section className="w-full h-[460px] flex flex-col p-3 font-mono text-cyan-100/80 bg-gradient-to-br from-slate-900/80 via-cyan-900/10 to-slate-800/60 backdrop-blur-xl border border-cyan-400/10 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.05)]">
      <div className="flex items-center justify-between border-b border-cyan-400/10 pb-3 mb-4">
        <h2 className="text-cyan-400 tracking-widest text-sm uppercase flex items-center gap-2">
          <ShieldCheck size={16} /> Vault Rules & File Policy
        </h2>
        <span className="text-[0.7rem] text-cyan-400/60">
          Applies to transfer + scan
        </span>
      </div>

      <div className="flex-1 grid grid-cols-1 gap-3 overflow-y-auto">
        <RuleRow
          icon={<FileType2 size={16} />}
          title="Accepted files"
          badge="ALLOWLIST"
          desc="Images, documents, videos, audio, and archives. Unknown extensions will be placed in Others."
        />

        <RuleRow
          icon={<Copy size={16} />}
          title="Transfer mode"
          badge="COPY / MOVE"
          desc="Copy keeps original files intact. Move removes them from the source after transfer completes."
        />

        <RuleRow
          icon={<FolderTree size={16} />}
          title="Folder structure"
          badge="CATEGORIES"
          desc="Files are organized into Images, Documents, Videos, Audios, and Others inside the A.F.T.E.R vault."
        />

        <RuleRow
          icon={<AlertTriangle size={16} />}
          title="Duplicates"
          badge="RENAME"
          desc="If a filename already exists in the destination, the vault auto-renames to prevent overwriting."
        />
      </div>

      <div className="mt-4 border-t border-cyan-400/10 pt-3 text-[0.7rem] text-cyan-400/60 flex items-center justify-between">
        <span>Tip: Keep “Copy” on while testing.</span>
        <span className="uppercase tracking-widest">Policy v1</span>
      </div>
    </section>
  );
};

export default VaultRules;
