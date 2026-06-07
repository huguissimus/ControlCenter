# Local Screenshot Capture

This procedure is local-only. It prepares screenshots for later v0/Stitch use without uploading anything, calling external services, changing runtime code, or committing binary screenshot files.

## Start The App

From the Control Center repo:

```bash
npm run dev
```

The Vite script is configured as:

```text
vite --host 127.0.0.1
```

Use the local URL printed by Vite, typically:

```text
http://127.0.0.1:5173/
```

If Vite chooses another port because 5173 is busy, use the printed local URL. Do not use tunnels, public preview URLs, hosted deployments, or remote services.

## Optional Local Control Plane

Only start the control plane if you deliberately need local/private operating-mode screenshots and have safe local configuration:

```bash
npm run control-plane:dev
```

Do not add, edit, display, or commit secrets. Do not capture passphrases, tokens, credentials, private client records, or sensitive source material. If private auth is enabled, capture the locked or safely authenticated local state only after verifying no sensitive values are visible.

## Preferred Viewports

- Desktop: `1440 x 1000`
- Laptop: `1280 x 900`
- Tablet: `1024 x 768`
- Mobile: `390 x 844`

Capture desktop first. Capture mobile only for the Today/default dashboard and one dense secondary surface if needed.

## Screens To Capture

Suggested filenames:

```text
01-today-dashboard-desktop.png
02-lane-summary-desktop.png
03-blockers-desktop.png
04-next-actions-desktop.png
05-evidence-archive-desktop.png
06-permissions-desktop.png
07-local-api-mode-desktop.png
08-mobile-today-dashboard.png
```

Recommended local-only folder:

```text
screenshots/control-center-ui-v0-stitch-export/
```

The repo already ignores `screenshots/`, so files placed there should remain untracked. Do not commit screenshot binaries unless a future repository convention explicitly asks for them.

## Capture Checklist

1. Open the local Vite URL.
2. Confirm the UI says private/local or fixture/local mode where relevant.
3. Confirm no secrets, credentials, passphrases, tokens, private client data, or sensitive records are visible.
4. Capture `01-today-dashboard-desktop.png` with `TopStatusBar`, `OperatingLaneTopNav`, `OperatorSummaryPanel`, and the top of the Today lane visible.
5. Capture `02-lane-summary-desktop.png` with a representative non-Today lane selected.
6. Capture `03-blockers-desktop.png` from the blocker/not-true claim surface or lane blocker section.
7. Capture `04-next-actions-desktop.png` from Today next actions or `PrepareActionQueuePanel`.
8. Capture `05-evidence-archive-desktop.png` from Archive / Evidence and provenance details.
9. Capture `06-permissions-desktop.png` from Governance permission panels such as `CommandGatePanel` or `PermissionedCommandCenterPanel`.
10. Capture `07-local-api-mode-desktop.png` from source/mode surfaces such as `BackendCockpitRecordsPanel`, `LocalControlPlaneStatusPanel`, or `OperatingModePanel`.
11. Capture `08-mobile-today-dashboard.png` at a mobile viewport.

## What Not To Capture

- Environment files or shell windows showing env vars.
- Passphrase entry text.
- Browser devtools with request headers or tokens.
- Private client records, sensitive source content, financial account details, credentials, or tokens.
- Any UI state that falsely implies external execution, deployment, publication, messaging, workflow activation, financial execution, or live API authority.

## Data Labels To Preserve

Screenshots should keep labels visible where possible:

- fixture/static
- generated/local
- local API read-only
- private authenticated operating
- locked/unavailable/error
- Automations rationale
- freshness review required for current-truth promotion
- permission-gated
- blocked/forbidden
- Prepare/review/dry-run, not executed

## Stop The Dev Server

Return to the terminal running Vite and press:

```text
Ctrl-C
```

If a local control-plane server was started, stop it the same way.

## Leave Uncommitted

Leave generated screenshots untracked under `screenshots/control-center-ui-v0-stitch-export/`. Commit only markdown manifests, prompts, and cleanup docs unless a future pass explicitly changes the repository screenshot policy.

