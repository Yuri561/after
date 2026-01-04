
const API_URL = import.meta.env.VITE_API_URL
export const sendToVault = async (sourcePath: string, mode: "copy" | "move" = "copy") => {
  const res = await fetch(`${API_URL}/api/vault/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ source_path: sourcePath, mode }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`unable to send file to vault ${res.status} ${text}`);
  }

  return res.json();
};