# Ditems — Portfolio CV · Michael Metinhoue

Live website: **[ditems.fr](https://ditems.fr)**

---

## What is this?

This is Michael's online CV — a single-page website that presents his professional profile as a Data Engineer & Cloud Architect. Visitors can read about his experience, certifications, and projects, then send him a message directly from the site.

There is **no server, no database, no login**. Everything runs in the visitor's browser. The only external service used is [EmailJS](https://www.emailjs.com/) to send contact form messages.

---

## How it works — the big picture

```
You write code → push to main → GitHub builds the site → GitHub Pages serves it at ditems.fr
```

1. The source code lives in this repository (branch `dev` for development, `main` for production).
2. Every push to `main` triggers an automated build via **GitHub Actions** (see `.github/workflows/deploy.yml`).
3. The build tool (**Vite**) compiles all the TypeScript + React code into plain HTML/CSS/JS files inside a `dist/` folder.
4. Those files are automatically pushed to the `gh-pages` branch.
5. GitHub Pages reads that branch and serves it at `ditems.fr`.

The CV PDF is served directly from GitHub's raw file URL — no hosting setup needed.

---

## Tech stack — explained simply

| What you see | What it actually is |
|---|---|
| The UI framework | **React 18** — components that render the page |
| The build tool | **Vite** — compiles and bundles the code fast |
| The language | **TypeScript** — JavaScript with type safety |
| The styling | **Tailwind CSS** — utility classes, no separate CSS files |
| The UI components | **shadcn/ui** — pre-built accessible components (buttons, cards, etc.) |
| The forms | **React Hook Form + Zod** — form state management + input validation |
| The email sender | **EmailJS** — sends emails from the browser without a backend |
| The translations | **i18next** — FR/EN language support, auto-detected from the browser |

---

## Project structure — what's where

```
ditems-data-craft/
├── src/
│   ├── pages/
│   │   └── Index.tsx         ← The one and only page (assembles all sections)
│   ├── components/
│   │   ├── Header.tsx        ← Top navigation bar
│   │   ├── Hero.tsx          ← Big intro section with name/title
│   │   ├── About.tsx         ← Bio + skill bars + certifications preview
│   │   ├── Experience.tsx    ← Professional history (6 roles)
│   │   ├── Certifications.tsx← 4 Microsoft certifications
│   │   ├── Work.tsx          ← Project showcase
│   │   ├── Contact.tsx       ← Contact form (sends via EmailJS)
│   │   └── FloatingDownload.tsx ← Floating CV download button
│   ├── i18n/
│   │   └── locales/
│   │       ├── en.json       ← English texts
│   │       └── fr.json       ← French texts
│   └── utils/
│       └── security.ts       ← Input sanitization helpers
├── resume/
│   └── CV_METINHOUE_FR.pdf   ← The downloadable CV
├── .github/workflows/
│   └── deploy.yml            ← Automated deployment to GitHub Pages
├── architecture.md           ← Full technical documentation
├── features.md               ← Feature inventory and known issues
└── changelog.md              ← History of changes
```

---

## How to run it locally

You need **Node.js** installed (v18 or later). If you don't have it: [nodejs.org](https://nodejs.org).

```sh
# 1. Clone the repo
git clone https://github.com/MickyMik/ditems-data-craft.git
cd ditems-data-craft

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open your browser at `http://localhost:8080`. The page reloads automatically when you save a file.

---

## How to deploy

**Automatic** — just push to `main`:

```sh
git checkout main
git merge dev
git push origin main
```

GitHub Actions does the rest. The site is live at `ditems.fr` within ~2 minutes.

**To check deployment status**: go to the repository → Actions tab → watch the latest workflow run.

---

## How the contact form works

The form does **not** use a backend server. Instead:

1. The visitor fills in the form (name, email, subject, message).
2. The browser validates the inputs (format check, length, anti-spam 60s cooldown).
3. On submit, **EmailJS** sends the message directly from the browser to Michael's inbox using pre-configured API keys.
4. No data is stored anywhere — it goes straight to email.

EmailJS credentials (in `src/components/Contact.tsx`):
- These keys are intentionally public — EmailJS is designed to work this way client-side.

---

## Language support

The site supports **French and English**. The language is automatically detected from the visitor's browser settings.

- If the browser language is French → site shows in French
- Otherwise → site shows in English

Translations live in `src/i18n/locales/en.json` and `fr.json`.

> Note: some sections (Experience, Certifications) are currently hardcoded in English only — full translation is planned.

---

## Git branches

| Branch | Purpose |
|---|---|
| `dev` | Active development — make changes here |
| `main` | Production — every push here triggers a deployment |
| `gh-pages` | Auto-generated build artifact — do not edit manually |
| `backup/ameliorations-2026-05-05` | Saved refactor attempt (not merged) |

---

## Copyright

If you clone or reuse this project, please credit the original author.
Contact: [admin.demarches@ditems.fr](mailto:admin.demarches@ditems.fr)
