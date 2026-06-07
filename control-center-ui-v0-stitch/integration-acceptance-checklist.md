# Integration Acceptance Checklist

Use this before accepting a future Control Center UI cleanup or v0-generated integration.

- [ ] Sidebar labels are consistent.
- [ ] Today/default dashboard is understandable.
- [ ] Lane Summary is readable.
- [ ] Blockers are separated from archive/evidence.
- [ ] Automations rationale is not treated as current truth.
- [ ] Freshness review is only required for current-truth promotion.
- [ ] Permission-gated actions are not shown as executed.
- [ ] Static/local/generated data is labelled correctly.
- [ ] One primary action per surface.
- [ ] Technical language is reduced where safe.
- [ ] Empty/loading/error states are documented.
- [ ] Keyboard/focus/accessibility considerations are documented.
- [ ] Color is not the only status indicator.
- [ ] Destructive/external actions remain blocked or permission-gated.
- [ ] No deploy/publish/upload/external service call happened.

## Runtime Governance Check

- [ ] UI visibility is not presented as authority.
- [ ] Evidence is not presented as doctrine.
- [ ] Dry-run is not presented as activation.
- [ ] Prepare is not presented as approval.
- [ ] Local/private writes, where implemented, remain local/private and audited.
- [ ] Gate C/D/X or external-effect actions remain blocked unless separately implemented and exactly approved.
- [ ] Browser UI does not call external APIs directly.
- [ ] No credentials, secrets, tokens, or sensitive records are committed.

## Data-State Check

- [ ] Fixture data is labelled as fixture/static.
- [ ] Generated collector data is labelled as generated/local.
- [ ] Local API read mode is labelled as local read-only where applicable.
- [ ] Protected-route records are labelled by operating mode and permission posture.
- [ ] Imported source references are not promoted to Today/current truth without review.
- [ ] Archive/evidence records are not displayed as active tasks unless explicitly supported.

