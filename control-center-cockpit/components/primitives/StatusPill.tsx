import { cn } from "@/lib/utils";
import type { LaneStatus, BlockerSeverity, PermissionState, DataMode } from "@/lib/fixtures";

type PillVariant = "ok" | "warn" | "blocked" | "forbidden" | "gated" | "stale" | "info" | "neutral" | "prepare" | "approved" | "refused";

const variantMap: Record<PillVariant, { bg: string; text: string; ring: string; dot: string }> = {
  ok:        { bg: "bg-[var(--status-ok)]/15",        text: "text-[var(--status-ok-fg)]",        ring: "ring-[var(--status-ok)]/25",        dot: "bg-[var(--status-ok-fg)]" },
  warn:      { bg: "bg-[var(--status-warn)]/15",      text: "text-[var(--status-warn-fg)]",      ring: "ring-[var(--status-warn)]/25",      dot: "bg-[var(--status-warn-fg)]" },
  blocked:   { bg: "bg-[var(--status-blocked)]/15",   text: "text-[var(--status-blocked-fg)]",   ring: "ring-[var(--status-blocked)]/25",   dot: "bg-[var(--status-blocked-fg)]" },
  forbidden: { bg: "bg-[var(--status-forbidden)]/15", text: "text-[var(--status-forbidden-fg)]", ring: "ring-[var(--status-forbidden)]/25", dot: "bg-[var(--status-forbidden-fg)]" },
  gated:     { bg: "bg-[var(--status-warn)]/15",      text: "text-[var(--status-warn-fg)]",      ring: "ring-[var(--status-warn)]/25",      dot: "bg-[var(--status-warn-fg)]" },
  stale:     { bg: "bg-[var(--muted)]/60",            text: "text-[var(--muted-foreground)]",    ring: "ring-[var(--border)]/40",           dot: "bg-[var(--muted-foreground)]" },
  info:      { bg: "bg-[var(--status-info)]/15",      text: "text-[var(--status-info-fg)]",      ring: "ring-[var(--status-info)]/25",      dot: "bg-[var(--status-info-fg)]" },
  neutral:   { bg: "bg-[var(--muted)]/40",            text: "text-[var(--muted-foreground)]",    ring: "ring-[var(--border)]/30",           dot: "bg-[var(--muted-foreground)]" },
  prepare:   { bg: "bg-[var(--status-info)]/15",      text: "text-[var(--status-info-fg)]",      ring: "ring-[var(--status-info)]/25",      dot: "bg-[var(--status-info-fg)]" },
  approved:  { bg: "bg-[var(--status-ok)]/15",        text: "text-[var(--status-ok-fg)]",        ring: "ring-[var(--status-ok)]/25",        dot: "bg-[var(--status-ok-fg)]" },
  refused:   { bg: "bg-[var(--status-forbidden)]/15", text: "text-[var(--status-forbidden-fg)]", ring: "ring-[var(--status-forbidden)]/25", dot: "bg-[var(--status-forbidden-fg)]" },
};

export function laneStatusVariant(s: LaneStatus): PillVariant {
  const map: Record<LaneStatus, PillVariant> = {
    ok: "ok", review: "warn", blocked: "blocked", gated: "gated", stale: "stale",
  };
  return map[s];
}

export function blockerVariant(s: BlockerSeverity): PillVariant {
  const map: Record<BlockerSeverity, PillVariant> = {
    blocked: "blocked", forbidden: "forbidden", stale: "stale", gated: "gated",
  };
  return map[s];
}

export function permissionVariant(s: PermissionState): PillVariant {
  const map: Record<PermissionState, PillVariant> = {
    prepare: "prepare", "pending-review": "warn", approved: "approved",
    refused: "refused", blocked: "blocked", forbidden: "forbidden",
  };
  return map[s];
}

export function dataModeVariant(m: DataMode): PillVariant {
  const map: Record<DataMode, PillVariant> = {
    fixture: "neutral", "local-api": "info", generated: "neutral", imported: "warn",
  };
  return map[m];
}

interface StatusPillProps {
  variant: PillVariant;
  label: string;
  dot?: boolean;
  className?: string;
}

export function StatusPill({ variant, label, dot = true, className }: StatusPillProps) {
  const styles = variantMap[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-[11px] font-medium ring-1",
        styles.bg, styles.text, styles.ring,
        className
      )}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 flex-shrink-0 rounded-full", styles.dot)}
          aria-hidden
        />
      )}
      {label}
    </span>
  );
}

// Data mode badge
export function DataModeBadge({ mode }: { mode: DataMode }) {
  const labels: Record<DataMode, string> = {
    fixture: "fixture",
    "local-api": "local API",
    generated: "generated",
    imported: "imported",
  };
  return (
    <StatusPill variant={dataModeVariant(mode)} label={labels[mode]} dot={false} />
  );
}
