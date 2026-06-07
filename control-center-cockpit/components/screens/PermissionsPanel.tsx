"use client";

import { permissionItems, type PermissionItem } from "@/lib/fixtures";
import { StatusPill, permissionVariant } from "@/components/primitives/StatusPill";
import { PanelCard, MetaLabel } from "@/components/primitives/SectionHeader";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Info,
  Lock,
  Shield,
  XCircle,
} from "lucide-react";

function PermissionStateIcon({ state }: { state: PermissionItem["state"] }) {
  switch (state) {
    case "prepare":
      return <Clock size={14} className="text-[var(--status-info-fg)]" aria-label="Prepare" />;
    case "pending-review":
      return <AlertTriangle size={14} className="text-[var(--status-warn-fg)]" aria-label="Pending review" />;
    case "approved":
      return <CheckCircle2 size={14} className="text-[var(--status-ok-fg)]" aria-label="Approved" />;
    case "refused":
      return <XCircle size={14} className="text-[var(--status-forbidden-fg)]" aria-label="Refused" />;
    case "blocked":
      return <AlertTriangle size={14} className="text-[var(--status-blocked-fg)]" aria-label="Blocked" />;
    case "forbidden":
      return <XCircle size={14} className="text-[var(--status-forbidden-fg)]" aria-label="Forbidden" />;
  }
}

const stateLabels: Record<PermissionItem["state"], string> = {
  prepare: "Prepare — not approved",
  "pending-review": "Pending human review",
  approved: "Approved",
  refused: "Refused",
  blocked: "Blocked",
  forbidden: "Forbidden — not permitted",
};

const stateBorder: Record<PermissionItem["state"], string> = {
  prepare: "border-[var(--status-info)]/15",
  "pending-review": "border-[var(--status-warn)]/20",
  approved: "border-[var(--status-ok)]/20",
  refused: "border-[var(--status-forbidden)]/20",
  blocked: "border-[var(--status-blocked)]/20",
  forbidden: "border-[var(--status-forbidden)]/20",
};

function PermissionCard({ item }: { item: PermissionItem }) {
  return (
    <article
      className={`rounded-md border bg-[var(--card)] ${stateBorder[item.state]}`}
      aria-label={`Permission item: ${item.label}`}
    >
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="mt-0.5 flex-shrink-0">
          <PermissionStateIcon state={item.state} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[12px] font-medium text-[var(--foreground)]">{item.label}</p>
            <StatusPill variant={permissionVariant(item.state)} label={stateLabels[item.state]} dot={false} />
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted-foreground)]">
            {item.description}
          </p>

          {/* Gate and scope row */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 rounded bg-[var(--surface)] px-1.5 py-0.5 text-[10px] text-[var(--muted-foreground)] ring-1 ring-[var(--border)]">
              <Shield size={9} aria-hidden />
              {item.gate}
            </span>
            {item.localScope && (
              <span className="flex items-center gap-1 rounded bg-[var(--status-ok)]/10 px-1.5 py-0.5 text-[10px] text-[var(--status-ok-fg)] ring-1 ring-[var(--status-ok)]/20">
                <Lock size={9} aria-hidden />
                local scope
              </span>
            )}
            {item.externalEffect && (
              <span className="flex items-center gap-1 rounded bg-[var(--status-blocked)]/10 px-1.5 py-0.5 text-[10px] text-[var(--status-blocked-fg)] ring-1 ring-[var(--status-blocked)]/20">
                <AlertTriangle size={9} aria-hidden />
                external effect
              </span>
            )}
            {!item.externalEffect && (
              <span className="flex items-center gap-1 rounded bg-[var(--muted)]/40 px-1.5 py-0.5 text-[10px] text-[var(--muted-foreground)] ring-1 ring-[var(--border)]/30">
                external effects: false
              </span>
            )}
            {item.audited && (
              <span className="flex items-center gap-1 rounded bg-[var(--muted)]/40 px-1.5 py-0.5 text-[10px] text-[var(--muted-foreground)] ring-1 ring-[var(--border)]/30">
                <CheckCircle2 size={9} aria-hidden />
                audited
              </span>
            )}
          </div>

          {/* Timestamps */}
          <div className="mt-2 flex items-center gap-3 text-[10px] text-[var(--muted-foreground)]">
            <span suppressHydrationWarning>Requested {new Date(item.requestedAt).toLocaleDateString()}</span>
            {item.reviewedAt && (
              <>
                <span aria-hidden>·</span>
                <span suppressHydrationWarning>Reviewed {new Date(item.reviewedAt).toLocaleDateString()}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function CommandGateTable() {
  const gates = [
    {
      gate: "Gate A",
      label: "Local only",
      description: "Approved local run within narrow implemented scope. Audited.",
      state: "active" as const,
    },
    {
      gate: "Gate B",
      label: "Human review required",
      description: "Requires human operator review and confirmation before any action.",
      state: "pending" as const,
    },
    {
      gate: "Gate C",
      label: "Blocked",
      description: "No implemented route. External effects blocked.",
      state: "blocked" as const,
    },
    {
      gate: "Gate D",
      label: "Forbidden",
      description: "Not permitted. No authorization. External effects remain false.",
      state: "forbidden" as const,
    },
    {
      gate: "Gate X",
      label: "Blocked",
      description: "Catch-all for unimplemented external-effect actions.",
      state: "blocked" as const,
    },
  ];

  const stateColors: Record<string, string> = {
    active: "text-[var(--status-ok-fg)]",
    pending: "text-[var(--status-warn-fg)]",
    blocked: "text-[var(--status-blocked-fg)]",
    forbidden: "text-[var(--status-forbidden-fg)]",
  };
  const stateIcons: Record<string, React.ReactNode> = {
    active: <CheckCircle2 size={11} aria-label="Active" />,
    pending: <Clock size={11} aria-label="Pending" />,
    blocked: <AlertTriangle size={11} aria-label="Blocked" />,
    forbidden: <XCircle size={11} aria-label="Forbidden" />,
  };

  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--card)] overflow-hidden">
      <table className="w-full text-[11px]" aria-label="Command gate status">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--surface)]">
            <th scope="col" className="px-3 py-2 text-left font-semibold text-[var(--muted-foreground)]">Gate</th>
            <th scope="col" className="px-3 py-2 text-left font-semibold text-[var(--muted-foreground)]">Status</th>
            <th scope="col" className="px-3 py-2 text-left font-semibold text-[var(--muted-foreground)]">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {gates.map((g) => (
            <tr key={g.gate}>
              <td className="px-3 py-2 font-medium text-[var(--foreground)]">{g.gate}</td>
              <td className="px-3 py-2">
                <span className={`flex items-center gap-1 ${stateColors[g.state]}`}>
                  {stateIcons[g.state]}
                  {g.label}
                </span>
              </td>
              <td className="px-3 py-2 text-[var(--muted-foreground)]">{g.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PermissionsPanel() {
  const pendingItems = permissionItems.filter(
    (i) => i.state === "prepare" || i.state === "pending-review"
  );
  const resolvedItems = permissionItems.filter(
    (i) => i.state === "approved" || i.state === "refused" || i.state === "blocked" || i.state === "forbidden"
  );

  return (
    <div className="flex h-full flex-col">
      {/* Page header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[14px] font-semibold text-[var(--foreground)]">Permissions</h1>
            {pendingItems.length > 0 && (
              <span className="rounded bg-[var(--status-warn)]/20 px-1.5 py-0.5 text-[11px] font-medium text-[var(--status-warn-fg)] ring-1 ring-[var(--status-warn)]/30">
                {pendingItems.length} pending
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">
            Permission-gated states are not executed states. Prepare is not approval. Approved is not external execution.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Permission items — main column */}
          <div className="xl:col-span-2 flex flex-col gap-6">

            {/* Governance note */}
            <div className="flex items-start gap-2 rounded-md border border-[var(--status-warn)]/20 bg-[var(--status-warn)]/5 px-4 py-3">
              <Info size={12} className="mt-0.5 flex-shrink-0 text-[var(--status-warn-fg)]" aria-hidden />
              <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)]">
                <strong className="text-[var(--foreground)]">Permission-gated is not executed.</strong>{" "}
                Destructive and external-effect actions remain blocked or gated unless separately implemented and exactly approved.
                Gate C/D/X and all external effects remain false.
              </p>
            </div>

            {/* Pending / active */}
            {pendingItems.length > 0 && (
              <section aria-label="Pending permission items">
                <MetaLabel className="mb-3 block">Pending / active ({pendingItems.length})</MetaLabel>
                <div className="flex flex-col gap-3">
                  {pendingItems.map((item) => (
                    <PermissionCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}

            {/* Resolved */}
            {resolvedItems.length > 0 && (
              <section aria-label="Resolved permission items">
                <MetaLabel className="mb-3 block">Resolved / historical ({resolvedItems.length})</MetaLabel>
                <div className="flex flex-col gap-3">
                  {resolvedItems.map((item) => (
                    <PermissionCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Gate reference sidebar */}
          <div className="flex flex-col gap-5">
            <section aria-label="Command gate reference">
              <MetaLabel className="mb-3 block">Command gate reference</MetaLabel>
              <CommandGateTable />
            </section>

            <PanelCard className="border-[var(--status-blocked)]/15 bg-[var(--status-blocked)]/5">
              <div className="flex items-start gap-2">
                <AlertTriangle size={12} className="mt-0.5 flex-shrink-0 text-[var(--status-blocked-fg)]" aria-hidden />
                <div>
                  <p className="text-[11px] font-semibold text-[var(--foreground)]">External effects</p>
                  <p className="mt-1 text-[10px] leading-relaxed text-[var(--muted-foreground)]">
                    All external effects are currently <strong className="text-[var(--status-blocked-fg)]">false</strong>.
                    No deploy, publish, message, financial, or workflow activation has occurred.
                    Gate C/D/X remain closed.
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
