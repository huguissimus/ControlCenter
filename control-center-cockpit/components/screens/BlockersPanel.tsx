"use client";

import { blockers } from "@/lib/fixtures";
import { StatusPill, blockerVariant } from "@/components/primitives/StatusPill";
import { PanelCard, MetaLabel } from "@/components/primitives/SectionHeader";
import { EmptyState } from "@/components/primitives/StateViews";
import { AlertTriangle, Archive, Clock, XCircle } from "lucide-react";

function BlockerIcon({ severity }: { severity: string }) {
  if (severity === "forbidden") {
    return <XCircle size={14} className="text-[var(--status-forbidden-fg)]" aria-label="Forbidden" />;
  }
  if (severity === "blocked") {
    return <AlertTriangle size={14} className="text-[var(--status-blocked-fg)]" aria-label="Blocked" />;
  }
  if (severity === "gated") {
    return <Clock size={14} className="text-[var(--status-warn-fg)]" aria-label="Gated" />;
  }
  // stale
  return <Clock size={14} className="text-[var(--muted-foreground)]" aria-label="Stale" />;
}

export function BlockersPanel() {
  const activeBlockers = blockers.filter((b) => !b.isHistorical);
  const historicalBlockers = blockers.filter((b) => b.isHistorical);

  const bySeverity: Record<string, typeof blockers> = {};
  for (const b of activeBlockers) {
    if (!bySeverity[b.severity]) bySeverity[b.severity] = [];
    bySeverity[b.severity].push(b);
  }

  const severityOrder = ["forbidden", "blocked", "gated", "stale"] as const;

  return (
    <div className="flex h-full flex-col">
      {/* Page header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[14px] font-semibold text-[var(--foreground)]">Blockers</h1>
            <span className="rounded bg-[var(--status-blocked)]/20 px-1.5 py-0.5 text-[11px] font-medium text-[var(--status-blocked-fg)] ring-1 ring-[var(--status-blocked)]/30">
              {activeBlockers.length} active
            </span>
          </div>
          <p className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">
            Active blockers are separated from historical/archived blocked evidence.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Active blockers — main column */}
          <div className="xl:col-span-2">
            <section aria-label="Active blockers">
              <MetaLabel className="mb-3 block">Active — {activeBlockers.length}</MetaLabel>
              {activeBlockers.length === 0 ? (
                <EmptyState
                  title="No active blockers"
                  description="All lanes are clear. No actions are blocked, forbidden, stale, or gated."
                />
              ) : (
                <div className="flex flex-col gap-3">
                  {severityOrder.map((severity) => {
                    const items = bySeverity[severity];
                    if (!items?.length) return null;
                    return (
                      <section key={severity} aria-label={`${severity} blockers`}>
                        <MetaLabel className="mb-2 block capitalize">{severity} ({items.length})</MetaLabel>
                        <PanelCard className="p-0">
                          <ul role="list" className="divide-y divide-[var(--border)]">
                            {items.map((b) => (
                              <li key={b.id} className="px-4 py-3">
                                <div className="flex items-start gap-3">
                                  <div className="mt-0.5 flex-shrink-0">
                                    <BlockerIcon severity={b.severity} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <p className="text-[12px] font-medium text-[var(--foreground)]">
                                        {b.label}
                                      </p>
                                      <StatusPill variant={blockerVariant(b.severity)} label={b.severity} dot={false} />
                                    </div>
                                    <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted-foreground)]">
                                      {b.reason}
                                    </p>
                                    <div className="mt-1.5 flex items-center gap-3 text-[10px] text-[var(--muted-foreground)]">
                                      <span>{b.laneLabel}</span>
                                      <span aria-hidden>·</span>
                                      <span suppressHydrationWarning>Since {new Date(b.since).toLocaleDateString()}</span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </PanelCard>
                      </section>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          {/* Historical / archive column */}
          <div>
            <section aria-label="Historical blocked evidence">
              <div className="mb-3 flex items-center gap-2">
                <MetaLabel>Historical / Archive</MetaLabel>
                <Archive size={11} className="text-[var(--muted-foreground)]" aria-hidden />
              </div>
              <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-3">
                <p className="mb-3 text-[11px] leading-relaxed text-[var(--muted-foreground)]">
                  Historical blocked evidence is preserved for audit and provenance. It is not an active blocker.
                </p>
                {historicalBlockers.length === 0 ? (
                  <EmptyState
                    size="sm"
                    title="No historical records"
                    description="No archived blocked evidence."
                  />
                ) : (
                  <ul role="list" className="flex flex-col gap-2">
                    {historicalBlockers.map((b) => (
                      <li key={b.id} className="rounded border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
                        <div className="flex items-start gap-2">
                          <Archive size={11} className="mt-0.5 flex-shrink-0 text-[var(--muted-foreground)]" aria-hidden />
                          <div className="min-w-0">
                            <p className="text-[11px] font-medium text-[var(--foreground)]">{b.label}</p>
                            <p className="mt-0.5 text-[10px] leading-relaxed text-[var(--muted-foreground)]">{b.reason}</p>
                            <div className="mt-1 flex items-center gap-2 text-[10px] text-[var(--muted-foreground)]">
                              <span>{b.laneLabel}</span>
                              <span aria-hidden>·</span>
                              <span suppressHydrationWarning>{new Date(b.since).toLocaleDateString()}</span>
                              <StatusPill variant="stale" label="archived" dot={false} />
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
