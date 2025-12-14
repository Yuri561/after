import React from "react"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import Footer from "../Footer/Footer"
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation"
import SyncingAnimation from "../LoadingAnimation/SyncingAnimation"

const DashboardLayout: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [sync, setSync] = useState<boolean>(false)
  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-[#04080F] via-[#021218]/90 to-[#001018]/90 text-cyan-100/80 font-mono backdrop-blur-xl">
      <Header setSync={setSync} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar setLoading={setLoading}/>
        <main className="flex-1 overflow-y-auto bg-black/30 border-l border-cyan-400/10 shadow-[inset_0_0_40px_rgba(0,255,255,0.05)]">
          <Outlet />
           {loading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <LoadingAnimation />
            </div>
          )}
           {sync && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <SyncingAnimation />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default DashboardLayout
