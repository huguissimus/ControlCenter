"use client";

import { lanes, blockers, type Lane } from "@/lib/fixtures";
import { StatusPill, laneStatusVariant, blockerVariant } from "@/components/primitives/StatusPill";
import { PanelCard, SectionHeader, MetaLabel } from "@/components/primitives/SectionHeader";
import { AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, Clock, Link2, XCircle } from "lucide-react";

interface LaneCardProps {
  lane: Lane;
  onViewEvidence?: () => void;
}

function LaneCard({ lane, onViewEvidence }: LaneCardProps) {
  const laneBlockers = blockers.filter((b) => b.laneId === lane.id && !b.isHistorical);

  const statusBorder: Record<string, string> = {
    ok: "border-[var(--status-ok)]/20",
    review: "border-[var(--status-warn)]/20",
    blocked: "border-[var(--status-blocked)]/20",
    gated: "border-[var(--status-warn)]/20",
    stale: "border-[var(--border)]",
  };

  return (
    <article
      className={`rounded-md border bg-[var(--card)] ${statusBorder[lane.status]}`}
      aria-label={`Lane: ${lane.label}`}
    >
      {/* Lane header */}
      <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-[13px] font-semibold text-[var(--foreground)]">{lane.label}</h2>
            <StatusPill variant={laneStatusVariant(lane.status)} label={lane.status} />
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted-foreground)]">
            {lane.postureSummary}
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-3 text-[10px] text-[var(--muted-foreground)]">
          {lane.reviewableCount > 0 && (
            <span className="flex items-center gap-1">
              <span className="tabular-nums font-medium text-[var(--status-warn-fg)]">{lane.reviewableCount}</span>
              {" "}to review
            </span>
          )}
          {lane.blockedCount > 0 && (
            <span className="flex items-center gap-1">
              <span className="tabular-nums font-medium text-[var(--status-blocked-fg)]">{lane.blockedCount}</span>
              {" "}blocked
            </span>
          )}
        </div>
      </div>

      {/* Lane body */}
      <div className="divide-y divide-[var(--border)]">
        {/* Next safe action */}
        {lane.nextSafeAction && (
          <div className="flex items-start gap-3 px-4 py-3">
            <ArrowRight size={12} className="mt-0.5 flex-shrink-0 text-[var(--status-info-fg)]" aria-hidden />
            <div className="min-w-0">
              <MetaLabel>Next safe action</MetaLabel>
              <p className="mt-1 text-[11px] leading-relaxed text-[var(--foreground)]">
                {lane.nextSafeAction}
              </p>
            </div>
          </div>
        )}

        {/* Blockers for this lane */}
        {laneBlockers.length > 0 && (
          <div className="px-4 py-3">
            <MetaLabel className="mb-2 block">Active blockers</MetaLabel>
            <ul className="flex flex-col gap-1.5" role="list">
              {laneBlockers.map((b) => (
                <li key={b.id} className="flex items-start gap-2">
                  {b.severity === "forbidden" ? (
                    <XCircle size={11} className="mt-0.5 flex-shrink-0 text-[var(--status-forbidden-fg)]" aria-label="Forbidden" />
                  ) : b.severity === "gated" ? (
                    <Clock size={11} className="mt-0.5 flex-shrink-0 text-[var(--status-warn-fg)]" aria-label="Gated" />
                  ) : (
                    <AlertTriangle size={11} className="mt-0.5 flex-shrink-0 text-[var(--status-blocked-fg)]" aria-label="Blocked" />
                  )}
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-[var(--foreground)]">{b.label}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">{b.reason}</p>
                  </div>
                  <StatusPill variant={blockerVariant(b.severity)} label={b.severity} dot={false} className="ml-auto flex-shrink-0 self-start" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {lane.blockedCount === 0 && !lane.nextSafeAction && lane.status === "ok" && (
          <div className="flex items-center gap-2 px-4 py-3">
            <CheckCircle2 size={11} className="text-[var(--status-ok-fg)]" aria-hidden />
            <span className="text-[11px] text-[var(--muted-foreground)]">No action required.</span>
          </div>
        )}
      </div>

      {/* Lane footer */}
      <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2">
        <span className="text-[10px] text-[var(--muted-foreground)]">
          <span suppressHydrationWarning>Updated {new Date(lane.lastUpdated).toLocaleDateString()}</span>
        </span>
        {lane.evidenceLink && (
          <button
            onClick={onViewEvidence}
            className="flex items-center gap-1 text-[10px] text-[var(--status-info-fg)] hover:underline"
            aria-label={`View evidence for ${lane.label}`}
          >
            <Link2 size={10} aria-hidden />
            Evidence
          </button>
        )}
      </div>
    </article>
  );
}

interface LanesPanelProps {
  onViewEvidence?: () => void;
}

export function LanesPanel({ onViewEvidence }: LanesPanelProps) {
  const allLanes = lanes.filter((l) => l.id !== "today");
  const needsAttention = allLanes.filter((l) => l.status !== "ok");
  const healthy = allLanes.filter((l) => l.status === "ok");

  return (
    <div className="flex h-full flex-col">
      {/* Page header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3">
        <div>
          <h1 className="text-[14px] font-semibold text-[var(--foreground)]">Lanes</h1>
          <p className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">
            Current posture, reviewable work, blockers, and next safe action per lane.
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[var(--muted-foreground)]">
          <span>
            <span className="font-medium tabular-nums text-[var(--status-warn-fg)]">{needsAttention.length}</span>
            {" "}need attention
          </span>
          <span>
            <span className="font-medium tabular-nums text-[var(--status-ok-fg)]">{healthy.length}</span>
            {" "}healthy
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {/* Needs attention */}
        {needsAttention.length > 0 && (
          <section className="mb-6" aria-label="Lanes needing attention">
            <MetaLabel className="mb-3 block">Needs attention ({needsAttention.length})</MetaLabel>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {needsAttention.map((lane) => (
                <LaneCard key={lane.id} lane={lane} onViewEvidence={onViewEvidence} />
              ))}
            </div>
          </section>
        )}

        {/* Healthy lanes */}
        {healthy.length > 0 && (
          <section aria-label="Healthy lanes">
            <MetaLabel className="mb-3 block">Healthy ({healthy.length})</MetaLabel>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {healthy.map((lane) => (
                <LaneCard key={lane.id} lane={lane} onViewEvidence={onViewEvidence} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
