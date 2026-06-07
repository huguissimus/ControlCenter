# v0 Generation Sequence

Generate in small, controlled layers. Do not ask v0 to redesign or generate the entire Control Center at once.

## Layer 1 - Foundation

Generate or refine:

- theme tokens
- severity colors
- layout spacing
- typography scale
- badges
- buttons
- cards
- empty states
- loading states
- error states

Acceptance focus:

- status colors are consistent
- color is not the only signal
- density is readable
- empty/loading/error states are reusable

## Layer 2 - App Shell

Generate:

- persistent sidebar
- top status bar
- main content area
- contextual drawer slot
- responsive behavior

Acceptance focus:

- sidebar and header are reusable
- mobile layout preserves task order
- data mode and permission posture stay visible
- drawer can host evidence, action, and provenance details

## Layer 3 - Core Components

Generate:

- TodayPanel
- LaneSummary
- BlockerList
- NextActionCard
- EvidenceDrawer
- PermissionGateCard
- FreshnessLedger
- DataTable
- FilterBar
- EmptyState
- ErrorState

Acceptance focus:

- components are typed
- status semantics remain clear
- current truth, evidence, blockers, and permissions are visually distinct
- no component implies execution unless the provided state says execution happened

## Layer 4 - Screens

Generate:

- Overview / Today
- Lanes
- Blockers
- Evidence / Archive
- Permissions
- Settings

Acceptance focus:

- Today/default dashboard is understandable within 10 seconds
- Lanes summarize posture, reviewable items, blockers, and next safe action
- Evidence / Archive reads as secondary support, not primary task pressure
- Settings/mode explains local/static/generated/live-read data states

## Layer 5 - Composition

Compose screens with:

- reused AppShell
- reused table, drawer, and status components
- no duplicated sidebar/header logic
- consistent navigation state
- consistent breadcrumbs/details
- clear labels for static/generated/local data

Acceptance focus:

- one primary action per surface
- permission-gated actions are not shown as executed
- destructive/external actions remain blocked or gated
- Automations rationale is not treated as current truth
- freshness review appears only where current-truth promotion is relevant

