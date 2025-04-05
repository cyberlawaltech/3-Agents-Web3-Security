"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "./dashboard-header"
import { DashboardSidebar } from "./dashboard-sidebar"
import { AgentOverview } from "./agent-overview"
import { SecurityThreats } from "./security-threats"
import { Reports } from "./reports"
import { Tools } from "./tools"
import { Settings } from "./settings"

export type Tab = "overview" | "threats" | "reports" | "tools" | "settings"

interface DashboardProps {
  initialTab?: string
}

export function Dashboard({ initialTab }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview")

  useEffect(() => {
    if (initialTab && ["overview", "threats", "reports", "tools", "settings"].includes(initialTab)) {
      setActiveTab(initialTab as Tab)
    }
  }, [initialTab])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 pt-20">
          {activeTab === "overview" && <AgentOverview />}
          {activeTab === "threats" && <SecurityThreats />}
          {activeTab === "reports" && <Reports />}
          {activeTab === "tools" && <Tools />}
          {activeTab === "settings" && <Settings />}
        </main>
      </div>
    </div>
  )
}

