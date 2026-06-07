# Control Center UI v0 and Stitch Preparation

This package prepares the local/private Argument OS Control Center UI for controlled v0 and Stitch exploration. It turns the current cockpit, lane, blocker, evidence, permission, and local-mode surfaces into upload-ready planning material without changing runtime behavior.

It prepares:

- screen and component inventory work
- a DESIGN.md-style rules file
- Stitch prompts for visual exploration
- v0 project instructions and generation sequence
- UX cleanup and integration acceptance checklists

It does not:

- deploy, publish, upload, or call external services
- change backend or runtime behavior
- create public/client-facing access
- grant command authority
- treat mock, static, imported, local, or generated records as live Automations/API truth
- convert Automations rationale into Today tasks, active blockers, permissions, execution requirements, or current truth

## Recommended Workflow

```text
Current UI screenshots/Figma
        |
UI inventory + UX problems
        |
Stitch exploration: flows, variants, visual direction
        |
DESIGN.md / design rules
        |
v0 component generation
        |
v0 page composition
        |
Code cleanup + reusable architecture
        |
Usability/accessibility pass
        |
Final implementation
```

Use Stitch to decide what the Control Center should become.
Use v0 to turn the selected direction into reusable React/TypeScript components.
Do not ask either tool to redesign the entire product in one shot.

## UX Model

The target operating rhythm is:

```text
Monitor -> Triage -> Act -> Verify
```

The Control Center should feel like a calm, professional operational dashboard, not a scattered collection of technical panels. It should prioritize what needs attention now, what decision or action is required, what evidence supports it, what is historical/provenance-only, and what is blocked or permission-gated.

## Current Surface Mapping

Recommended future IA:

- Overview
- Today
- Lanes
- Blockers
- Evidence / Archive
- Permissions
- Settings

Current visible surfaces to map rather than forcibly rename in code:

- `AppShell`, `SidebarNav`, and `TopStatusBar`
- `OperatingCockpitNavigator` and `OperatingLaneTopNav`
- `Operating Status Cockpit`
- `Daily Priority / Alert Cockpit`
- `Prepare Mode Action Queue`
- `Blocked Actions / Not-True Claims`
- `Archive / Evidence` and `Evidence Details`
- `Backend Cockpit Mock Records`
- `SnapshotModeBanner`
- `LocalControlPlaneStatusPanel`, `OperatingModePanel`, and private operator gate surfaces
- permission and command surfaces such as `PermissionedCommandCenterPanel`, `CommandGatePanel`, `PrivateOperatorApprovalLedgerPanel`, and `UnifiedActionLayerPanel`

## Files

- `ui-inventory-template.md` - upload inventory structure and per-screen template
- `design-rules.md` - DESIGN.md-style rules for Stitch/v0 reuse
- `stitch-prompts.md` - reusable Stitch exploration prompts
- `v0-project-instructions.md` - reusable v0 project instructions
- `v0-generation-sequence.md` - staged component/page generation order
- `ux-cleanup-checklist.md` - practical cleanup roadmap
- `integration-acceptance-checklist.md` - final acceptance checklist
- `screen-export-manifest.md` - prioritized surfaces to capture for v0/Stitch
- `local-screenshot-capture.md` - local-only screenshot capture procedure
- `v0-upload-batches.md` - controlled v0 upload batches and prompts
- `stitch-upload-batches.md` - controlled Stitch exploration batches
- `current-ui-to-export-map.md` - current component-to-export grouping map
