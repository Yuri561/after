import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import StartUpScreen from "./components/StartUpScreen/StartUpScreen"
import Dashboard from "./components/Pages/Dashboard"
import LoggedOut from "./components/Pages/LoggedOut"
import Vaults from "./components/Pages/Vaults"
import DashboardLayout from "./components/Layout/DahboardLayout"
import LogsPage from "./components/Pages/Logs"
import MapPage from "./components/Pages/Map"
import Integrations from "./components/Pages/Intergrations"
import SettingsPage from "./components/Pages/Settings"
import ActivityPage from "./components/Pages/Activity"

// import { mkdir, BaseDirectory } from "@tauri-apps/plugin-fs"

// async function ensureVaultRoot() {
//   try {
//     await mkdir("ArkVault", {
//       recursive: true,
//       baseDir: BaseDirectory.Document,
//     });
//     console.log("Vault root ensured.");
//   } catch (err) {
//     console.error("Vault root creation failed:", err);
//   }
// }

const App = () => {
  const navigate = useNavigate()

  // useEffect(() => {
  //   (async () => {
  //     await ensureVaultRoot();
  //   })();
  // }, []);

  return (
    <Routes>
      <Route index element={<StartUpScreen onAccessGranted={() => navigate("/dashboard")} />} />
      <Route path="/" element={<StartUpScreen onAccessGranted={() => navigate("/dashboard")} />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vaults" element={<Vaults />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/integration" element={<Integrations />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="/loggedout" element={<LoggedOut />} />
    </Routes>
  )
}

export default App
