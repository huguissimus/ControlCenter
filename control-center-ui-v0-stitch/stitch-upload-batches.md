# Stitch Upload Batches

Use Stitch for visual exploration, information architecture, and interaction direction. Stitch outputs are concept references only. They are not final implementation authority, governance authority, or permission to add runtime behavior.

## Batch 1 - Overall operating cockpit direction

Goal:

- Explore the overall visual direction for a calm, professional, private/local operating cockpit.

Source material to provide:

- Today dashboard screenshot
- `design-rules.md`
- `screen-export-manifest.md`

Prompt:

```text
Explore three visual directions for the Argument OS Control Center: dense operator console, clean executive dashboard, and balanced daily operating cockpit. Keep the UI private/local, operational, dense but readable, and centered on Monitor -> Triage -> Act -> Verify.

Do not invent live APIs, external execution, public access, deployment, publication, workflow activation, messaging, financial execution, source mutation, or unrestricted Execute.
```

Expected outputs:

- three direction boards
- one recommended direction
- notes on layout, density, hierarchy, and status treatment

Decision criteria:

- operator can tell what matters today quickly
- governance states remain visible but not overwhelming
- current work, blockers, evidence, and permissions are distinct

## Batch 2 - Monitor -> Triage -> Act -> Verify flow

Goal:

- Clarify the end-to-end daily operating flow.

Source material to provide:

- Today screenshot
- blocker screenshot
- next-action screenshot
- permissions screenshot

Prompt:

```text
Create a visual flow for Monitor -> Triage -> Act -> Verify in the Control Center. Show how an operator moves from Today/current status to blockers, next safe action, permission review, and evidence/audit verification.

This is concept work only. Do not invent execution authority or live integrations.
```

Expected outputs:

- flow map
- screen hierarchy recommendation
- interaction notes for detail drawer and action review

Decision criteria:

- flow starts from Today
- permission and evidence review are understandable
- dry-run, Prepare, approval, execution, and audit are distinct

## Batch 3 - Lane Summary readability

Goal:

- Improve the readability of lane summaries and lane navigation.

Source material to provide:

- lane summary screenshot
- current lane labels
- `current-ui-to-export-map.md`

Prompt:

```text
Improve the lane summary experience for a dense operational dashboard. Each lane should show current posture, reviewable items, blocked/gated items, next safe action, and evidence access without reading like implementation documentation.
```

Expected outputs:

- revised lane card layout
- lane nav treatment
- status/severity hierarchy

Decision criteria:

- lane card pattern is reusable
- active blocker and evidence are visually distinct
- labels stay accurate even if simplified

## Batch 4 - Evidence/Archive as secondary surface

Goal:

- Make evidence and archive useful without letting them dominate the daily cockpit.

Source material to provide:

- evidence/archive screenshot
- freshness/source semantics screenshot
- `design-rules.md` governance rules

Prompt:

```text
Explore Evidence / Archive as a secondary support surface. The operator should be able to inspect provenance, freshness, source labels, and audit evidence without confusing historical records with current truth or active tasks.
```

Expected outputs:

- archive table concept
- evidence drawer concept
- freshness/source label system

Decision criteria:

- evidence does not look like a task queue
- current truth and provenance-only records are distinct
- Automations rationale and freshness-reviewed truth stay separate

## Batch 5 - Permission-gated action review

Goal:

- Clarify permission review without implying execution.

Source material to provide:

- permissions screenshot
- command gate screenshot if available
- `integration-acceptance-checklist.md`

Prompt:

```text
Explore a permission-gated action review surface for the Control Center. Show Prepare, review, human confirmation, approval, blocked gates, safe local execution where explicitly present, and audit evidence as distinct states.

Permission-gated is not executed. Dry-run is not activation. UI visibility is not authority.
```

Expected outputs:

- permission review card
- state stepper
- blocked/external-effect warning pattern
- audit/evidence detail drawer

Decision criteria:

- no state ambiguity between prepared, approved, executed, blocked, and audited
- external-effect actions remain blocked or gated
- forbidden actions are unmistakable

## Batch 6 - Technical-language reduction

Goal:

- Reduce technical language while preserving exact governance semantics.

Source material to provide:

- screenshots with dense technical copy
- `ux-cleanup-checklist.md`
- `design-rules.md`

Prompt:

```text
Reduce technical language in the Control Center UI while preserving governance accuracy. Keep exact terms available in details/tooltips, but make primary surfaces more operator-oriented and task-focused.

Do not remove or weaken the meanings: UI visibility is not authority, evidence is not doctrine, dry-run is not activation, permission-gated is not executed, and freshness review is required only for current-truth promotion.
```

Expected outputs:

- copy hierarchy recommendation
- simplified labels
- tooltip/detail strategy for exact technical terms

Decision criteria:

- primary surface is easier to read
- no governance meaning is lost
- technical terms move to the right context rather than disappearing

