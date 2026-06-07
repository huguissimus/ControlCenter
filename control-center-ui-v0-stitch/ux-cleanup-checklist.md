# UX Cleanup Checklist

Use this checklist for a future UI cleanup pass. It is a roadmap, not a runtime change.

## Cleanup Table

| Area | Current UI risk | Cleaner direction |
| --- | --- | --- |
| Navigation | Many domain labels can feel like a documentation index. | Group into Overview, Today, Lanes, Blockers, Evidence / Archive, Permissions, and Settings while mapping current labels carefully. |
| Today/default dashboard | Governance and status copy can compete with what matters today. | Lead with current posture, active blockers, next actions, and source/freshness labels. |
| Lane Summary | Lane detail can become dense and technical. | Show current posture, reviewable items, blocked/gated items, next safe action, and evidence link in a repeatable pattern. |
| Blockers | Historical blocked claims can look like active blockers. | Split active blockers, permission candidates, hard-forbidden items, and archive evidence. |
| Archive/evidence | Evidence-heavy panels can look like task queues. | Treat as secondary support with filters, compact rows, and contextual evidence drawer. |
| Automations freshness | Automations rationale and freshness-reviewed truth can blur. | Label rationale as context and show freshness review only for current-truth promotion. |
| Local API mode | Local/static/generated/API mode labels are distributed. | Centralize mode status in top bar and Settings; label source mode near affected records. |
| Permissioned actions | Prepare, approval, execution, and audit can read as one workflow state. | Use a clear stepper and disabled/blocked reasons; never imply gated means executed. |
| Settings | Environment and safety configuration can be hard to find. | Add a future Settings area for private gate, data mode, read-only/private mode, and local API status. |
| Empty states | Empty panels can imply missing implementation or failure. | Explain whether the state is empty, disabled, blocked, fixture-only, or unavailable. |
| Error states | Local API fallback and protected-route errors can look like broken product state. | Explain what failed, what fallback is active, and what safe next step exists. |
| Technical language | Internal terms can dominate the operator experience. | Keep exact terms in detail drawers/tooltips; use plain labels on primary surfaces. |

## Operator Questions

Use these as acceptance questions during screenshots, v0 generation, and code cleanup:

- Can I tell what matters today within 10 seconds?
- Can I see what is blocked?
- Can I see what requires permission?
- Can I distinguish current truth from archive/evidence?
- Can I distinguish Automations rationale from freshness-reviewed truth?
- Can I tell whether data is local/static/generated/live?
- Can I understand what action is allowed?
- Can I understand what action is forbidden?
- Can I tell whether an item is prepared, approved, executed, or audited?
- Can I inspect evidence without accidentally promoting it to authority?

## Low-Risk Cleanup Candidates

- Shorten repeated governance copy in the top bar and move detail into a drawer.
- Add consistent source labels to fixture, generated, local API, and protected-route data.
- Replace implementation-first headings with operator-first headings where safe.
- Add filters to Evidence / Archive before adding more evidence panels.
- Separate "active blocker" from "historical blocked evidence" in navigation and summaries.
- Add reusable empty/loading/error state copy before new screen generation.

