"use client";

import { cn } from "@/lib/utils";
import { operatingStatus } from "@/lib/fixtures";
import { AlertTriangle, Database, Lock, Shield, Wifi, WifiOff } from "lucide-react";

interface TopStatusBarProps {
  className?: string;
}

export function TopStatusBar({ className }: TopStatusBarProps) {
  const { mode, pass, nextGate, permissionPosture, externalEffects, dataMode, freshness, controlPlane, operatorAuthenticated } = operatingStatus;

  return (
    <header
      className={cn(
        "flex h-10 flex-shrink-0 items-center gap-4 border-b border-[var(--topbar-border)] bg-[var(--topbar)] px-4",
        className
      )}
      aria-label="Operating status"
      role="banner"
    >
      {/* Left: mode + pass */}
      <div className="flex items-center gap-3">
        <StatusChip
          icon={<Lock size={10} />}
          label={mode}
          variant="info"
          aria-label={`Operating mode: ${mode}`}
        />
        <StatusChip
          icon={<Shield size={10} />}
          label={pass}
          variant="ok"
          aria-label={`Current pass: ${pass}`}
        />
        {!externalEffects && (
          <StatusChip
            icon={<WifiOff size={10} />}
            label="External effects: false"
            variant="neutral"
            aria-label="External effects are false"
          />
        )}
      </div>

      {/* Divider */}
      <div className="h-4 w-px bg-[var(--topbar-border)]" aria-hidden />

      {/* Center: permission posture */}
      <div className="flex min-w-0 flex-1 items-center gap-1.5 truncate">
        <AlertTriangle size={11} className="flex-shrink-0 text-[var(--status-warn-fg)]" aria-hidden />
        <span className="truncate text-[11px] text-[var(--topbar-foreground)]" aria-label={`Permission posture: ${permissionPosture}`}>
          {permissionPosture}
        </span>
      </div>

      {/* Right: data mode + freshness + control plane */}
      <div className="flex flex-shrink-0 items-center gap-3">
        <StatusChip
          icon={<Database size={10} />}
          label={`data: ${dataMode}`}
          variant="neutral"
          aria-label={`Data mode: ${dataMode}`}
        />
        <span
          className="hidden truncate text-[10px] text-[var(--topbar-foreground)] opacity-60 sm:block"
          title={freshness}
          aria-label={`Freshness: ${freshness}`}
        >
          {freshness}
        </span>
        <StatusChip
          icon={<Wifi size={10} />}
          label={operatorAuthenticated ? "operator: authenticated" : "operator: locked"}
          variant={operatorAuthenticated ? "ok" : "blocked"}
          aria-label={operatorAuthenticated ? "Operator authenticated" : "Operator locked"}
        />
      </div>
    </header>
  );
}

// Small inline chip used only in TopStatusBar
function StatusChip({
  icon,
  label,
  variant,
  "aria-label": ariaLabel,
}: {
  icon: React.ReactNode;
  label: string;
  variant: "ok" | "warn" | "blocked" | "info" | "neutral";
  "aria-label"?: string;
}) {
  const variantStyles: Record<string, string> = {
    ok: "bg-[var(--status-ok)]/20 text-[var(--status-ok-fg)] ring-[var(--status-ok)]/30",
    warn: "bg-[var(--status-warn)]/20 text-[var(--status-warn-fg)] ring-[var(--status-warn)]/30",
    blocked: "bg-[var(--status-blocked)]/20 text-[var(--status-blocked-fg)] ring-[var(--status-blocked)]/30",
    info: "bg-[var(--status-info)]/20 text-[var(--status-info-fg)] ring-[var(--status-info)]/30",
    neutral: "bg-[var(--muted)]/50 text-[var(--muted-foreground)] ring-[var(--border)]/50",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium ring-1",
        variantStyles[variant]
      )}
      aria-label={ariaLabel}
    >
      <span aria-hidden>{icon}</span>
      {label}
    </span>
  );
}
