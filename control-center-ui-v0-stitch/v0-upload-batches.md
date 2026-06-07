# v0 Upload Batches

Use v0 for component generation and composition after a direction has been selected. Upload small batches only. Every prompt must preserve the Control Center governance boundaries.

Required prompt guardrail for every batch:

```text
Do not invent live APIs.
Do not invent external execution.
Do not convert permission-gated actions into executed actions.
Do not treat Automations rationale as current truth unless freshness-reviewed.
Use reusable components.
Keep the UI clean, operational, and task-oriented.
```

## Batch 1 - Design Rules and AppShell

What to upload:

- `design-rules.md`
- `v0-project-instructions.md`
- `screen-export-manifest.md`
- Today/dashboard screenshot showing shell, top bar, and lane nav

Prompt:

```text
Create a reusable React + TypeScript + Tailwind AppShell for a private/local operational Control Center. Include persistent navigation, top status/mode bar, main content region, and a contextual drawer slot. Preserve the provided governance semantics.

Do not invent live APIs.
Do not invent external execution.
Do not convert permission-gated actions into executed actions.
Do not treat Automations rationale as current truth unless freshness-reviewed.
Use reusable components.
Keep the UI clean, operational, and task-oriented.
```

Request output:

- `AppShell`
- `SidebarNav`
- `TopStatusBar`
- drawer slot
- shared status badge primitives

Explicitly forbid:

- public login/product landing page
- decorative hero design
- external-service integration
- runtime data fetching assumptions

Check before accepting:

- mode/status remains visible
- sidebar/header are reusable
- no UI copy implies execution authority
- no duplicated layout structure

## Batch 2 - Today/default dashboard

What to upload:

- `01-today-dashboard-desktop.png`
- relevant `ui-inventory-template.md` Today notes
- `ux-cleanup-checklist.md`

Prompt:

```text
Generate a Today/default dashboard for the Control Center that answers what matters today within 10 seconds. Show current posture, active blockers, next safe action, source/freshness labels, and permission posture. Keep details available through progressive disclosure.

Do not invent live APIs.
Do not invent external execution.
Do not convert permission-gated actions into executed actions.
Do not treat Automations rationale as current truth unless freshness-reviewed.
Use reusable components.
Keep the UI clean, operational, and task-oriented.
```

Request output:

- `TodayPanel`
- `StatusCard`
- `NextActionCard`
- compact blocker summary
- source/freshness label pattern

Explicitly forbid:

- turning archive records into Today tasks
- creating action buttons for external effects
- hiding data-source labels

Check before accepting:

- one primary action is obvious
- Today is not dominated by provenance detail
- rationale vs current truth remains clear

## Batch 3 - Lane Summary and current status

What to upload:

- `02-lane-summary-desktop.png`
- current lane labels from `OperatingLaneTopNav`
- `design-rules.md`

Prompt:

```text
Generate reusable lane summary components for the Control Center. Each lane needs current posture, reviewable work, blocked/gated work, next safe action, and evidence link. Use consistent density and status semantics.

Do not invent live APIs.
Do not invent external execution.
Do not convert permission-gated actions into executed actions.
Do not treat Automations rationale as current truth unless freshness-reviewed.
Use reusable components.
Keep the UI clean, operational, and task-oriented.
```

Request output:

- `LaneSummary`
- `LaneNav`
- `StatusCard`
- evidence link/drawer trigger pattern

Explicitly forbid:

- renaming IA without preserving current labels
- treating lane metadata as command authority

Check before accepting:

- lane status is scannable
- blocked/gated and reviewable items are distinct
- evidence is secondary

## Batch 4 - Blockers and next actions

What to upload:

- `03-blockers-desktop.png`
- `04-next-actions-desktop.png`
- relevant rows from `screen-export-manifest.md`

Prompt:

```text
Generate blocker and next-action components for an operational dashboard. Separate active blockers, forbidden actions, stale/freshness risks, permission candidates, and archived evidence. Show the next safe operator action without implying execution.

Do not invent live APIs.
Do not invent external execution.
Do not convert permission-gated actions into executed actions.
Do not treat Automations rationale as current truth unless freshness-reviewed.
Use reusable components.
Keep the UI clean, operational, and task-oriented.
```

Request output:

- `BlockerList`
- `NextActionCard`
- blocked/forbidden reason pattern
- priority grouping

Explicitly forbid:

- combining historical blocked evidence with active blockers
- creating direct execution controls

Check before accepting:

- blocked vs permission-required vs next-action states are visually distinct
- forbidden states include reason copy
- Prepare/review is not presented as approval

## Batch 5 - Evidence / Archive / freshness semantics

What to upload:

- `05-evidence-archive-desktop.png`
- `SnapshotModeBanner` screenshot if available
- `design-rules.md` governance rules

Prompt:

```text
Generate Evidence / Archive and freshness components for a private/local Control Center. Evidence should support decisions without becoming current truth. Include a freshness ledger, source labels, archive table, and detail drawer.

Do not invent live APIs.
Do not invent external execution.
Do not convert permission-gated actions into executed actions.
Do not treat Automations rationale as current truth unless freshness-reviewed.
Use reusable components.
Keep the UI clean, operational, and task-oriented.
```

Request output:

- `EvidenceDrawer`
- `FreshnessLedger`
- archive `DataTable`
- source label badges

Explicitly forbid:

- presenting imported references as current status
- making evidence the default task queue

Check before accepting:

- Automations rationale/freshness review distinction is explicit
- evidence is secondary to current operating work
- local/static/generated/live-read labels remain visible

## Batch 6 - Permissioned actions

What to upload:

- `06-permissions-desktop.png`
- governance sections from `design-rules.md`
- current permission panel names from `current-ui-to-export-map.md`

Prompt:

```text
Generate permission-gated action review components for the Control Center. Show Prepare, review, human confirmation, approval, blocked gates, local safe execution where explicitly present, and audit evidence as separate states. Permission-gated must not look executed.

Do not invent live APIs.
Do not invent external execution.
Do not convert permission-gated actions into executed actions.
Do not treat Automations rationale as current truth unless freshness-reviewed.
Use reusable components.
Keep the UI clean, operational, and task-oriented.
```

Request output:

- `PermissionGateCard`
- command review stepper
- approval/refusal state labels
- audit detail drawer

Explicitly forbid:

- broad Execute controls
- Gate C/D/X execution
- publication, messaging, deployment, financial, workflow, or external tool execution controls

Check before accepting:

- permission required, approved, executed, blocked, and audited states are distinct
- external effects remain false unless explicitly shown as blocked
- local/private scope remains visible

## Batch 7 - Empty/error/loading states

What to upload:

- examples from `src/App.tsx` Suspense fallbacks
- screenshots of existing empty/unavailable states if safely captured
- `integration-acceptance-checklist.md`

Prompt:

```text
Generate reusable empty, loading, unavailable, locked, fallback, and error states for the Control Center. States must explain what happened, whether data is fixture/static/generated/local API, and the next safe operator step.

Do not invent live APIs.
Do not invent external execution.
Do not convert permission-gated actions into executed actions.
Do not treat Automations rationale as current truth unless freshness-reviewed.
Use reusable components.
Keep the UI clean, operational, and task-oriented.
```

Request output:

- `EmptyState`
- `LoadingState`
- `ErrorState`
- `UnavailableState`
- `LockedState`

Explicitly forbid:

- generic "something went wrong" without safe next step
- prompting external-service setup
- suggesting credential entry in public screenshots

Check before accepting:

- color is not the only indicator
- local fallback state is clear
- locked/unavailable/error are distinct

## Batch 8 - Final composition pass

What to upload:

- accepted component outputs from previous batches
- `v0-generation-sequence.md`
- `integration-acceptance-checklist.md`

Prompt:

```text
Compose the accepted Control Center components into a coherent operational dashboard using the reusable AppShell. Keep navigation state, selected details, source labels, blockers, evidence, and permission states consistent.

Do not invent live APIs.
Do not invent external execution.
Do not convert permission-gated actions into executed actions.
Do not treat Automations rationale as current truth unless freshness-reviewed.
Use reusable components.
Keep the UI clean, operational, and task-oriented.
```

Request output:

- composed Overview/Today screen
- composed Lanes screen
- composed Blockers screen
- composed Evidence / Archive screen
- composed Permissions screen
- composed Settings/mode screen if needed

Explicitly forbid:

- duplicating shell/header/sidebar code
- collapsing governance distinctions for visual simplicity

Check before accepting:

- acceptance checklist passes
- one primary action per surface
- no external service or live execution assumptions were introduced

