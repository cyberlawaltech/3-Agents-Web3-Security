"use client"

import type React from "react"

import {
  LayoutDashboard,
  AlertTriangle,
  FileText,
  PenToolIcon as Tool,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

type Tab = "overview" | "threats" | "reports" | "tools" | "settings"

interface DashboardSidebarProps {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

export function DashboardSidebar({ activeTab, setActiveTab }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "bg-gray-900 border-r border-gray-800 h-[calc(100vh-4rem)] transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 py-6">
          <nav className="space-y-1 px-2">
            <SidebarItem
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="Overview"
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<AlertTriangle className="h-5 w-5" />}
              label="Security Threats"
              active={activeTab === "threats"}
              onClick={() => setActiveTab("threats")}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<FileText className="h-5 w-5" />}
              label="Reports"
              active={activeTab === "reports"}
              onClick={() => setActiveTab("reports")}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Tool className="h-5 w-5" />}
              label="Tools"
              active={activeTab === "tools"}
              onClick={() => setActiveTab("tools")}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
              collapsed={collapsed}
            />
          </nav>
        </div>
        <div className="p-4 border-t border-gray-800">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex justify-center"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
  collapsed: boolean
}

function SidebarItem({ icon, label, active, onClick, collapsed }: SidebarItemProps) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start",
        active ? "bg-emerald-900 text-emerald-200 hover:bg-emerald-800" : "text-gray-400 hover:text-white",
        collapsed ? "px-3" : "px-3",
      )}
      onClick={onClick}
    >
      {icon}
      {!collapsed && <span className="ml-3">{label}</span>}
    </Button>
  )
}

