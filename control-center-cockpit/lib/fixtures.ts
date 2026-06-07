// Static fixture data for local/private Control Center.
// All data is local-static/fixture only. Not live API truth.
// Label: FIXTURE — not current-truth unless freshness-reviewed.

export type LaneStatus = "ok" | "review" | "blocked" | "gated" | "stale";
export type BlockerSeverity = "blocked" | "forbidden" | "stale" | "gated";
export type PermissionState =
  | "prepare"
  | "pending-review"
  | "approved"
  | "refused"
  | "blocked"
  | "forbidden";
export type DataMode = "fixture" | "local-api" | "generated" | "imported";
export type EvidenceType = "audit" | "provenance" | "reference" | "archive";

export interface Lane {
  id: string;
  label: string;
  status: LaneStatus;
  postureSummary: string;
  reviewableCount: number;
  blockedCount: number;
  nextSafeAction: string | null;
  evidenceLink: string | null;
  lastUpdated: string;
}

export interface Blocker {
  id: string;
  label: string;
  severity: BlockerSeverity;
  reason: string;
  laneId: string;
  laneLabel: string;
  since: string;
  isHistorical: boolean;
}

export interface NextAction {
  id: string;
  label: string;
  description: string;
  laneId: string;
  laneLabel: string;
  requiresReview: boolean;
  requiresPermission: boolean;
  isLocal: boolean;
}

export interface PermissionItem {
  id: string;
  label: string;
  state: PermissionState;
  gate: string;
  description: string;
  localScope: boolean;
  externalEffect: boolean;
  requestedAt: string;
  reviewedAt?: string;
  audited: boolean;
}

export interface EvidenceRecord {
  id: string;
  label: string;
  type: EvidenceType;
  sourceMode: DataMode;
  laneId: string;
  laneLabel: string;
  summary: string;
  createdAt: string;
  isCurrent: boolean;
  freshnessReviewed: boolean;
}

export interface FreshnessRecord {
  id: string;
  label: string;
  sourceMode: DataMode;
  lastReviewed: string | null;
  promotionCandidate: boolean;
  note: string;
}

// ——————————————————————————————————————
// Operating Status
// ——————————————————————————————————————
export const operatingStatus = {
  mode: "local-private",
  pass: "Gate A",
  nextGate: "Gate B — requires human review",
  permissionPosture: "Prepare only — no autonomous execution",
  externalEffects: false,
  gateCD: "blocked",
  noAutonomy: true,
  dataMode: "fixture" as DataMode,
  freshness: "Snapshot — 2026-06-07T09:14:00Z",
  controlPlane: "localhost:4000 — read-only",
  operatorAuthenticated: true,
  localWritesEnabled: true,
};

// ——————————————————————————————————————
// Lanes
// ——————————————————————————————————————
export const lanes: Lane[] = [
  {
    id: "today",
    label: "Today",
    status: "review",
    postureSummary: "2 items require operator review before any action.",
    reviewableCount: 2,
    blockedCount: 1,
    nextSafeAction: "Review priority alerts and confirm posture.",
    evidenceLink: "archive-evidence",
    lastUpdated: "2026-06-07T09:14:00Z",
  },
  {
    id: "products",
    label: "Products",
    status: "ok",
    postureSummary: "No active blockers. 1 item pending local review.",
    reviewableCount: 1,
    blockedCount: 0,
    nextSafeAction: "Review draft product summary before scheduling.",
    evidenceLink: null,
    lastUpdated: "2026-06-06T18:00:00Z",
  },
  {
    id: "theory-doctrine",
    label: "Theory / Doctrine",
    status: "stale",
    postureSummary: "Source freshness review required. 3 imported references not yet promoted.",
    reviewableCount: 3,
    blockedCount: 0,
    nextSafeAction: "Run freshness review before treating imports as current truth.",
    evidenceLink: "archive-evidence",
    lastUpdated: "2026-06-04T11:30:00Z",
  },
  {
    id: "design-territory",
    label: "Design / Territory",
    status: "ok",
    postureSummary: "Active. No blockers. 2 drafts in Prepare queue.",
    reviewableCount: 2,
    blockedCount: 0,
    nextSafeAction: "Review Prepare queue items.",
    evidenceLink: null,
    lastUpdated: "2026-06-07T08:00:00Z",
  },
  {
    id: "public-surfaces",
    label: "Public Surfaces",
    status: "gated",
    postureSummary: "All publish/deploy actions blocked. Gate C/D/X remain closed.",
    reviewableCount: 0,
    blockedCount: 3,
    nextSafeAction: null,
    evidenceLink: "archive-evidence",
    lastUpdated: "2026-06-07T09:14:00Z",
  },
  {
    id: "creative-peer-review",
    label: "Creative / Peer Review",
    status: "review",
    postureSummary: "1 draft awaiting peer review confirmation.",
    reviewableCount: 1,
    blockedCount: 0,
    nextSafeAction: "Open peer review checklist for draft #CR-014.",
    evidenceLink: null,
    lastUpdated: "2026-06-06T15:45:00Z",
  },
  {
    id: "governance",
    label: "Governance",
    status: "ok",
    postureSummary: "Audit ledger current. No outstanding approval items.",
    reviewableCount: 0,
    blockedCount: 0,
    nextSafeAction: "No action required.",
    evidenceLink: "archive-evidence",
    lastUpdated: "2026-06-07T07:00:00Z",
  },
  {
    id: "background-tasks",
    label: "Background Tasks",
    status: "ok",
    postureSummary: "Collector running in approved local scope. No errors.",
    reviewableCount: 0,
    blockedCount: 0,
    nextSafeAction: null,
    evidenceLink: null,
    lastUpdated: "2026-06-07T09:10:00Z",
  },
  {
    id: "archive-evidence",
    label: "Archive / Evidence",
    status: "ok",
    postureSummary: "Archive current. Historical evidence available for review.",
    reviewableCount: 0,
    blockedCount: 0,
    nextSafeAction: null,
    evidenceLink: null,
    lastUpdated: "2026-06-07T09:00:00Z",
  },
];

// ——————————————————————————————————————
// Active Blockers
// ——————————————————————————————————————
export const blockers: Blocker[] = [
  {
    id: "b-001",
    label: "Gate C/D/X — external effects blocked",
    severity: "forbidden",
    reason:
      "No external publication, deployment, or messaging permitted. External effects remain false.",
    laneId: "public-surfaces",
    laneLabel: "Public Surfaces",
    since: "2026-06-01T00:00:00Z",
    isHistorical: false,
  },
  {
    id: "b-002",
    label: "Theory / Doctrine imports not freshness-reviewed",
    severity: "stale",
    reason:
      "3 imported Automations references have not been reviewed for current-truth promotion. Treat as rationale only.",
    laneId: "theory-doctrine",
    laneLabel: "Theory / Doctrine",
    since: "2026-06-04T11:30:00Z",
    isHistorical: false,
  },
  {
    id: "b-003",
    label: "Publish action requires Gate B human review",
    severity: "gated",
    reason: "Gate B has not been reached. Human review required before any publish step.",
    laneId: "public-surfaces",
    laneLabel: "Public Surfaces",
    since: "2026-06-07T00:00:00Z",
    isHistorical: false,
  },
  {
    id: "b-004",
    label: "Deploy blocked — no implemented deploy route",
    severity: "forbidden",
    reason: "No deploy action exists in the current operating scope. Forbidden.",
    laneId: "public-surfaces",
    laneLabel: "Public Surfaces",
    since: "2026-06-01T00:00:00Z",
    isHistorical: false,
  },
  {
    id: "b-hist-001",
    label: "Workflow activation not-true claim — archived",
    severity: "blocked",
    reason:
      "Historical: workflow was claimed as activated without permission. Recorded as not-true. Evidence preserved.",
    laneId: "governance",
    laneLabel: "Governance",
    since: "2026-05-28T14:00:00Z",
    isHistorical: true,
  },
];

// ——————————————————————————————————————
// Next Safe Actions
// ——————————————————————————————————————
export const nextActions: NextAction[] = [
  {
    id: "na-001",
    label: "Review priority alerts",
    description:
      "Open the daily priority alert list and confirm current posture before taking any further action.",
    laneId: "today",
    laneLabel: "Today",
    requiresReview: false,
    requiresPermission: false,
    isLocal: true,
  },
  {
    id: "na-002",
    label: "Run freshness review on Theory / Doctrine imports",
    description:
      "Review 3 imported references in Theory / Doctrine lane. Confirm whether any qualify for current-truth promotion.",
    laneId: "theory-doctrine",
    laneLabel: "Theory / Doctrine",
    requiresReview: true,
    requiresPermission: false,
    isLocal: true,
  },
  {
    id: "na-003",
    label: "Review Prepare queue — Design / Territory",
    description:
      "Inspect 2 Prepare queue items in Design / Territory. Confirm drafts are ready before moving to review.",
    laneId: "design-territory",
    laneLabel: "Design / Territory",
    requiresReview: false,
    requiresPermission: false,
    isLocal: true,
  },
  {
    id: "na-004",
    label: "Open peer review checklist — CR-014",
    description:
      "Review Creative / Peer Review draft #CR-014. Confirm peer review requirements are met before forwarding.",
    laneId: "creative-peer-review",
    laneLabel: "Creative / Peer Review",
    requiresReview: true,
    requiresPermission: false,
    isLocal: true,
  },
];

// ——————————————————————————————————————
// Permission Items
// ——————————————————————————————————————
export const permissionItems: PermissionItem[] = [
  {
    id: "perm-001",
    label: "Prepare — draft product summary",
    state: "prepare",
    gate: "Gate A — local only",
    description:
      "Draft product summary prepared for operator review. No external effect. Local private scope.",
    localScope: true,
    externalEffect: false,
    requestedAt: "2026-06-07T08:45:00Z",
    audited: true,
  },
  {
    id: "perm-002",
    label: "Gate B — human review: publish candidate",
    state: "pending-review",
    gate: "Gate B — human review required",
    description:
      "Publish candidate awaiting human operator review and Gate B confirmation. No action taken.",
    localScope: false,
    externalEffect: true,
    requestedAt: "2026-06-06T17:00:00Z",
    audited: true,
  },
  {
    id: "perm-003",
    label: "Gate A — local run: collector generation",
    state: "approved",
    gate: "Gate A — local only",
    description:
      "Collector generation approved for local run within approved scope. Read-only output. Audited.",
    localScope: true,
    externalEffect: false,
    requestedAt: "2026-06-07T06:00:00Z",
    reviewedAt: "2026-06-07T06:15:00Z",
    audited: true,
  },
  {
    id: "perm-004",
    label: "Gate C — deploy to production",
    state: "blocked",
    gate: "Gate C/D/X — blocked",
    description:
      "Deploy action is blocked. No implemented deploy route. Gate C remains closed. External effects false.",
    localScope: false,
    externalEffect: true,
    requestedAt: "2026-06-05T12:00:00Z",
    audited: true,
  },
  {
    id: "perm-005",
    label: "Workflow activation — not permitted",
    state: "forbidden",
    gate: "Gate D — forbidden",
    description:
      "Workflow activation is forbidden. No implemented activation route. External effects false. This is not authorized.",
    localScope: false,
    externalEffect: true,
    requestedAt: "2026-06-01T00:00:00Z",
    audited: true,
  },
];

// ——————————————————————————————————————
// Evidence / Archive Records
// ——————————————————————————————————————
export const evidenceRecords: EvidenceRecord[] = [
  {
    id: "ev-001",
    label: "Governance audit — Gate A run approved",
    type: "audit",
    sourceMode: "local-api",
    laneId: "governance",
    laneLabel: "Governance",
    summary:
      "Local Gate A collector run was reviewed and approved by operator on 2026-06-07. Audit entry recorded.",
    createdAt: "2026-06-07T06:15:00Z",
    isCurrent: true,
    freshnessReviewed: true,
  },
  {
    id: "ev-002",
    label: "Theory / Doctrine — imported references (not promoted)",
    type: "reference",
    sourceMode: "imported",
    laneId: "theory-doctrine",
    laneLabel: "Theory / Doctrine",
    summary:
      "3 imported Automations references captured. Not freshness-reviewed. Treat as rationale only — not current truth.",
    createdAt: "2026-06-04T11:30:00Z",
    isCurrent: false,
    freshnessReviewed: false,
  },
  {
    id: "ev-003",
    label: "Blocked claim — workflow activation not-true",
    type: "archive",
    sourceMode: "fixture",
    laneId: "governance",
    laneLabel: "Governance",
    summary:
      "Workflow activation was claimed without authorization. Recorded as not-true. Preserved as historical blocked evidence.",
    createdAt: "2026-05-28T14:00:00Z",
    isCurrent: false,
    freshnessReviewed: false,
  },
  {
    id: "ev-004",
    label: "Write audit ledger — local private writes",
    type: "audit",
    sourceMode: "local-api",
    laneId: "governance",
    laneLabel: "Governance",
    summary:
      "Local write operations recorded in audit ledger. Scope: local private only. No external writes or mutations.",
    createdAt: "2026-06-07T07:00:00Z",
    isCurrent: true,
    freshnessReviewed: true,
  },
  {
    id: "ev-005",
    label: "Backend mock records — fixture mode",
    type: "provenance",
    sourceMode: "fixture",
    laneId: "today",
    laneLabel: "Today",
    summary:
      "Backend cockpit records sourced from local fixture data. Not live API truth. No action should be based on this without freshness review.",
    createdAt: "2026-06-07T09:00:00Z",
    isCurrent: false,
    freshnessReviewed: false,
  },
];

// ——————————————————————————————————————
// Freshness Ledger
// ——————————————————————————————————————
export const freshnessRecords: FreshnessRecord[] = [
  {
    id: "fr-001",
    label: "Backend cockpit records",
    sourceMode: "fixture",
    lastReviewed: null,
    promotionCandidate: false,
    note: "Fixture data. Not reviewed. No current-truth promotion pending.",
  },
  {
    id: "fr-002",
    label: "Theory / Doctrine imports",
    sourceMode: "imported",
    lastReviewed: null,
    promotionCandidate: true,
    note: "3 imported references. Freshness review required before promotion to current truth.",
  },
  {
    id: "fr-003",
    label: "Governance audit records",
    sourceMode: "local-api",
    lastReviewed: "2026-06-07T06:15:00Z",
    promotionCandidate: false,
    note: "Reviewed. Current-truth status confirmed for Gate A run.",
  },
  {
    id: "fr-004",
    label: "Local write audit ledger",
    sourceMode: "local-api",
    lastReviewed: "2026-06-07T07:00:00Z",
    promotionCandidate: false,
    note: "Reviewed. Ledger current as of today.",
  },
  {
    id: "fr-005",
    label: "Collector run output",
    sourceMode: "generated",
    lastReviewed: "2026-06-07T06:15:00Z",
    promotionCandidate: false,
    note: "Generated locally. Reviewed in Gate A approval.",
  },
];
