# SECURITY-AUDIT.md — SmartAI for Work

**Date:** 2026-07-09 · **Auditor:** Claude Code (defensive audit, report-only — no code modified)
**Scope:** Secrets & sensitive data exposure via browser DevTools (Sources / Network / Console / Application), server/client boundary, API routes, git history, compiled build output.

---

## Executive summary

**No secrets are exposed to end users.** This is a mostly-static content site with two email-sending API routes. There are **no Critical or High findings**. Specifically verified:

- ❌ No hardcoded API keys, tokens, connection strings, or private keys anywhere in `app/`, `lib/`, `content/`, or config files.
- ❌ No `NEXT_PUBLIC_*` variables exist at all (in `.env.local` or code) — nothing is intentionally embedded in the client bundle.
- ❌ No database clients, ORMs, or Supabase/Firebase SDKs in the project (no RLS surface; sections 3 of the brief are N/A).
- ❌ No `localStorage` / `sessionStorage` / `document.cookie` usage in any client code.
- ❌ No `console.log` of tokens or user objects — the only console calls are two server-side `console.error` in API routes (never reach the browser).
- ❌ `productionBrowserSourceMaps` is not enabled; no `.map` files in `.next/static`.
- ✅ `.env*` is gitignored and **no `.env` file was ever committed** (`git log --all --diff-filter=A -- "*.env*"` is empty; full-history grep for password/key patterns found only the string `GMAIL_APP_PASSWORD` as an env-var *name* in a commit message).
- ✅ Build-output proof: after `npm run build`, grepping `.next/static/**` for `sk_live|service_role|api_key|postgres|mongodb|GMAIL` and the literal values from `.env.local` returned **zero matches**.
- ✅ The only server secrets (`GMAIL_USER`, `GMAIL_APP_PASSWORD`) are read exclusively in `app/api/**/route.ts` (server-only code), never in `"use client"` files. The local `.env.local` currently holds a **placeholder** password (`xxxx xxxx xxxx xxxx`), not a real credential.

What remains are Medium/Low hardening issues in the two API routes and repo hygiene.

## Summary table

| # | Finding | Severity | Location | DevTools exploitability |
|---|---------|----------|----------|-------------------------|
| 1 | Contact/newsletter endpoints have **no rate limiting or bot protection** — anyone can POST from DevTools/curl in a loop | **Medium** | `app/api/contact/route.ts:4`, `app/api/newsletter/route.ts:4` | F12 → Network → copy as fetch → replay ∞. Spams your inbox, burns Gmail's ~500/day send quota, can get the Gmail account temporarily blocked (form outage) |
| 2 | **HTML injection into notification emails** — `name`, `subject`, `message`, `email` are interpolated raw into the email HTML body | **Medium** | `app/api/contact/route.ts:24-32`, `app/api/newsletter/route.ts:23-29` | Attacker POSTs `message: "<a href='https://evil.example'>…"` → crafted phishing content rendered in your inbox, appearing to come from your own trusted form |
| 3 | **No input length limits** on contact fields — multi-MB payloads accepted and mailed | Low | `app/api/contact/route.ts:6-10` | Trivial abuse amplifier for #1 |
| 4 | `subject`/`name` injected into the email **Subject header** unmodified | Low | `app/api/contact/route.ts:24` | Nodemailer encodes header newlines (no classic header injection), but subject spoofing aids the #2 phishing scenario |
| 5 | **`devlog 2.txt` is committed** to the (public) repo — contains dev-session logs incl. LAN IP `192.168.100.131` and internal route timings | Low | `devlog 2.txt` (tracked; `devlog.txt` is ignored but `devlog 2.txt` slipped past the ignore rule) | Visible to anyone on GitHub, not via the site. Info disclosure only — no credentials inside (verified) |
| 6 | **`.claude/` directory is untracked and not gitignored** — `settings.local.json` / `launch.json` could be committed by a future `git add .` | Low (preventive) | `.gitignore`, `.claude/` | No secrets in them today (verified); risk is future leakage since your deploy workflow is `git add .` |
| 7 | Hardcoded destination email `smartaiforwork@gmail.com` in server routes | Info | `app/api/contact/route.ts:22`, `app/api/newsletter/route.ts:22` | Server-only, never in the bundle (verified in `.next/static`). Not a leak — noted for completeness |

## Evidence

- **Env file** — [.env.local](.env.local) (untracked, gitignored):
  `GMAIL_USER=smartaiforwork@gmail.com` / `GMAIL_APP_PASSWORD=xxxx •••• xxxx` → **placeholder value**, not a live credential. Real value presumably lives only in Vercel env vars (correct place).
- **Git history**: `git log --all --diff-filter=A -- "*.env*"` → empty. `git log -p --all | grep -aiE "GMAIL_APP_PASSWORD|sk_live|AKIA|AIza|ghp_"` → only hit is a commit message: *"Requires GMAIL_USER and GMAIL_APP_PASSWORD env vars on Vercel."* (names only, no values).
- **Bundle grep**: `grep -rEli "sk_live|service_role|GMAIL_APP_PASSWORD|postgres://|mongodb|api_key" .next/static/` → 0 files. `grep -rl "smartaiforwork@gmail.com" .next/static/` → 0 files.
- **Injection example (finding #2)**: `app/api/contact/route.ts:32` — `...>${message}</td>` with `message` taken directly from `await req.json()`.

## Fix plan (per finding, in order)

1. **Rate limiting** — Add a per-IP limiter to both routes. Zero-dependency option: in-memory `Map<ip, timestamps>` allowing e.g. 3 requests / 10 min per IP (fine on Vercel Fluid Compute for this traffic level; accept that it resets on cold start). Sturdier: Upstash Redis rate limit via Vercel Marketplace, or a Vercel WAF rate-limit rule on `/api/*` (no code change). Also add a honeypot field on the forms.
2. **Escape user input in email HTML** — Add a small `escapeHtml()` helper (replace `& < > " '`) and wrap every interpolated value in both route templates. Keep `replyTo: email` (validated) but validate `email` with the same regex used in the newsletter route.
3. **Length limits** — Reject bodies where `name > 100`, `subject > 200`, `email > 254`, `message > 5000` chars; return 400.
4. **Subject hardening** — Covered by #2/#3 (escape + cap length); optionally strip `\r\n` from `name`/`subject` explicitly.
5. **Remove `devlog 2.txt` from the repo** — `git rm --cached "devlog 2.txt"` and change the `.gitignore` rule `devlog.txt` → `devlog*.txt`. (History rewrite not warranted — content is low-sensitivity.)
6. **Ignore `.claude/` local files** — Add `.claude/settings.local.json` (or `.claude/`) to `.gitignore` before the next `git add .`.
7. No action needed (informational).

## Rotation list

**Nothing requires rotation.** No secret value was ever committed to git or embedded in a client bundle. The local `GMAIL_APP_PASSWORD` is a placeholder. If the real Gmail App Password has ever been pasted anywhere outside Vercel's env settings (chat logs, screenshots, another repo), rotate it at myaccount.google.com/apppasswords as a precaution — but this audit found no such exposure.

## Verification commands used

```bash
# secret patterns across source (node_modules/.next/.git excluded)
grep -rniE "api[_-]?key|secret|token|password|private[_-]?key|sk_live|AKIA|AIza|ghp_|eyJhbGciOi|mongodb|postgres" app lib content next.config.ts
# env hygiene
git log --all --diff-filter=A -- "*.env*"        # → empty
git log -p --all | grep -aiE "GMAIL_APP_PASSWORD|sk_live"   # → env-var names only
# client/server boundary
grep -rn "process.env" app lib                    # → only app/api/**/route.ts
grep -rn "NEXT_PUBLIC" app lib .env.local         # → none
# build output proof
npm run build && grep -rEli "sk_live|service_role|GMAIL|api_key|postgres|mongodb" .next/static/   # → 0 matches
```
