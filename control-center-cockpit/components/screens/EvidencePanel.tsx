"use client";

import { evidenceRecords, freshnessRecords, type EvidenceRecord } from "@/lib/fixtures";
import { StatusPill, dataModeVariant } from "@/components/primitives/StatusPill";
import { PanelCard, MetaLabel } from "@/components/primitives/SectionHeader";
import { DataModeBadge } from "@/components/primitives/StatusPill";
import { AlertTriangle, Archive, CheckCircle2, Clock, FileText, Info, RefreshCw } from "lucide-react";

function EvidenceRow({ record }: { record: EvidenceRecord }) {
  const typeIcon: Record<string, React.ReactNode> = {
    audit: <CheckCircle2 size={12} className="text-[var(--status-ok-fg)]" aria-label="Audit" />,
    provenance: <FileText size={12} className="text-[var(--status-info-fg)]" aria-label="Provenance" />,
    reference: <Info size={12} className="text-[var(--status-warn-fg)]" aria-label="Reference" />,
    archive: <Archive size={12} className="text-[var(--muted-foreground)]" aria-label="Archive" />,
  };

  return (
    <li className="px-4 py-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0">
          {typeIcon[record.type]}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[12px] font-medium text-[var(--foreground)]">{record.label}</p>
            <DataModeBadge mode={record.sourceMode} />
            {!record.freshnessReviewed && (
              <StatusPill variant="warn" label="freshness review required" dot={false} />
            )}
            {record.isCurrent && record.freshnessReviewed && (
              <StatusPill variant="ok" label="current truth" dot={false} />
            )}
            {!record.isCurrent && (
              <StatusPill variant="stale" label="historical / not promoted" dot={false} />
            )}
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted-foreground)]">
            {record.summary}
          </p>
          <div className="mt-1.5 flex items-center gap-3 text-[10px] text-[var(--muted-foreground)]">
            <span>{record.laneLabel}</span>
            <span aria-hidden>·</span>
            <span suppressHydrationWarning>{new Date(record.createdAt).toLocaleDateString()}</span>
            <span aria-hidden>·</span>
            <span className="capitalize">{record.type}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export function EvidencePanel() {
  const currentRecords = evidenceRecords.filter((r) => r.isCurrent && r.freshnessReviewed);
  const pendingReview = evidenceRecords.filter((r) => !r.freshnessReviewed && !r.isCurrent);
  const archiveRecords = evidenceRecords.filter((r) => !r.isCurrent && r.freshnessReviewed);

  return (
    <div className="flex h-full flex-col">
      {/* Page header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3">
        <div>
          <h1 className="text-[14px] font-semibold text-[var(--foreground)]">Evidence / Archive</h1>
          <p className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">
            Evidence supports decisions. Archive preserves history. Neither is doctrine or current truth without freshness review.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Main evidence table */}
          <div className="xl:col-span-2">

            {/* Governance note */}
            <div className="mb-4 flex items-start gap-2 rounded-md border border-[var(--status-info)]/20 bg-[var(--status-info)]/5 px-4 py-3">
              <Info size={12} className="mt-0.5 flex-shrink-0 text-[var(--status-info-fg)]" aria-hidden />
              <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)]">
                <strong className="text-[var(--foreground)]">Evidence is not doctrine.</strong>{" "}
                Imported, fixture, and generated records must be freshness-reviewed before being treated as current truth.
                Automations rationale is available as context only.
              </p>
            </div>

            {/* Pending freshness review */}
            {pendingReview.length > 0 && (
              <section className="mb-5" aria-label="Pending freshness review">
                <div className="mb-2 flex items-center gap-2">
                  <MetaLabel>Pending freshness review</MetaLabel>
                  <AlertTriangle size={11} className="text-[var(--status-warn-fg)]" aria-hidden />
                </div>
                <PanelCard className="border-[var(--status-warn)]/20 p-0">
                  <ul role="list" className="divide-y divide-[var(--border)]">
                    {pendingReview.map((r) => <EvidenceRow key={r.id} record={r} />)}
                  </ul>
                </PanelCard>
              </section>
            )}

            {/* Current truth records */}
            {currentRecords.length > 0 && (
              <section className="mb-5" aria-label="Freshness-reviewed records">
                <div className="mb-2 flex items-center gap-2">
                  <MetaLabel>Freshness-reviewed</MetaLabel>
                  <CheckCircle2 size={11} className="text-[var(--status-ok-fg)]" aria-hidden />
                </div>
                <PanelCard className="border-[var(--status-ok)]/15 p-0">
                  <ul role="list" className="divide-y divide-[var(--border)]">
                    {currentRecords.map((r) => <EvidenceRow key={r.id} record={r} />)}
                  </ul>
                </PanelCard>
              </section>
            )}

            {/* Archive */}
            {archiveRecords.length > 0 && (
              <section aria-label="Archive records">
                <div className="mb-2 flex items-center gap-2">
                  <MetaLabel>Archive</MetaLabel>
                  <Archive size={11} className="text-[var(--muted-foreground)]" aria-hidden />
                </div>
                <PanelCard className="p-0">
                  <ul role="list" className="divide-y divide-[var(--border)]">
                    {archiveRecords.map((r) => <EvidenceRow key={r.id} record={r} />)}
                  </ul>
                </PanelCard>
              </section>
            )}
          </div>

          {/* Freshness ledger sidebar */}
          <div>
            <section aria-label="Freshness ledger">
              <div className="mb-3 flex items-center gap-2">
                <MetaLabel>Freshness ledger</MetaLabel>
                <RefreshCw size={11} className="text-[var(--muted-foreground)]" aria-hidden />
              </div>
              <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-3">
                <p className="mb-3 text-[11px] leading-relaxed text-[var(--muted-foreground)]">
                  Freshness review is required only for current-truth promotion. Automations rationale is available as context without review.
                </p>
                <ul role="list" className="flex flex-col gap-2">
                  {freshnessRecords.map((fr) => (
                    <li key={fr.id} className="rounded border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[11px] font-medium text-[var(--foreground)]">{fr.label}</p>
                        <DataModeBadge mode={fr.sourceMode} />
                      </div>
                      {fr.promotionCandidate && (
                        <div className="mt-1 flex items-center gap-1">
                          <AlertTriangle size={9} className="text-[var(--status-warn-fg)]" aria-hidden />
                          <span className="text-[10px] text-[var(--status-warn-fg)]">Promotion candidate</span>
                        </div>
                      )}
                      {fr.lastReviewed ? (
                        <div className="mt-1 flex items-center gap-1">
                          <CheckCircle2 size={9} className="text-[var(--status-ok-fg)]" aria-hidden />
                          <span className="text-[10px] text-[var(--status-ok-fg)]" suppressHydrationWarning>
                            Reviewed {new Date(fr.lastReviewed).toLocaleDateString()}
                          </span>
                        </div>
                      ) : (
                        <div className="mt-1 flex items-center gap-1">
                          <Clock size={9} className="text-[var(--muted-foreground)]" aria-hidden />
                          <span className="text-[10px] text-[var(--muted-foreground)]">Not yet reviewed</span>
                        </div>
                      )}
                      <p className="mt-1 text-[10px] leading-relaxed text-[var(--muted-foreground)]">{fr.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
