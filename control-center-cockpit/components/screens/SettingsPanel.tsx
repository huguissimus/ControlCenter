"use client";

import { operatingStatus } from "@/lib/fixtures";
import { PanelCard, MetaLabel } from "@/components/primitives/SectionHeader";
import { StatusPill } from "@/components/primitives/StatusPill";
import { CheckCircle2, Database, Lock, Server, Settings, Shield, Wifi, WifiOff } from "lucide-react";

function SettingRow({
  label,
  value,
  note,
  icon: Icon,
}: {
  label: string;
  value: string;
  note?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Icon size={13} className="mt-0.5 flex-shrink-0 text-[var(--muted-foreground)]" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-[var(--muted-foreground)]">{label}</p>
        <p className="mt-0.5 text-[12px] font-medium text-[var(--foreground)]">{value}</p>
        {note && <p className="mt-0.5 text-[10px] text-[var(--muted-foreground)]">{note}</p>}
      </div>
    </div>
  );
}

export function SettingsPanel() {
  return (
    <div className="flex h-full flex-col">
      {/* Page header */}
      <div className="flex items-center border-b border-[var(--border)] px-5 py-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[14px] font-semibold text-[var(--foreground)]">Settings</h1>
            <StatusPill variant="neutral" label="local mode" dot={false} />
          </div>
          <p className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">
            Environment configuration, data mode, and control-plane status. No external write controls.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

          {/* Operating environment */}
          <section aria-label="Operating environment">
            <MetaLabel className="mb-3 block">Operating environment</MetaLabel>
            <PanelCard>
              <div className="divide-y divide-[var(--border)]">
                <SettingRow
                  icon={Lock}
                  label="Operating mode"
                  value={operatingStatus.mode}
                  note="Private and local only. Not public-facing."
                />
                <SettingRow
                  icon={Shield}
                  label="Current pass"
                  value={operatingStatus.pass}
                  note={`Next gate: ${operatingStatus.nextGate}`}
                />
                <SettingRow
                  icon={Shield}
                  label="Permission posture"
                  value={operatingStatus.permissionPosture}
                />
                <SettingRow
                  icon={WifiOff}
                  label="External effects"
                  value={operatingStatus.externalEffects ? "True" : "False"}
                  note="Gate C/D/X blocked. No external actions."
                />
                <SettingRow
                  icon={Wifi}
                  label="Operator authentication"
                  value={operatingStatus.operatorAuthenticated ? "Authenticated" : "Locked"}
                />
                <SettingRow
                  icon={CheckCircle2}
                  label="Local writes"
                  value={operatingStatus.localWritesEnabled ? "Enabled" : "Disabled"}
                  note="Local private scope only. Audited."
                />
              </div>
            </PanelCard>
          </section>

          {/* Data mode and freshness */}
          <section aria-label="Data mode and freshness">
            <MetaLabel className="mb-3 block">Data mode and freshness</MetaLabel>
            <PanelCard>
              <div className="divide-y divide-[var(--border)]">
                <SettingRow
                  icon={Database}
                  label="Data mode"
                  value={operatingStatus.dataMode}
                  note="Static fixture data. Not live API truth. Freshness review required for promotion."
                />
                <SettingRow
                  icon={Database}
                  label="Freshness snapshot"
                  value={operatingStatus.freshness}
                  note="Automations rationale is available as context without freshness review."
                />
                <SettingRow
                  icon={Server}
                  label="Control plane"
                  value={operatingStatus.controlPlane}
                  note="Read-only. No browser execution controls."
                />
              </div>
            </PanelCard>
          </section>

          {/* Future IA note */}
          <div className="xl:col-span-2">
            <PanelCard className="border-[var(--status-info)]/15 bg-[var(--status-info)]/5">
              <div className="flex items-start gap-2">
                <Settings size={12} className="mt-0.5 flex-shrink-0 text-[var(--status-info-fg)]" aria-hidden />
                <div>
                  <p className="text-[11px] font-semibold text-[var(--foreground)]">Settings — future IA</p>
                  <p className="mt-1 text-[10px] leading-relaxed text-[var(--muted-foreground)]">
                    A dedicated Settings route was not found in the current app composition.
                    This surface is mapped from <code className="rounded bg-[var(--muted)] px-1 py-0.5 text-[10px]">OperatingModePanel</code>,{" "}
                    <code className="rounded bg-[var(--muted)] px-1 py-0.5 text-[10px]">LocalControlPlaneStatusPanel</code>,
                    the private operator gate, and data-mode labels.
                    Future work should reconcile left-sidebar IA and the lane-nav roles.
                  </p>
                </div>
              </div>
            </PanelCard>
          </div>
        </div>
      </div>
    </div>
  );
}
