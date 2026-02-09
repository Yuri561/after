import type { Status } from "./AuthPanel";

interface Props {
  status: Status;
  message: string;
}

const AuthStatus = ({ status, message }: Props) => {
  return (
    <div className="mt-3 min-h-[1.25rem] text-xs">
      {status === "success" && (
        <span className="text-emerald-300">{message}</span>
      )}
      {status === "error" && (
        <span className="text-red-300">{message}</span>
      )}
      {status === "idle" && (
        <span className="text-cyan-200/40">
          Tip: wire this to FastAPI later.
        </span>
      )}
    </div>
  );
};

export default AuthStatus;
