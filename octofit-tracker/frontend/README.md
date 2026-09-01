# OctoFit Tracker Frontend

This React app connects to the OctoFit backend using Codespaces-friendly URLs.

## Required environment variable

Create a local environment file at `.env.local` in this folder and define:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend builds API URLs in this pattern:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is missing, the app falls back to a safe local URL instead of generating `https://undefined-8000...` requests.

## Local development

```bash
npm install
npm run dev
```
