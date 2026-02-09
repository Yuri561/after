import { useMemo, useState } from "react";
import AuthTabs from "./AuthTabs";
import AuthStatus from "./AuthStatus";
import AuthForm from "./AuthForm";
import { RegisterUser /* LoginUser */ } from "../Config/Routes";

export type AuthTab = "signin" | "signup";
export type Status = "idle" | "loading" | "success" | "error";

interface Props {
  onSuccess: () => void;
}

const AuthPanel = ({ onSuccess }: Props) => {
  const [tab, setTab] = useState<AuthTab>("signin");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");

  const canSubmit = useMemo(() => {
    return tab === "signin"
      ? !!(email && password)
      : !!(name && email && password && confirm);
  }, [tab, name, email, password, confirm]);

  const onSubmit = async () => {
    setStatus("loading");
    setMessage("");

    try {
      if (tab === "signup") {
        if (password !== confirm) {
          setStatus("error");
          setMessage("Passwords don’t match fam");
          return;
        }

        const payload = { email, password, name };
        const response = await RegisterUser(payload);

        console.log("Registration successful:", response.data);
        setStatus("success");
        setMessage("Registration successful! Redirecting...");
      } else {
        // login logic
        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        if (!email.includes("@")) {
          throw new Error("That email look fake as hell");
        }

        setStatus("success");
        setMessage("Welcome back!");
      }

    setTimeout(onSuccess, 600);
  } catch (error: any) {
    console.error("Auth failed:", error);
    setStatus("error");
    setMessage(
      error.response?.data?.message ||
        error.message ||
        "Something went left. Try again."
    );
  }
};

  return (
    <div className="rounded-3xl border border-cyan-400/10 bg-white/5 p-6">
      <AuthTabs
        tab={tab}
        setTab={setTab}
        reset={() => {
          setStatus("idle");
          setMessage("");
        }}
      />

      <AuthForm
        tab={tab}
        values={{ email, password, name, confirm }}
        setters={{ setEmail, setPassword, setName, setConfirm }}
        canSubmit={canSubmit}
        loading={status === "loading"}
        onSubmit={onSubmit}
      />

      <AuthStatus status={status} message={message} />
    </div>
  );
};

export default AuthPanel;
