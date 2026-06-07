# v0 Project Instructions

Use these instructions for v0 once a Stitch direction or local design direction has been selected.

## Stack

- React
- TypeScript
- Tailwind CSS
- shadcn/ui may be used if introduced deliberately for reusable accessible primitives

The current Control Center is a React, TypeScript, Vite, Tailwind CSS app with `lucide-react`, `recharts`, and custom local components.

## Product Direction

Build a clean enterprise operational cockpit for a private/local Control Center. The interface should be dense but readable, calm, professional, task-oriented, and optimized for repeated operator use.

Prioritize user action over raw data. Use progressive disclosure. Prefer detail drawers over deep page jumps. Make the primary action obvious.

## Layout

- Use a persistent left sidebar for primary areas.
- Use a top status bar for mode, environment, freshness, safety, and search/context.
- Use a main content area for Today, lane summaries, blockers, and current operating work.
- Use a right drawer for details, evidence, audit trail, permission review, and provenance.
- Use a toast/status layer for feedback.
- Reuse layout components. Do not duplicate sidebar, header, drawer, table, or card code.

## Component Expectations

- Keep components typed.
- Use semantic HTML and accessible labels.
- Keep reusable components focused and composable.
- Use common primitives for badges, pills, cards, tables, filters, empty states, loading states, error states, drawers, and confirmation dialogs.
- Keep navigation state and selected detail state consistent.
- Do not create decorative hero sections or marketing layouts.
- Do not use unnecessary decorative gradients.

## Data and Governance

- Preserve Control Center governance semantics.
- Do not invent live APIs.
- Do not invent external execution.
- Do not invent public/client access.
- Do not invent deployment, publication, messaging, workflow activation, source mutation, sensitive import, financial execution, or unrestricted Execute.
- Use realistic mock data only where needed.
- Mock/static/generated/local data must be visibly marked when relevant.
- Automations rationale may appear as context.
- Freshness review is required only for current-truth promotion.
- Imported Automations references must not become Today tasks, active blockers, permissions, execution requirements, or live API facts unless existing code/docs support that distinction.

## UX Rules

- One primary action per surface.
- Show active blockers separately from archive/evidence.
- Show permission-required states separately from executed states.
- Mark forbidden actions as forbidden, not merely disabled.
- Let users inspect evidence without promoting it to authority.
- Make local/static/generated/live-read data mode visible.
- Empty, loading, and error states must explain the state and the next safe step.

