# Control Center Design Rules

Use this as a DESIGN.md-style source for Stitch and v0 work. It describes the intended product direction and the governance boundaries that must survive visual exploration and component generation.

## Product Personality

- Professional, calm, operational, trustworthy, and fast.
- Dense but readable. Prefer scannable working surfaces over decorative whitespace.
- Task-oriented. Lead with what needs attention, what decision is required, and what evidence supports it.
- Private/internal by default. The UI is an operator cockpit, not a public portal or client surface.

## Operating Model

```text
Monitor -> Triage -> Act -> Verify
```

- Monitor: show current posture, freshness, mode, and lane health.
- Triage: separate priority, blocker, evidence, and permission states.
- Act: prepare or review only actions that are explicitly allowed.
- Verify: show evidence, audit trail, result state, and blocked external effects.

## Layout Rules

- Left sidebar: primary product areas.
- Top bar: mode, status, search, environment, and context.
- Main canvas: current operating content.
- Right drawer: contextual details, actions, evidence, and provenance.
- Toast/status layer: action feedback, save states, local errors, and permission refusals.
- Keep the default screen focused on Today and the current operating posture.
- Prefer drawers and inline expansion over deep page jumps for evidence and detail review.
- Do not put UI cards inside other cards. Use cards for repeated items, records, and modal-like details.

## Information Hierarchy

1. What needs attention now.
2. What decision or action is required.
3. What is blocked or permission-gated.
4. What evidence supports the decision.
5. What is historical, archived, or provenance-only.
6. What data source and freshness state applies.

## Navigation Model

Recommended future IA:

- Overview
- Today
- Lanes
- Blockers
- Evidence / Archive
- Permissions
- Settings

Map current labels into this IA before renaming runtime surfaces. Current sidebar labels include Today, Products, Theory / Doctrine, Design / Territory, Public Surfaces, Creative / Peer Review, Governance, Background Tasks, Archive / Evidence, and Evidence Details.

## Components

Core shell:

- AppShell
- SidebarNav
- TopStatusBar
- EvidenceDrawer
- ConfirmationDialog

Core operating surfaces:

- TodayPanel
- LaneSummary
- StatusCard
- BlockerList
- NextActionCard
- FreshnessLedger
- PermissionGateCard

Utility components:

- DataTable
- FilterBar
- EmptyState
- ErrorState
- Badge
- StatusPill
- PermissionBadge
- EvidenceBadge

Current components and modules to preserve or map:

- `AppShell`, `SidebarNav`, `TopStatusBar`
- `OperatingCockpitNavigator`, `OperatingLaneTopNav`
- `OperatingStatusCockpit`
- `DailyPriorityAlertsPanel`
- `PrepareActionQueuePanel`
- `BlockedActionsPanel`
- `SnapshotModeBanner`
- `EvidenceGovernancePanel`
- `BackendCockpitRecordsPanel`
- `LocalControlPlaneStatusPanel`, `OperatingModePanel`
- `PermissionedCommandCenterPanel`, `CommandGatePanel`, `PrivateOperatorApprovalLedgerPanel`, `UnifiedActionLayerPanel`
- `WriteAuditLedgerPanel`

## Visual Rules

- Color is for status, severity, permission state, freshness, and feedback.
- Use neutral surfaces for normal content, amber for review/permission/freshness risk, red/rose for blocked or forbidden states, green/mint for allowed/success states, and blue/signal for informational context.
- Do not rely on color alone. Pair color with text, icon, label, or state copy.
- Avoid unnecessary decorative gradients, oversized hero layouts, and marketing-style composition.
- Use consistent density, spacing, and table/card structure across lanes and records.
- Keep button text short and action-specific.
- Show one primary action per surface. Secondary actions belong in a menu, drawer, or grouped footer.

## Accessibility Rules

- All interactive controls need accessible names.
- Use semantic landmarks for sidebar, top bar, main content, drawers, dialogs, and status messages.
- Preserve keyboard navigation and visible focus states.
- Tables need clear headers and row labels.
- Badges and pills cannot be the only status indicator.
- Empty, loading, and error states must explain what happened and what the operator can do next.

## Governance Rules

- UI visibility is not authority.
- Evidence is not doctrine.
- Dry-run is not activation.
- Permission-gated is not executed.
- Prepare is not approval.
- Local/static/generated/mock data is not live Automations/API truth.
- Automations rationale is available as context.
- Freshness review is required only for current-truth promotion.
- Imported Automations references must not become Today tasks, active blockers, permissions, execution requirements, or live API facts unless existing code/docs support that distinction.
- Browser UI must not invent external execution, remote backend behavior, credentials, deployment, publication, messaging, workflow activation, financial execution, source mutation, or public/client access.
- Destructive or external-effect actions stay blocked or permission-gated unless separately implemented and exactly approved.

