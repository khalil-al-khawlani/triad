# Project Status Report

This document is a reviewer-facing summary for repository readiness.

## Overall Status

- **Build**: PASS
- **Routing**: PASS
- **Content Linking**: PASS
- **Content Sync Verification**: PASS

## Verification Evidence

### 1) Build

```bash
npm run build
```

Result: successful Vite production build.

### 2) Content-to-Source Integrity

```bash
node scripts/report-content-sync.cjs
```

Expected: all linked entries report `MATCH`.

### 3) Exact Equality Check

```bash
node scripts/verify-content-sync-robust.cjs
```

Expected: `ROBUST_SYNC_OK`.

## Editorial Coverage

The dataset is organized by category and editorial type:

- Categories:
  - `heritage`
  - `technology`
  - `society`

- Editorial types:
  - `reports`
  - `articles`
  - `investigations`
  - `news`
  - `stories`
  - `infographics`

## Runtime Content Source Policy

- Every article that has `contentSource` must point to a real file under `public/data`.
- Article page loads content from `contentSource` when present.
- Content scripts are available to sync and verify any future updates.

## Reviewer Quick Start

```bash
npm install
npm run build
node scripts/report-content-sync.cjs
node scripts/verify-content-sync-robust.cjs
```

If these commands pass, the project is considered technically ready for repository review.
