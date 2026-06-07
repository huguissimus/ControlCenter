# UI Inventory Template

Use this template to prepare controlled, upload-ready material for v0 and Stitch. Keep private data, secrets, credentials, client data, source-private doctrine, and sensitive records out of screenshots and uploads.

## Suggested Input Folder

```text
controlcenter-ui-input/
  01-current-screens/
    dashboard.png
    today.png
    lanes.png
    blockers.png
    evidence-archive.png
    permissions.png
    settings.png
  02-flows/
    daily-operating-flow.md
    permission-review-flow.md
    evidence-review-flow.md
    error-states.md
  03-design-system/
    colors.md
    typography.md
    spacing.md
    components.md
  04-content/
    nav-labels.md
    table-columns.md
    empty-states.md
    button-copy.md
  05-product-context/
    product-goals.md
    user-roles.md
    must-keep.md
    must-fix.md
```

## Screen Template

```text
Screen:
Purpose:
Primary user action:
Current problem:
Must preserve:
Can simplify:
Confusing/too technical copy:
Suggested v0/Stitch upload grouping:
```

## Initial Screen Inventory

| Screen | Current source surface | Purpose | Suggested upload grouping |
| --- | --- | --- | --- |
| Dashboard / Overview | `TopStatusBar`, `Operating Status Cockpit`, `Operator Cockpit Overview` | Give a fast read on current posture, safety, and operator attention. | Upload with Today and status summary only. |
| Today | `OperatingCockpitNavigator` with Today lane, `Daily Priority / Alert Cockpit` | Show what matters now and what needs a decision. | Upload with blocker and next-action examples. |
| Lanes | `OperatingLaneTopNav`, lane sections in `OperatingCockpitNavigator` | Organize work by operating lane and constituent focus. | Upload one complete lane plus lane nav. |
| Blockers | `Blocked Actions / Not-True Claims`, gated command cards, permission panels | Separate blocked, forbidden, and permission-gated items from normal work. | Upload with Permissions. |
| Evidence / Archive | `Archive / Evidence`, `Evidence Details`, `EvidenceGovernancePanel`, `WriteAuditLedgerPanel` | Keep provenance, historical records, and audit evidence out of Today authority. | Upload independently as secondary/detail surface. |
| Permissions | `PermissionedCommandCenterPanel`, `CommandGatePanel`, `PrivateOperatorApprovalLedgerPanel`, `UnifiedActionLayerPanel` | Show what can be prepared, approved, refused, or audited. | Upload with one command review flow. |
| Settings / Mode | `SnapshotModeBanner`, `LocalControlPlaneStatusPanel`, `OperatingModePanel`, private operator gate | Explain local/static/generated/API mode and private authenticated posture. | Upload with mode labels and empty/error states. |

## Per-Screen Notes

### Dashboard / Overview

Screen: Dashboard / Overview
Purpose: Current operating posture and immediate attention summary.
Primary user action: Choose the next lane or decision to inspect.
Current problem: Status, safety, and governance copy can compete with the actual daily operating summary.
Must preserve: Private local posture, operator approval only, no autonomous execution, no public/client access.
Can simplify: Reduce repeated warnings into compact status badges plus contextual details.
Confusing/too technical copy: "consequence adapter", "authority tier", "backend-shaped mock records" when shown before task context.
Suggested v0/Stitch upload grouping: Header, daily summary, lane summary, blocker count, next action.

### Today

Screen: Today
Purpose: Answer what matters today within 10 seconds.
Primary user action: Triage a priority, blocker, or permission review item.
Current problem: Alerts, priorities, freshness risks, and domain notes can look equally important.
Must preserve: Automations rationale is available, but freshness review is required only for current-truth promotion.
Can simplify: Use one primary action per priority and move provenance into details.
Confusing/too technical copy: Raw fixture/source language in first-pass priority cards.
Suggested v0/Stitch upload grouping: Top priorities, active blockers, next safe action, data freshness label.

### Lanes

Screen: Lanes
Purpose: Let the operator move through Today, Products, Theory / Doctrine, Design / Territory, Public Surfaces, Creative / Peer Review, Governance, Background Tasks, and Archive / Evidence.
Primary user action: Pick a lane and inspect its current posture, reviewable items, blockers, and next safe action.
Current problem: Lane detail can read as documentation rather than a working dashboard.
Must preserve: Lane semantics for permission-packet candidates, hard-forbidden actions, historical evidence, and adapter gaps.
Can simplify: Keep lane summaries short and reveal detailed provenance in a drawer.
Confusing/too technical copy: "source category treatment", "constituent focus", and implementation-path labels.
Suggested v0/Stitch upload grouping: Lane nav plus one complete lane.

### Blockers

Screen: Blockers
Purpose: Separate cannot-do, not-true, stale, and permission-required work from normal next actions.
Primary user action: Decide whether to dismiss, archive, request review, or prepare a permission packet.
Current problem: Historical blocked claims can visually compete with active blockers.
Must preserve: Hard-forbidden actions remain forbidden; permission-gated is not executed.
Can simplify: Split active blockers, permission candidates, and archived evidence into distinct sections.
Confusing/too technical copy: "not-true claims" may be accurate but should be paired with plain language.
Suggested v0/Stitch upload grouping: Active blockers plus permission gate examples.

### Evidence / Archive

Screen: Evidence / Archive
Purpose: Store provenance, audit trail, historical reports, and source context without promoting it to operating truth.
Primary user action: Inspect supporting evidence for a current decision.
Current problem: Evidence-heavy sections can look like primary tasks.
Must preserve: Evidence is not doctrine; imported references are not current truth by themselves.
Can simplify: Use archive filters, compact record rows, and contextual evidence drawers.
Confusing/too technical copy: "fixture lineage", "backend-shaped", "candidate JSON" unless the user is inspecting sources.
Suggested v0/Stitch upload grouping: Evidence table, drawer, freshness ledger.

### Permissions

Screen: Permissions
Purpose: Make allowed, blocked, prepared, approved, executed, and audited states unmistakable.
Primary user action: Review a permission gate or command record.
Current problem: Prepare, dry-run, approve, execute, and audit semantics can be dense.
Must preserve: UI visibility is not authority; dry-run is not activation; Gate C/D/X remain blocked where specified.
Can simplify: Show a stepper with disabled states and explicit reason text.
Confusing/too technical copy: Internal gate names without plain-language explanations.
Suggested v0/Stitch upload grouping: Permission review flow with blocked external-effect example.

### Settings / Mode

Screen: Settings / Mode
Purpose: Explain data mode, local/private access, static fallback, generated/local records, and read-only/private operating mode.
Primary user action: Confirm the environment and understand whether records are fixture, local API, generated, or live-read.
Current problem: Mode labels are spread across banners, headers, and panels.
Must preserve: Local API mode is read-only unless specific control-plane routes allow local/private writes; browser does not call external APIs directly.
Can simplify: Centralize mode and data-source labels in top bar or settings.
Confusing/too technical copy: Environment variable names unless in a developer detail section.
Suggested v0/Stitch upload grouping: Top status bar plus mode/settings drawer.

