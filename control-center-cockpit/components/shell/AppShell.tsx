"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarNav, NavItemId } from "./SidebarNav";
import { TopStatusBar } from "./TopStatusBar";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface AppShellProps {
  activeId: NavItemId;
  onNavigate: (id: NavItemId) => void;
  children: React.ReactNode;
  drawerContent?: React.ReactNode;
  drawerOpen?: boolean;
  onDrawerClose?: () => void;
}

export function AppShell({
  activeId,
  onNavigate,
  children,
  drawerContent,
  drawerOpen = false,
  onDrawerClose,
}: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--background)]">
      {/* Sidebar */}
      <SidebarNav
        activeId={activeId}
        onNavigate={onNavigate}
        collapsed={sidebarCollapsed}
      />

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top status bar */}
        <TopStatusBar />

        {/* Sub-header with collapse toggle */}
        <div className="flex h-8 flex-shrink-0 items-center gap-2 border-b border-[var(--border)] bg-[var(--background)] px-3">
          <button
            onClick={() => setSidebarCollapsed((v) => !v)}
            className="flex h-6 w-6 items-center justify-center rounded text-[var(--muted-foreground)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <PanelLeftOpen size={13} /> : <PanelLeftClose size={13} />}
          </button>
          {/* Breadcrumb slot */}
          <div id="breadcrumb-slot" className="flex min-w-0 flex-1 items-center text-[11px] text-[var(--muted-foreground)]" />
        </div>

        {/* Content row */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Main canvas */}
          <main
            id="main-content"
            className={cn(
              "flex-1 overflow-y-auto",
              drawerOpen && "flex-[0_0_auto] w-[calc(100%-360px)]"
            )}
            aria-label="Main content"
          >
            {children}
          </main>

          {/* Contextual drawer */}
          {drawerOpen && drawerContent && (
            <aside
              className="flex w-[360px] flex-shrink-0 flex-col overflow-y-auto border-l border-[var(--border)] bg-[var(--card)]"
              aria-label="Contextual detail drawer"
            >
              {/* Drawer header */}
              <div className="flex h-10 flex-shrink-0 items-center justify-between border-b border-[var(--border)] px-4">
                <span className="text-[12px] font-medium text-[var(--foreground)]">Detail</span>
                {onDrawerClose && (
                  <button
                    onClick={onDrawerClose}
                    className="rounded p-1 text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                    aria-label="Close drawer"
                  >
                    <svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 1l12 12M13 1L1 13" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex-1 overflow-y-auto p-4">{drawerContent}</div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
