# Current UI To Export Map

This map ties current Control Center files/components to export batches. It is based on a narrow inspection of `src/App.tsx`, `src/shell`, selected components, and visible module names. The app is primarily React/TypeScript UI over fixture, generated, local API, and protected local control-plane state; that should stay visible in export material.

| Current file/component | UI surface | Export batch | Cleanup risk | Notes |
| --- | --- | --- | --- | --- |
| `src/shell/AppShell.tsx` | Global shell | v0 Batch 1 | Shell currently has top bar and main canvas but no persistent left sidebar in this file. | Useful foundation for v0 shell generation. |
| `src/shell/TopStatusBar.tsx` | Top status, permission posture, current pass | v0 Batch 1, Stitch Batch 1 | Long governance copy can dominate the first viewport. | Preserve no-autonomy, private/local, permission-required, and finance-blocked states. |
| `src/shell/SidebarNav.tsx` | Sidebar concept / legacy anchor nav | v0 Batch 1, Stitch Batch 1 | Current active app composition appears centered on lane top nav; sidebar IA may need reconciliation. | Use for IA labels and future left-sidebar exploration. |
| `src/modules/OperatingLaneTopNav.tsx` | Horizontal lane navigation | v0 Batch 1, v0 Batch 3, Stitch Batch 3 | Many lanes can overflow and feel like a technical index. | Current lane labels: Today, Products, Theory / Doctrine, Design / Territory, Public Surfaces, Creative / Peer Review, Governance, Background Tasks, Archive / Evidence. |
| `src/modules/OperatingCockpitNavigator.tsx` | Lane Summary and Today lane body | v0 Batch 2, v0 Batch 3, Stitch Batch 2, Stitch Batch 3 | Terms like source category treatment and constituent focus may need plain-language layering. | Core source for lane status, reviewable items, blocked/gated items, next safe action, and evidence link. |
| `src/components/OperatorSummaryPanel.tsx` | Today/default dashboard summary | v0 Batch 2, Stitch Batch 1 | May need stronger "what matters now" hierarchy. | Captures snapshot, backend cockpit, permission commands, and domain summary in default Today. |
| `src/modules/OperatorCockpitDashboardPanel.tsx` | Operator Cockpit Overview | v0 Batch 2, Stitch Batch 1 | Dashboard cards can compete with lane summary. | Include as part of Today/default dashboard export. |
| `src/modules/OperatingStatusCockpit.tsx` | Current operating status reference | v0 Batch 1, v0 Batch 5 | Currently in Archive / Evidence provenance section, not default Today. | Useful for status semantics and historical blocked evidence count. |
| `src/modules/DailyPriorityAlertsPanel.tsx` | Daily priorities, blockers, freshness risks, next actions | v0 Batch 2, v0 Batch 4 | Current location under Archive / Evidence can make daily alerts feel archival. | Use carefully as source for next-action and freshness-risk patterns. |
| `src/modules/PrepareActionQueuePanel.tsx` | Prepare Mode Action Queue / next actions | v0 Batch 4 | Prepare actions can be misread as executable actions. | Preserve Prepare/review distinction. |
| `src/modules/BlockedActionsPanel.tsx` | Blocked Actions / Not-True Claims | v0 Batch 4, Stitch Batch 2 | Historical blocked claims can be confused with active blockers. | Export separately from active blockers when possible. |
| `src/components/SnapshotModeBanner.tsx` | Snapshot fixture mode and Automations freshness ledger | v0 Batch 5, Stitch Batch 4 | Dense source/freshness language can overwhelm. | Critical for Automations rationale vs current-truth promotion distinction. |
| `src/modules/BackendCockpitRecordsPanel.tsx` | Backend Cockpit Mock Records and local API fallback | v0 Batch 5, v0 Batch 7 | "Backend mock" language can sound live or authoritative. | Shows fixture/local API mode and fallback states; no action buttons. |
| `src/modules/LocalControlPlaneStatusPanel.tsx` | Local control-plane status | v0 Batch 6, v0 Batch 7 | Technical endpoint/action registry copy is dense. | Current text says frontend shows status metadata and no browser execution controls. |
| `src/modules/OperatingModePanel.tsx` | Operator mode / local private access | v0 Batch 6, v0 Batch 7 | Could be mistaken for public auth or production readiness. | Labels locked, authenticated, local writes, Gate A/B local run, external effects false, Gate C/D/X blocked. |
| Private operator gate in `src/App.tsx` | Local/private lock or unlocked mode banner | v0 Batch 7 | Capturing passphrase entry could expose secrets. | Capture locked/unlocked posture only if no sensitive values are visible. |
| `src/modules/PermissionedCommandCenterPanel.tsx` | Permissioned command posture | v0 Batch 6, Stitch Batch 5 | Permission packet candidates may read like available actions. | Use for permission semantics, not execution authority. |
| `src/modules/CommandGatePanel.tsx` | Command Gate | v0 Batch 6, Stitch Batch 5 | Safe Gate A/B local execution must not generalize to external effects. | Distinguishes Gate A/B local only, human confirmation, Gate C/D/X blocked, external effects false. |
| `src/modules/PrivateOperatorApprovalLedgerPanel.tsx` | Approval ledger | v0 Batch 6, Stitch Batch 5 | Approval evidence can be mistaken for broad authority. | Use as audit/provenance detail. |
| `src/modules/UnifiedActionLayerPanel.tsx` | Unified action metadata | v0 Batch 6 | Contract metadata can look executable. | Preserve metadata vs authority distinction. |
| `src/modules/ActionRegistryRuntimePanel.tsx` | Action registry runtime | v0 Batch 6 | Dense policy details may need drawer/tooltip treatment. | Useful for forbidden/executable/planned taxonomy. |
| `src/modules/WriteAuditLedgerPanel.tsx` | Local write audit ledger | v0 Batch 5, v0 Batch 6 | Audit evidence can look like approval. | Keep "evidence, not approval" semantics. |
| `src/modules/DomainFeedHealthPanel.tsx` | Feed health / freshness | v0 Batch 5, v0 Batch 7 | Feed health may appear as live data freshness proof. | Keep source mode labels visible. |
| `src/modules/LocalTaskStateControlPanel.tsx` | Local task state | v0 Batch 4, v0 Batch 7 | Local state writes can imply broad task execution. | Keep local/private scope and implemented route boundaries. |
| `src/modules/PreparePacketLifecycleControlPanel.tsx` | Prepare packet lifecycle | v0 Batch 4, v0 Batch 7 | Lifecycle updates can be confused with publication. | Preserve local/private packet lifecycle only. |
| `src/modules/CollectorRunControlPanel.tsx` | Collector run control | v0 Batch 7 | Approved collector generation could be mistaken for broad automation. | Keep narrow approved collector scope. |
| `src/modules/LiveReadOnlyConnectorIngestionPanel.tsx` | Read-only connector ingestion | v0 Batch 5, v0 Batch 7 | Read-only ingestion can look like write/live sync. | Preserve read-only wording. |
| `src/modules/*ExecutionPanel.tsx`, `FabricationExportPanel`, `PublicWebsiteInsertionPanel`, `PublicationGatePanel` | External runtime/publication/fabrication gates | v0 Batch 6, Stitch Batch 5 | High risk of visual design implying external execution. | Show blocked/unavailable/permission-gated states only; no external effect assumptions. |
| `src/App.tsx` Suspense fallbacks | Loading states | v0 Batch 7 | Loading copy is repeated inline. | Good source for reusable `LoadingState`. |
| Record panels with `No ... records` messages | Empty states | v0 Batch 7 | Empty local state can look like broken data. | Use existing empty states; explain local/private state store. |
| Adapter states `loaded`, `unavailable`, `error`, `locked`, `fallback` | Error/unavailable/fallback states | v0 Batch 7 | Error vs unavailable vs locked can blur. | Use v0 to standardize state components without changing adapters. |

## Export Grouping

- Group 1: Shell, top status, lane navigation.
- Group 2: Today/default dashboard.
- Group 3: Lane Summary.
- Group 4: Blockers and next actions.
- Group 5: Evidence / Archive, freshness, and source semantics.
- Group 6: Permissions and command gates.
- Group 7: Empty, loading, unavailable, locked, fallback, and error states.

## Known Uncertainties

- A dedicated Settings route was not found in the inspected app composition. Treat Settings as recommended future IA mapped from `OperatingModePanel`, `LocalControlPlaneStatusPanel`, private operator gate, and data-mode labels.
- Routes appear to be controlled by in-app lane state rather than URL routes. Export docs should refer to current components/surfaces instead of claiming route paths.
- The existing UI contains a sidebar component, but the inspected `AppShell` currently renders the lane top nav in the top status bar. Future IA work should reconcile left-sidebar and lane-nav roles.

