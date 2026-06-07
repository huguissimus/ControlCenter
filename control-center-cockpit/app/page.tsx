"use client";

import { useState } from "react";
import { AppShell } from "@/components/shell/AppShell";
import type { NavItemId } from "@/components/shell/SidebarNav";
import { TodayPanel } from "@/components/screens/TodayPanel";
import { LanesPanel } from "@/components/screens/LanesPanel";
import { BlockersPanel } from "@/components/screens/BlockersPanel";
import { EvidencePanel } from "@/components/screens/EvidencePanel";
import { PermissionsPanel } from "@/components/screens/PermissionsPanel";
import { SettingsPanel } from "@/components/screens/SettingsPanel";

export default function Page() {
  const [activeId, setActiveId] = useState<NavItemId>("today");

  function handleNavigate(id: NavItemId) {
    setActiveId(id);
  }

  function renderScreen() {
    switch (activeId) {
      case "today":
        return (
          <TodayPanel
            onNavigateLanes={() => handleNavigate("lanes")}
            onNavigateBlockers={() => handleNavigate("blockers")}
            onNavigateEvidence={() => handleNavigate("evidence")}
            onNavigatePermissions={() => handleNavigate("permissions")}
          />
        );
      case "lanes":
        return <LanesPanel onViewEvidence={() => handleNavigate("evidence")} />;
      case "blockers":
        return <BlockersPanel />;
      case "evidence":
        return <EvidencePanel />;
      case "permissions":
        return <PermissionsPanel />;
      case "settings":
        return <SettingsPanel />;
      default:
        return (
          <TodayPanel
            onNavigateLanes={() => handleNavigate("lanes")}
            onNavigateBlockers={() => handleNavigate("blockers")}
            onNavigateEvidence={() => handleNavigate("evidence")}
            onNavigatePermissions={() => handleNavigate("permissions")}
          />
        );
    }
  }

  return (
    <AppShell activeId={activeId} onNavigate={handleNavigate}>
      {renderScreen()}
    </AppShell>
  );
}
