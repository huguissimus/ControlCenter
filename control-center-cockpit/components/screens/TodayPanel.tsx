"use client";

import { lanes, blockers, nextActions, operatingStatus } from "@/lib/fixtures";
import { StatusPill, laneStatusVariant, blockerVariant } from "@/components/primitives/StatusPill";
import { PanelCard, SectionHeader, PanelRow, Divider, MetaLabel } from "@/components/primitives/SectionHeader";
import { EmptyState } from "@/components/primitives/StateViews";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Database,
  Info,
  Lock,
  Shield,
  XCircle,
} from "lucide-react";

interface TodayPanelProps {
  onNavigateLanes?: () => void;
  onNavigateBlockers?: () => void;
  onNavigateEvidence?: () => void;
  onNavigatePermissions?: () => void;
}

export function TodayPanel({
  onNavigateLanes,
  onNavigateBlockers,
  onNavigateEvidence,
  onNavigatePermissions,
}: TodayPanelProps) {
  const todayLane = lanes.find((l) => l.id === "today")!;
  const activeBlockers = blockers.filter((b) => !b.isHistorical);
  const activeNextActions = nextActions;

  const statusCards = [
    {
      label: "Operating mode",
      value: operatingStatus.mode,
      icon: Lock,
      variant: "info" as const,
      sub: operatingStatus.pass,
    },
    {
      label: "Permission posture",
      value: "Prepare only",
      icon: Shield,
      variant: "warn" as const,
      sub: "No autonomous execution",
    },
    {
      label: "External effects",
      value: "False",
      icon: XCircle,
      variant: "ok" as const,
      sub: "Gate C/D/X blocked",
    },
    {
      label: "Data mode",
      value: operatingStatus.dataMode,
      icon: Database,
      variant: "neutral" as const,
      sub: "Freshness review required for promotion",
    },
  ];

  return (
    <div className="flex h-full flex-col gap-0">
      {/* Page header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[14px] font-semibold text-[var(--foreground)]">Today</h1>
            <StatusPill variant={laneStatusVariant(todayLane.status)} label={todayLane.status} />
          </div>
          <p className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">
            {todayLane.postureSummary}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={11} className="text-[var(--muted-foreground)]" aria-hidden />
          <span className="text-[10px] text-[var(--muted-foreground)] tabular-nums" suppressHydrationWarning>
            {new Date(todayLane.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-5 p-5 xl:grid-cols-3">

          {/* Column 1 & 2: main content */}
          <div className="flex flex-col gap-5 xl:col-span-2">

            {/* Status cards row */}
            <section aria-label="Operating status overview">
              <MetaLabel className="mb-2 block">Current posture</MetaLabel>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {statusCards.map((card) => {
                  const Icon = card.icon;
                  const variantBg: Record<string, string> = {
                    info: "border-[var(--status-info)]/20 bg-[var(--status-info)]/5",
                    warn: "border-[var(--status-warn)]/20 bg-[var(--status-warn)]/5",
                    ok: "border-[var(--status-ok)]/20 bg-[var(--status-ok)]/5",
                    neutral: "border-[var(--border)] bg-[var(--card)]",
                  };
                  const variantIconColor: Record<string, string> = {
                    info: "text-[var(--status-info-fg)]",
                    warn: "text-[var(--status-warn-fg)]",
                    ok: "text-[var(--status-ok-fg)]",
                    neutral: "text-[var(--muted-foreground)]",
                  };
                  return (
                    <div
                      key={card.label}
                      className={`rounded-md border p-3 ${variantBg[card.variant]}`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Icon size={12} className={variantIconColor[card.variant]} aria-hidden />
                        <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                          {card.label}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[13px] font-semibold text-[var(--foreground)]">
                        {card.value}
                      </p>
                      <p className="mt-0.5 text-[10px] text-[var(--muted-foreground)]">
                        {card.sub}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Active blockers */}
            <section aria-label="Active blockers">
              <div className="mb-3 flex items-center justify-between">
                <SectionHeader
                  title="Active Blockers"
                  count={activeBlockers.length}
                  description="Actions that are blocked, forbidden, stale, or gated."
                />
                {onNavigateBlockers && (
                  <button
                    onClick={onNavigateBlockers}
                    className="flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    aria-label="View all blockers"
                  >
                    View all <ChevronRight size={11} aria-hidden />
                  </button>
                )}
              </div>
              <PanelCard className="p-0">
                {activeBlockers.length === 0 ? (
                  <EmptyState
                    size="sm"
                    title="No active blockers"
                    description="All lanes are clear."
                  />
                ) : (
                  <ul role="list" className="divide-y divide-[var(--border)]">
                    {activeBlockers.map((b) => (
                      <li key={b.id}>
                        <PanelRow className="hover:bg-[var(--accent)]/30">
                          <div className="mt-0.5 flex-shrink-0">
                            {b.severity === "forbidden" ? (
                              <XCircle size={13} className="text-[var(--status-forbidden-fg)]" aria-label="Forbidden" />
                            ) : b.severity === "blocked" ? (
                              <AlertTriangle size={13} className="text-[var(--status-blocked-fg)]" aria-label="Blocked" />
                            ) : (
                              <Clock size={13} className="text-[var(--status-warn-fg)]" aria-label={b.severity} />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="truncate text-[12px] font-medium text-[var(--foreground)]">
                                {b.label}
                              </p>
                              <StatusPill variant={blockerVariant(b.severity)} label={b.severity} dot={false} />
                            </div>
                            <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--muted-foreground)]">
                              {b.reason}
                            </p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-[10px] text-[var(--muted-foreground)]">
                                {b.laneLabel}
                              </span>
                              <span className="text-[10px] text-[var(--muted-foreground)]" aria-hidden>·</span>
                              <span className="text-[10px] text-[var(--muted-foreground)]" suppressHydrationWarning>
                                since {new Date(b.since).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </PanelRow>
                      </li>
                    ))}
                  </ul>
                )}
              </PanelCard>
            </section>

            {/* Next safe actions */}
            <section aria-label="Next safe actions">
              <div className="mb-3 flex items-center justify-between">
                <SectionHeader
                  title="Next Safe Actions"
                  count={activeNextActions.length}
                  description="Reviewable actions. Prepare and review only — not approval or execution."
                />
              </div>
              <PanelCard className="p-0">
                {activeNextActions.length === 0 ? (
                  <EmptyState
                    size="sm"
                    title="No actions queued"
                    description="Nothing to prepare or review at this time."
                  />
                ) : (
                  <ul role="list" className="divide-y divide-[var(--border)]">
                    {activeNextActions.map((action) => (
                      <li key={action.id}>
                        <PanelRow className="hover:bg-[var(--accent)]/30">
                          <div className="mt-0.5 flex-shrink-0">
                            <ArrowRight size={12} className="text-[var(--status-info-fg)]" aria-hidden />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-[12px] font-medium text-[var(--foreground)]">
                                {action.label}
                              </p>
                              {action.requiresPermission && (
                                <StatusPill variant="warn" label="permission required" dot={false} />
                              )}
                              {action.requiresReview && (
                                <StatusPill variant="info" label="review required" dot={false} />
                              )}
                            </div>
                            <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--muted-foreground)]">
                              {action.description}
                            </p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-[10px] text-[var(--muted-foreground)]">
                                {action.laneLabel}
                              </span>
                              {action.isLocal && (
                                <>
                                  <span className="text-[10px] text-[var(--muted-foreground)]" aria-hidden>·</span>
                                  <span className="text-[10px] text-[var(--muted-foreground)]">local only</span>
                                </>
                              )}
                            </div>
                          </div>
                        </PanelRow>
                      </li>
                    ))}
                  </ul>
                )}
              </PanelCard>
            </section>
          </div>

          {/* Column 3: right sidebar summary */}
          <div className="flex flex-col gap-5">

            {/* Lane health summary */}
            <section aria-label="Lane health summary">
              <div className="mb-3 flex items-center justify-between">
                <MetaLabel>Lane health</MetaLabel>
                {onNavigateLanes && (
                  <button
                    onClick={onNavigateLanes}
                    className="flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    aria-label="View all lanes"
                  >
                    All lanes <ChevronRight size={11} aria-hidden />
                  </button>
                )}
              </div>
              <PanelCard className="p-0">
                <ul role="list" className="divide-y divide-[var(--border)]">
                  {lanes
                    .filter((l) => l.id !== "today")
                    .map((lane) => (
                      <li key={lane.id}>
                        <div className="flex items-center gap-3 px-3 py-2">
                          <StatusPill
                            variant={laneStatusVariant(lane.status)}
                            label={lane.status}
                            dot
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[11px] font-medium text-[var(--foreground)]">
                              {lane.label}
                            </p>
                            {lane.blockedCount > 0 && (
                              <p className="text-[10px] text-[var(--status-blocked-fg)]">
                                {lane.blockedCount} blocked
                              </p>
                            )}
                            {lane.reviewableCount > 0 && lane.blockedCount === 0 && (
                              <p className="text-[10px] text-[var(--muted-foreground)]">
                                {lane.reviewableCount} to review
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </PanelCard>
            </section>

            {/* Governance note */}
            <PanelCard className="border-[var(--status-info)]/20 bg-[var(--status-info)]/5">
              <div className="flex items-start gap-2">
                <Info size={12} className="mt-0.5 flex-shrink-0 text-[var(--status-info-fg)]" aria-hidden />
                <div>
                  <p className="text-[11px] font-semibold text-[var(--foreground)]">Governance reminder</p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {[
                      "UI visibility is not authority.",
                      "Evidence is not doctrine.",
                      "Prepare is not approval.",
                      "Local data is not live truth.",
                    ].map((note) => (
                      <li key={note} className="flex items-start gap-1.5 text-[10px] text-[var(--muted-foreground)]">
                        <CheckCircle2 size={9} className="mt-0.5 flex-shrink-0 text-[var(--status-ok-fg)]" aria-hidden />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </PanelCard>

            {/* Quick links */}
            <section aria-label="Quick navigation">
              <MetaLabel className="mb-2 block">Quick access</MetaLabel>
              <div className="flex flex-col gap-1">
                {[
                  { label: "View all blockers", action: onNavigateBlockers, variant: "blocked" as const },
                  { label: "Evidence / Archive", action: onNavigateEvidence, variant: "neutral" as const },
                  { label: "Permissions", action: onNavigatePermissions, variant: "warn" as const },
                ].map((link) => (
                  <button
                    key={link.label}
                    onClick={link.action}
                    className="flex items-center justify-between rounded border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-left text-[11px] text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]/60"
                  >
                    {link.label}
                    <ChevronRight size={11} className="text-[var(--muted-foreground)]" aria-hidden />
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
