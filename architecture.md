# Architecture — Ditems Portfolio CV

> Source de vérité architecturale. À lire avant toute modification. À mettre à jour après chaque évolution.
> **Branche de référence :** `dev` | **Branche de production :** `main` → `gh-pages`

---

## Vue générale

### Objectif du projet
Site web CV en ligne pour Michael Metinhoue, Data Engineer / Cloud Architect spécialisé Azure.
Présente le profil professionnel, les expériences, les certifications et les projets, avec un formulaire de contact fonctionnel.
Conçu pour évoluer vers une intégration IA (assistant conversationnel contextualisé) sans rupture architecturale.

### Stack technique

| Couche | Technologie | Version |
|---|---|---|
| Framework UI | React | 18.3.1 |
| Build tool | Vite | 5.4.x |
| Langage | TypeScript | 5.5.3 |
| Styling | Tailwind CSS | 3.4.11 |
| UI Components | shadcn/ui (Radix UI) | — |
| Routing | React Router DOM | 6.x |
| State / Data | TanStack React Query | 5.56.2 |
| Formulaires | React Hook Form + Zod | 7.53 / 3.23 |
| i18n | i18next + react-i18next | 25.x / 16.x |
| Email | @emailjs/browser | 4.x |
| Icons | Lucide React | 0.462.0 |
| Notifications | Sonner + Radix Toast | — |
| Linting | ESLint + typescript-eslint | 9.x |

### Structure globale

```
ditems-data-craft/
├── public/                   # Assets statiques (favicon, images)
│   └── lovable-uploads/      # Images uploadées (logo, photos)
├── resume/                   # CV PDF (servi via GitHub raw URL)
│   └── CV_METINHOUE_FR.pdf
├── src/
│   ├── App.tsx               # Racine : providers, routing
│   ├── main.tsx              # Point d'entrée Vite + init i18n
│   ├── index.css             # Variables CSS globales (design tokens HSL)
│   ├── pages/
│   │   ├── Index.tsx         # Page principale one-page (compose toutes les sections)
│   │   └── NotFound.tsx      # Fallback 404
│   ├── components/
│   │   ├── Header.tsx        # Navigation fixe, mobile menu, logo, sélecteur langue, active section
│   │   ├── Hero.tsx          # Section d'accroche hero (typewriter, compteurs, blobs)
│   │   ├── About.tsx         # À propos, compétences animées, cards strengths
│   │   ├── Experience.tsx    # Parcours professionnel (6 postes, timeline animée)
│   │   ├── Certifications.tsx# 4 certifications Microsoft (TiltCard + shimmer)
│   │   ├── Work.tsx          # 3 vrais projets (TiltCard + shimmer)
│   │   ├── Contact.tsx       # Formulaire de contact (EmailJS, état succès animé)
│   │   ├── FloatingDownload.tsx # Bouton flottant téléchargement CV
│   │   ├── ScrollProgress.tsx# Barre de progression scroll (top, 3px)
│   │   ├── SectionTitle.tsx  # Titre h2 animé slide-up + underline grow
│   │   ├── TiltCard.tsx      # Wrapper 3D perspective au survol
│   │   ├── ErrorBoundary.tsx # Gestion globale des erreurs React
│   │   └── ui/               # Primitives shadcn/ui (~50 composants)
│   ├── hooks/
│   │   ├── use-mobile.tsx    # Détection breakpoint mobile
│   │   ├── use-toast.ts      # Hook notifications
│   │   ├── use-intersection.tsx # IntersectionObserver one-shot (scroll animations)
│   │   ├── use-typewriter.tsx# Effet machine à écrire (char by char)
│   │   ├── use-counter.tsx   # Compteur animé ease-out cubique (rAF)
│   │   └── use-active-section.tsx # Section active au scroll (IntersectionObserver)
│   ├── i18n/
│   │   ├── config.ts         # Configuration i18next (FR/EN auto-detect)
│   │   └── locales/
│   │       ├── en.json       # Traductions anglaises
│   │       └── fr.json       # Traductions françaises
│   ├── lib/
│   │   └── utils.ts          # cn() utility (clsx + tailwind-merge)
│   └── utils/
│       └── security.ts       # Helpers sécurité (XSS, rate limit, URL)
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD : build + deploy sur gh-pages (déclenché sur push main)
├── architecture.md           # Ce fichier
├── features.md               # Documentation des fonctionnalités
├── changelog.md              # Historique des évolutions
├── tailwind.config.ts        # Configuration Tailwind + design tokens
├── components.json           # Configuration shadcn/ui
├── vite.config.ts            # Configuration Vite (base: '/', optimizeDeps emailjs-com)
├── tsconfig.json             # Configuration TypeScript
├── CNAME                     # Domaine personnalisé GitHub Pages (ditems.fr)
├── 404.html                  # Fallback SPA pour GitHub Pages
└── package.json
```

### Conventions
- Alias path `@/` → `src/` (tsconfig + vite.config)
- Composants en PascalCase, hooks en camelCase préfixés `use-`
- Fichiers TypeScript `.tsx` pour tout composant React
- Tailwind CSS utility-first, aucun CSS module
- Variables CSS dans `index.css` (design tokens : couleurs, gradients, shadows)
- Données des sections hardcodées dans les composants (pas de store global ni CMS)

### Principes d'architecture
- SPA (Single Page Application) pure — une seule route `/`
- Architecture one-page avec scroll navigation entre sections
- Pas de store global — état local (`useState`) par composant
- Pas de backend, pas d'API, pas de base de données
- Sécurité côté client : validation Zod + sanitisation inputs
- Accessibilité : aria-labels sur liens/boutons iconiques, HTML sémantique

---

## Frontend

### Framework
React 18 avec Vite (plugin SWC). Rendu côté client uniquement (CSR). Site statique déployé via GitHub Pages.

### Organisation des composants
Deux niveaux :
1. **Composants métier** (`src/components/*.tsx`) — sections du CV, données hardcodées en interne
2. **Composants UI** (`src/components/ui/*.tsx`) — primitives shadcn/ui (Radix UI)

### Routing
React Router DOM v6 en `BrowserRouter`. Deux routes :
- `/` → `Index.tsx` (page complète)
- `*` → `NotFound.tsx`

Navigation interne via `scrollIntoView({ behavior: 'smooth' })` par `id` HTML.
Un `404.html` redirige les accès directs vers `index.html` (nécessaire pour les SPA sur GitHub Pages).

### Gestion d'état
- **Local state** : `useState` (menu mobile, scroll header)
- **Formulaires** : React Hook Form + Zod
- **Server state** : TanStack React Query (installé, non utilisé activement — préparation future API)
- Pas de Redux, Zustand, ni autre store global

### Design system
Basé sur shadcn/ui + Tailwind CSS. Design tokens définis dans `index.css` (variables CSS HSL) :

| Token | Usage |
|---|---|
| `--navy` | Titres principaux |
| `--blue-bright` | Accents |
| `--blue-light` | Badges, backgrounds secondaires |
| `--gradient-hero` | Background section Hero |
| `--gradient-primary` | Cards d'accroche, boutons |
| `--shadow-card`, `--shadow-hover`, `--shadow-glow` | Élévations |

Animations Tailwind personnalisées : `animate-float`, `animate-pulse-glow`, `animate-slide-up`, `animate-shimmer`, `animate-blink`, `animate-gradient-shift`, `animate-count-up`.

Variants de boutons custom : `hero`, `download`, `contact`.

### Stratégie responsive
Mobile-first via Tailwind. Breakpoints utilisés :
- `md:` (768px) — navigation desktop, grilles 2 colonnes
- `lg:` (1024px) — grilles 2–3 colonnes (Work, Contact)
- Container max-width `1400px` (breakpoint `2xl`)

Menu mobile : overlay plein écran, fermeture automatique au clic sur item.

### Accessibilité
- `aria-label` sur tous les liens sociaux et boutons icôniques
- Structure HTML sémantique (`<header>`, `<section>`, `<nav>`)
- Focus visible natif (Radix UI)
- Alt sur le logo (`alt="Ditems Logo"`)

### Optimisation performances
- Vite + `@vitejs/plugin-react-swc` (compilation SWC rapide)
- Pas de lazy loading (volume faible, non nécessaire)
- Bundle JS ~430–510 kB gzippé ~133–158 kB (avertissement Vite > 500 kB — acceptable)

---

## Backend

### État actuel
**Aucun backend ni API.** Projet entièrement statique.

Seules interactions "serveur" :
- **EmailJS** : envoi d'emails depuis le navigateur via service tiers (clés publiques dans le code — conçu pour usage client)
- **GitHub raw** : téléchargement du CV PDF depuis `https://raw.githubusercontent.com/MickyMik/ditems-data-craft/main/resume/CV_METINHOUE_FR.pdf`

### Besoins backend potentiels

| Besoin | Déclencheur |
|---|---|
| Chat IA contextualisé | Intégration assistant IA sur le profil |
| Contact sécurisé | Migrer de EmailJS vers API propre |
| Analytics | Suivi des visites et interactions |
| CMS | Mise à jour du contenu sans redéploiement |

### Futures orientations
- **API serverless** : Vercel Functions ou Netlify Functions (zéro infrastructure)
- **Edge functions** : latence minimale, proximité géographique
- **Route de chat** : `/api/chat` avec streaming SSE (Vercel AI SDK ou Anthropic SDK)
- **Authentification** : non requise pour le CV public

### Contraintes à prévoir
- Clés EmailJS côté client : acceptables (conçu pour ça). Migrer vers API pour sécuriser les vrais secrets
- Rate limiting actuellement côté client uniquement (localStorage) — à déplacer côté serveur si API ajoutée

---

## Base de données

### État actuel
**Aucune base de données.** Aucune persistance serveur.

Stockage local utilisé :
- `localStorage["lastContactSubmission"]` : timestamp anti-spam formulaire contact (60s entre envois)

### Besoins futurs possibles
Si backend ajouté :
- Messages de contact (actuellement perdus sauf dans EmailJS)
- Historique chat IA (si assistant conversationnel)
- Données de profil (si CMS)

---

## IA

### État actuel
**Aucune intégration IA active.**

TanStack React Query en place — pourra gérer les appels à une future API IA (cache, retry, loading states).

### Intégration future planifiée — Chat IA contextualisé

| Élément | Valeur envisagée |
|---|---|
| Provider | Anthropic Claude API |
| Modèle | claude-sonnet-4-6 ou supérieur |
| Endpoint | `/api/chat` (à créer) |
| Streaming | Server-Sent Events (SSE) |
| Prompt système | Contexte CV + profil Michael |
| Mémoire | Session uniquement (20 messages max) |
| Fallback | Message d'erreur gracieux si API indisponible |

---

## Infrastructure

### Hébergement
- **Production** : GitHub Pages — branche `gh-pages`, domaine `ditems.fr` (CNAME)
- **PDF CV** : GitHub raw URL (`main/resume/CV_METINHOUE_FR.pdf`)

### CI/CD
Fichier : `.github/workflows/deploy.yml`

| Étape | Détail |
|---|---|
| Déclencheur | Push sur `main` |
| Runtime | `ubuntu-latest`, Node.js 20 |
| Install | `npm install` |
| Build | `npm run build` → `dist/` |
| Upload | `actions/upload-pages-artifact@v3` |
| Deploy | `actions/deploy-pages@v5` (méthode officielle GitHub) |
| Concurrence | `group: "pages", cancel-in-progress: false` |

**Flux de déploiement :**
```
commit sur dev → PR → merge dans main → push main → GitHub Actions → build → gh-pages → ditems.fr
```

### Variables d'environnement
Aucune variable d'environnement Vite configurée (`.env` absent).
Clés EmailJS hardcodées dans `Contact.tsx` :
- `SERVICE_ID = "service_t6so8r5"`
- `TEMPLATE_ID = "template_meqf9bp"`
- `PUBLIC_KEY = "IobH6oMwMiIETnEVh"`

> Ces clés sont publiques par conception (EmailJS client-side). Si une future API est ajoutée, les secrets doivent passer par des variables `VITE_` (publiques) ou des secrets GitHub Actions (privés).

### Sécurité
- Validation inputs : Zod + `src/utils/security.ts`
- XSS : `escapeHtml()`, `sanitizeInput()`, regex sur les champs
- Rate limiting : localStorage côté client (60s entre envois)
- Liens externes : `rel="noopener noreferrer"` + `target="_blank"`
- Headers sécurité dans `index.html` : X-Content-Type-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy

### Branches git

| Branche | Rôle |
|---|---|
| `main` | Production — tout push déclenche un déploiement |
| `dev` | Développement — source de vérité du code |
| `gh-pages` | Artefact de déploiement (généré automatiquement) |
| `backup/ameliorations-2026-05-05` | Sauvegarde d'une session de refonte annulée |

---

## Décisions architecturales

### ADR-001 — SPA statique sans backend
Date : 2026-05-05

#### Contexte
CV en ligne personnel. Besoins limités : affichage d'informations, formulaire de contact, téléchargement CV.

#### Décision
Architecture 100% front-end statique. EmailJS pour le formulaire, GitHub raw pour le PDF.

#### Conséquences
- Déploiement simple, coût hébergement nul
- Pas de secrets serveur à gérer
- Limitation : fonctionnalités dynamiques impossibles sans refactoring backend

---

### ADR-002 — shadcn/ui comme design system
Date : 2026-05-05

#### Contexte
Besoin d'un design system cohérent, accessible, sans dépendance externe lourde.

#### Décision
shadcn/ui (copier-coller de composants Radix UI + Tailwind). Composants dans le dépôt, pas une dépendance externe.

#### Conséquences
- Contrôle total sur le code des composants
- Facilement customisable via tokens CSS
- ~50 composants installés, volume de fichiers UI important

---

### ADR-003 — i18next pour internationalisation FR/EN
Date : 2026-05-05

#### Contexte
Profil international, clients potentiels FR et EN.

#### Décision
i18next avec détection automatique de la langue du navigateur. Fallback anglais.

#### Conséquences
- Textes UI (Header, Hero, About) traduits via `t('clé')`
- Données structurées (expériences, certifs, projets) hardcodées en anglais uniquement — dette i18n connue
- Pas de sélecteur de langue visible dans l'UI

---

### ADR-004 — GitHub Pages avec branche gh-pages dédiée
Date : 2026-05-05

#### Contexte
Besoin d'un hébergement gratuit avec domaine personnalisé pour un site statique.

#### Décision
GitHub Pages sur branche `gh-pages`, déploiement automatisé via GitHub Actions sur push `main`. Domaine `ditems.fr` via CNAME.

#### Conséquences
- `base: '/'` dans `vite.config.ts` (requis avec domaine custom, pas avec sous-chemin GitHub)
- `404.html` nécessaire pour le routage SPA
- Tout push sur `main` déclenche un déploiement — la branche `main` doit toujours builder
