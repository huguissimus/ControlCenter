---
name: Argument OS Control Center
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c6c6cd'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#909097'
  outline-variant: '#45464d'
  surface-tint: '#bec6e0'
  primary: '#bec6e0'
  on-primary: '#283044'
  primary-container: '#0f172a'
  on-primary-container: '#798098'
  inverse-primary: '#565e74'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#dec29a'
  on-tertiary: '#3e2d11'
  tertiary-container: '#231500'
  on-tertiary-container: '#957d5a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
  surface-bg: '#020617'
  surface-low: '#0F172A'
  surface-mid: '#1E293B'
  surface-high: '#334155'
  status-success: '#10B981'
  status-warning: '#F59E0B'
  status-danger: '#EF4444'
  status-info: '#0EA5E9'
  status-pending: '#64748B'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter-compact: 8px
  gutter-normal: 16px
  margin-edge: 24px
  panel-padding: 12px
---

## Brand & Style
The design system for this product is an **Operational Console**—a high-density, task-oriented environment designed for professional operators who manage private, high-stakes data. The aesthetic is "Sober Technical": it avoids all decorative fluff in favor of extreme clarity, data hierarchy, and operational status.

The style is a hybrid of **Minimalism** and **Corporate Modern**, utilizing a "dark-first" foundation to reduce eye strain during long-term monitoring. It evokes the feeling of a private flight deck or a secure command center: everything is visible, everything is gated, and every status is absolute. 

**Key Principles:**
- **Authority through Clarity:** Use strict alignment and typographic hierarchy to define truth versus evidence.
- **Controlled Density:** Information is packed tightly but remains scannable through purposeful use of whitespace and borders.
- **Safety-First UI:** Status colors (Emerald, Amber, Crimson) are used sparingly but with high contrast to ensure critical blockers are never missed.

## Colors
The palette is built on a "Deep Slate" foundation. The primary background is nearly black to provide maximum depth, while tiered surfaces (low to high) use increasing lightness to denote elevation and focus.

- **Foundational Navy/Slate:** Used for the global shell and structural elements.
- **Operational Accents:** 
    - **Emerald (#10B981):** Safe, executed, or verified truth.
    - **Amber (#F59E0B):** Review required, prepare mode, or freshness risks.
    - **Crimson (#EF4444):** Blocked, forbidden, or critical errors.
- **Interactive Slate:** Secondary blue-ish slates are used for interactive states (hover/active) to maintain a professional, calm demeanor.

## Typography
The system uses **Inter** for its exceptional legibility at small sizes and high-density layouts. For technical metadata and automated rationale, **JetBrains Mono** is introduced to provide a distinct "system-level" feel.

**Hierarchy Rules:**
- **Headlines:** Reserved for Lane names and primary Panel headers. Keep them concise.
- **Labels (Caps):** Used for metadata categories (e.g., "SOURCE", "AUTHORITY TIER").
- **Mono Data:** Used for record IDs, timestamps, and "Backend-shaped" mock data to distinguish it from human-readable summaries.
- **Scanning:** Heavy use of font-weight (Semi-Bold/Bold) to highlight "Next Safe Actions" within dense text blocks.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model optimized for wide-screen monitoring.

- **Primary Structure:** A fixed-width left sidebar (240px) for high-level navigation (Lanes/Blockers), a fluid main canvas for operational data, and a collapsible right drawer (380px) for Evidence/Details.
- **Grid:** A 12-column grid is used within the main canvas for dashboard modules.
- **Compact Rhythm:** A 4px base unit is used. Operational lists and tables should use `gutter-compact` (8px) to maximize the "at-a-glance" visibility of data.
- **Breakpoints:**
    - Desktop (1440px+): Full 3-pane view.
    - Tablet (1024px): Sidebar collapses to icons.
    - Mobile: Today dashboard reflows to a single-column vertical stack with top-bar navigation.

## Elevation & Depth
In this system, depth is conveyed through **Tonal Layering** rather than traditional shadows. This maintains the "Console" feel and ensures clarity in dark mode.

- **Background:** The deepest layer (`surface-bg`).
- **Panels/Cards:** Use `surface-low` with a 1px border of `surface-mid`.
- **Active/Focused Elements:** Use `surface-high` to bring elements visually closer to the operator.
- **Borders:** Use low-contrast 1px outlines (`#334155`) to define zones. Shadows should be avoided except for temporary overlays (modals), where a tight, 10% black shadow can be used to prevent "floating" visuals.

## Shapes
The design system uses **Soft (0.25rem)** roundedness. This provides just enough curvature to feel professional and modern without losing the "industrial" precision of the console. 

- **Interactive Elements:** Buttons and Inputs use the base `rounded` (4px).
- **Containers:** Large dashboard panels or the sidebar use `rounded-lg` (8px).
- **Status Indicators:** Status pips and small chips may use "Pill" shapes to distinguish them from structural elements.

## Components
- **Buttons:**
    - **Primary:** Filled with Primary color. High contrast.
    - **Action-Safe:** Emerald outline. Indicates an executable safe action.
    - **Action-Forbidden:** Crimson text with a strike-through or disabled icon.
- **Status Chips:** Small, high-contrast badges (e.g., "GATE A", "LOCAL ONLY"). Use the `mono-data` font.
- **Data Tables:** Minimalist. No vertical borders. Header rows use `label-caps` typography. Hover states use `surface-mid`.
- **Command Gates:** A specific panel component containing a "Prepare" toggle and a gated "Execute" button. It must always show the "Permission Required" status explicitly.
- **Evidence Drawers:** Slides from the right. Uses a slightly darker background than the main canvas to indicate it is a secondary/historical reference.
- **Input Fields:** Dark background (`surface-bg`) with a 1px border. Focus state uses the `secondary` light blue.