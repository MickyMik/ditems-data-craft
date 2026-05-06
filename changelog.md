# Changelog — Ditems Portfolio CV

> Historique des évolutions du projet. À mettre à jour après chaque session de travail.
> Format : `[DATE] — Description. Branche : X. Commit : Y.`

---

## 2026-05-05 — Session de refonte puis rollback complet

### Contexte
Session de travail complète ayant abouti à une tentative de refonte avortée, suivie d'un rollback, de corrections git et d'une remise en état de la production.

---

### Gouvernance documentaire (branche : dev)

**Créé**
- `architecture.md` — Source de vérité architecturale (stack, structure, frontend, backend, IA, infrastructure, ADRs)
- `features.md` — Inventaire complet des fonctionnalités existantes et planifiées
- `changelog.md` — Ce fichier (historique des évolutions)

**Motivation** : Mise en place d'un système de gouvernance documentaire pour permettre à l'IA (Claude) de maintenir une cohérence entre les sessions de travail.

---

### Tentative de refonte — annulée (branche : backup/ameliorations-2026-05-05)

**Objectif initial** : Corriger les failles de sécurité, les points d'évolution identifiés, rendre le site plus dynamique.

**Améliorations tentées** (commits `7a36ec1` et `ab00dbd` sur dev) :
- Hook `use-intersection.tsx` — animations au scroll (IntersectionObserver)
- `Hero.tsx` — effet typewriter + stats (projets, années d'exp, certifications)
- `Experience.tsx` — layout timeline vertical
- `Work.tsx` — vrais projets avec filtres par catégorie
- `Contact.tsx` — sécurisation (@emailjs/browser, honeypot anti-bot, security.ts intégré)
- `Header.tsx` — sélecteur de langue visible + mise en évidence de la section active
- `i18n/locales/*.json` — traductions FR+EN étendues
- `vite.config.ts` — migration de `emailjs-com` vers `@emailjs/browser`

**Régression constatée** : Page blanche après les améliorations.
- Cause identifiée : `vite.config.ts` conservait `optimizeDeps: { include: ["emailjs-com"] }` alors que `emailjs-com` avait été désinstallé.
- Fix appliqué puis rollback décidé malgré le fix, suite à d'autres régressions non identifiées précisément.

**Décision** : Rollback complet vers l'état initial stable.

---

### Rollback vers l'état stable

**Actions effectuées**
- Création de la branche de sauvegarde : `git checkout -b backup/ameliorations-2026-05-05`
- Reset local vers commit stable : `git reset --hard HEAD~2` (retour à l'état avant les 2 commits d'amélioration)
- Push forcé de la branche dev restaurée : `git push --force-with-lease origin dev`

**État git après rollback**
| Branche | Commit | État |
|---|---|---|
| `dev` | `c66b943` (test) | Stable — état avant améliorations |
| `main` | `c777261` | Production |
| `gh-pages` | — | Artefact de déploiement |
| `backup/ameliorations-2026-05-05` | `ab00dbd` | Sauvegarde de la refonte |

---

### Corrections git

**Problème 1** : `fatal: invalid value for 'pull.rebase': '-force'`
- Cause : git config `pull.rebase` définie à `-force` (valeur invalide, probablement par VSCode)
- Fix : `git config --unset pull.rebase`

**Problème 2** : Branches divergentes après reset
- Fix : `git reset --hard origin/dev` pour aligner local sur remote

---

### Correctif GitHub Pages (production)

**Problème** : `ditems.fr` ne fonctionnait plus — GitHub Pages semblait servir une version corrompue ou obsolète.

**Diagnostic** : Les assets sur la branche `gh-pages` existaient et `index.html` les référençait correctement. Cause probable : déploiement gh-pages corrompu ou stale.

**Fix** : Commit vide sur `main` pour forcer un redéploiement propre via GitHub Actions.
```
git commit --allow-empty -m "chore: force redeploy gh-pages"
git push origin main
```
Ce push a déclenché le workflow `.github/workflows/deploy.yml` → build + deploy sur `gh-pages`.

---

## État stable au 2026-05-05

### Fonctionnalités en place
Voir `features.md` — section "Fonctionnalités existantes".

### Dette technique ouverte
| # | Problème | Composant |
|---|---|---|
| ~~1~~ | ~~Projets fictifs (placeholder)~~ — **Résolu** | `Work.tsx` |
| ~~2~~ | ~~Liens de vérification invalides~~ — **Résolu** | `Certifications.tsx` |
| ~~3~~ | ~~Bouton "Get In Touch" non relié à `#contact`~~ — **Résolu** | `Hero.tsx` |
| ~~4~~ | ~~`emailjs-com` déprécié~~ — **Résolu** | `Contact.tsx` |
| ~~5~~ | ~~CV uniquement en français~~ — **Résolu** | `FloatingDownload.tsx`, `Header.tsx` |
| ~~6~~ | ~~i18n incomplète~~ — **Résolu** | Multiples |
| ~~7~~ | ~~Pas de sélecteur de langue dans l'UI~~ — **Résolu** | `Header.tsx` |
| ~~8~~ | ~~`security.ts` non intégré dans Contact.tsx~~ — **Résolu** | `Contact.tsx` |

### Fonctionnalités planifiées
Voir `features.md` — section "Fonctionnalités planifiées".

---

## 2026-05-05 — Animations au scroll (IntersectionObserver)

### Contexte
Les sections étaient statiques à l'entrée dans le viewport. Les barres de compétences n'étaient pas animées.

### Changements
- **Créé** : `src/hooks/use-intersection.tsx` — hook `useIntersection` basé sur IntersectionObserver, one-shot, fallback navigateurs anciens
- **Modifié** : `src/components/About.tsx` — barres de compétences animées (0% → niveau, stagger ×100ms) + cards strengths fade-in staggerées
- **Modifié** : `src/components/Experience.tsx` — cards fade-in + slide-up staggerées (×100ms)
- **Modifié** : `src/components/Certifications.tsx` — cards fade-in + slide-up staggerées (×120ms)
- **Modifié** : `src/components/Work.tsx` — cards fade-in + slide-up staggerées (×150ms)

### Impact sur la dette technique
- Résolu : dette #1 (animations au scroll manquantes)
- Résolu : dette #2 (barres de compétences statiques)

---

## 2026-05-05 — CV bilingue : sélection automatique FR/EN selon la langue du navigateur

### Contexte
Le CV n'était servi qu'en français, même pour les visiteurs anglophones.

### Changements
- **Modifié** : `src/components/FloatingDownload.tsx` — détection `navigator.language`, téléchargement du bon PDF selon langue
- **Modifié** : `src/components/Header.tsx` — idem, bouton Resume desktop + mobile
- **Modifié** : `features.md` — FloatingDownload et Version EN CV PDF mis à jour

### Logique ajoutée
`navigator.language.startsWith("fr")` → `CV_METINHOUE_FR.pdf`, sinon → `CV_METINHOUE_EN.pdf`

### Action requise
Ajouter `resume/CV_METINHOUE_EN.pdf` dans le dépôt pour activer complètement la version anglaise.

### Impact sur la dette technique
- Résolu : dette #5 (CV FR uniquement) — logique implémentée, en attente du fichier PDF EN

---

## 2026-05-05 — Liens Credly sur les certifications

### Contexte
Les cards de certifications affichaient un `credentialId` mais aucun lien cliquable vers Credly pour vérification publique du badge.

### Changements
- **Modifié** : `src/components/Certifications.tsx` — ajout du champ `credentialUrl` dans les données et d'un bouton "Verify on Credly" conditionnel (s'affiche uniquement si l'URL est renseignée)
- Import `ExternalLink` (lucide-react) ajouté

### URLs renseignées
| Certification | URL Credly |
|---|---|
| AZ-900 | https://www.credly.com/badges/2ef3251b-8368-45eb-892c-e038027b5052 |
| 70-767 | https://www.credly.com/badges/ccdbd6af-436d-4a63-94fb-6d70660ca689 |
| 70-461 | https://www.credly.com/badges/5008f806-2680-4874-8219-b1ed63b20615 |
| DP-203 | ✗ Pas de badge Credly (Microsoft n'en a pas émis pour cet examen) |

### Impact sur la dette technique
- Résolu : dette #2 (liens Credly invalides) — 3/4 certifications liées, DP-203 sans badge Credly (comportement attendu)

---

## 2026-05-05 — Correction du déploiement GitHub Pages

### Contexte
Le déploiement échouait avec l'erreur :
`HttpError: Deployment request failed due to in progress deployment`

### Cause
Conflit entre deux mécanismes de déploiement simultanés :
- Le workflow utilisait `peaceiris/actions-gh-pages@v3` (push sur branche `gh-pages`)
- GitHub Pages était configuré en mode **"GitHub Actions"** (déclenche `actions/deploy-pages` automatiquement)
Les deux se déclenchaient en parallèle sur chaque push sur `main`.

### Changements
- **Modifié** : `.github/workflows/deploy.yml` — migration vers `actions/deploy-pages@v5` (méthode officielle)
  - Ajout `concurrency: group: "pages"` pour bloquer les déploiements simultanés
  - Permissions correctes : `pages: write` + `id-token: write`
  - Actions mises à jour : `checkout@v4`, `setup-node@v4` (Node 20), `configure-pages@v5`, `upload-pages-artifact@v3`
  - Suppression de `peaceiris/actions-gh-pages@v3`

---

## 2026-05-05 — Migration emailjs-com → @emailjs/browser + lien DP-203

### Contexte
- `emailjs-com@3.2.0` était déprécié et absent du `package-lock.json` résolu, causant des échecs intermittents sur CI.
- L'URL de vérification DP-203 (Microsoft Learn) a été fournie.

### Changements
- **Modifié** : `package.json` + `package-lock.json` — `emailjs-com` remplacé par `@emailjs/browser`
- **Modifié** : `src/components/Contact.tsx` — import `@emailjs/browser` (API identique, aucune autre modification nécessaire)
- **Modifié** : `vite.config.ts` — suppression du bloc `optimizeDeps: { include: ["emailjs-com"] }` devenu inutile
- **Modifié** : `src/components/Certifications.tsx` — `credentialUrl` DP-203 renseigné (Microsoft Learn)

### Build
`✓ built in 5.33s` — aucune régression.

### Impact sur la dette technique
- Résolu : dette #4 (`emailjs-com` déprécié)
- Résolu : dette #2 DP-203 — lien de vérification désormais complet (Microsoft Learn au lieu de Credly)

---

## 2026-05-05 — Correction dettes #3 et #5

### Changements
- **Modifié** : `src/components/Hero.tsx` — bouton "Get In Touch" relié à `#contact` via `scrollToContact()`
- **Ajouté** : `resume/CV_METINHOUE_EN.pdf` — copie du CV FR en attendant la version EN définitive

### Impact sur la dette technique
- Résolu : dette #3 (bouton "Get In Touch")
- Résolu : dette #5 (CV bilingue — PDF EN désormais présent)

---

## 2026-05-05 — Correction dettes #1, #6, #7, #8 — i18n complète + vrais projets + sécurité

### Contexte
Clôture de toutes les dettes techniques restantes.

### Changements

**i18n (dettes #6 et #7)**
- **Installé** : `i18next`, `react-i18next`, `i18next-browser-languagedetector`
- **Créé** : `src/i18n/config.ts` — initialisation i18next avec détection navigateur, fallback EN, cache localStorage
- **Créé** : `src/i18n/locales/en.json` — traductions complètes EN
- **Créé** : `src/i18n/locales/fr.json` — traductions complètes FR
- **Modifié** : `src/main.tsx` — import `./i18n/config`
- **Modifié** : `src/components/Header.tsx` — sélecteur FR/EN (bouton toggle), `useTranslation()` sur nav et bouton CV
- **Modifié** : `src/components/Hero.tsx` — `useTranslation()` sur tous les textes
- **Modifié** : `src/components/About.tsx` — `useTranslation()` sur tous les textes
- **Modifié** : `src/components/Experience.tsx` — `useTranslation()` sur labels (titres, "Réalisations", "Technologies")
- **Modifié** : `src/components/Certifications.tsx` — `useTranslation()` sur labels
- **Modifié** : `src/components/Work.tsx` — `useTranslation()` sur labels
- **Modifié** : `src/components/Contact.tsx` — `useTranslation()` sur tous les textes du formulaire

**Vrais projets Work.tsx (dette #1)**
- Remplacement des 3 projets fictifs par :
  1. **Ditems Portfolio** — ce site (public, demo + GitHub)
  2. **360° Customer Intelligence Platform** — HAGER GROUP (client, NDA)
  3. **Hybrid Data Platform Modernization** — VIDAL GROUP (client, NDA)
- Badge "Client Project" pour les projets NDA, icône cadenas, pas de liens externes

**Intégration security.ts (dette #8)**
- `Contact.tsx` utilise désormais `sanitizeInput()`, `checkRateLimit()`, `setRateLimit()` de `src/utils/security.ts`
- Suppression du code de rate limiting manuel (remplacé par `checkRateLimit` / `setRateLimit`)

### Build
`✓ built in 6.74s` — aucune erreur (warning chunk size non bloquant)

### Impact sur la dette technique
- Résolu : dettes #1, #6, #7, #8
- **Toutes les dettes techniques sont désormais closes**

---

## 2026-05-06 09h00 — Refonte dynamique visuelle complète

### Contexte
Le site était statique. Objectif : rendre l'expérience "hyper dynamique" tout en conservant la palette de couleurs existante. Toutes les sections ont été enrichies d'animations et de composants réutilisables.

### Changements

**Nouveaux hooks**
- **Créé** : `src/hooks/use-typewriter.tsx` — effet machine à écrire (char by char, délai initial, vitesse configurable)
- **Créé** : `src/hooks/use-counter.tsx` — compteur animé 0 → cible avec ease-out cubique (rAF ~60fps, durée configurable)
- **Créé** : `src/hooks/use-active-section.tsx` — IntersectionObserver sur chaque section ID, expose la section courante visible

**Nouveaux composants**
- **Créé** : `src/components/ScrollProgress.tsx` — barre de progression scroll fixée en haut de page (gradient primary → blue-bright, 3px, z-9999)
- **Créé** : `src/components/SectionTitle.tsx` — h2 animé slide-up + underline grow au scroll, prop `light` pour fonds sombres
- **Créé** : `src/components/TiltCard.tsx` — wrapper 3D perspective rotateX/Y au survol, props `intensity` et `style`

**Tailwind + CSS**
- **Modifié** : `tailwind.config.ts` — correction import ESM (`tailwindAnimate`), nouveaux keyframes : `shimmer`, `blink`, `gradient-shift`, `count-up`, `timeline-grow`
- **Modifié** : `src/index.css` — `.bg-gradient-hero-animated` (400% bg-size, 10s), `.shimmer-card` (::after sweep), `.scroll-progress`

**Composants métier**
- **Modifié** : `src/components/Hero.tsx` — typewriter sur sous-titre + curseur `animate-blink`, compteurs animés stats (10+/4/6) dans bloc glassmorphism, 3 blobs, `animate-pulse-glow`
- **Modifié** : `src/components/Header.tsx` — active section via `useActiveSection`, point souligné animé + `text-primary` sur item actif
- **Modifié** : `src/components/About.tsx` — intégration `SectionTitle`, groupe hover scale sur icons strength cards
- **Modifié** : `src/components/Experience.tsx` — `SectionTitle` + timeline verticale (ligne animée 0%→100%, dots scale-in, cards slide-in stagger)
- **Modifié** : `src/components/Certifications.tsx` — `SectionTitle` + `TiltCard` + `.shimmer-card`
- **Modifié** : `src/components/Work.tsx` — `SectionTitle` + `TiltCard` (intensity 6) + `.shimmer-card`
- **Modifié** : `src/components/Contact.tsx` — `SectionTitle` (light=true) + état succès animé (CheckCircle2 + slide-up) après envoi
- **Modifié** : `src/pages/Index.tsx` — ajout `<ScrollProgress />` en tête de page

### Commit(s)
- `d918e4c` — feat: dynamic visual overhaul — animations, typewriter, tilt, timeline, scroll progress (branche : dev)

### Build
`✓ built in 5.20s` — 0 erreur TypeScript, avertissement chunk > 500 kB non bloquant

---

## 2026-05-06 10h00 — Suppression bloc CTA + correction URL LinkedIn + remplacement icônes dépréciées

### Contexte
- Le bloc "Intéressé par une collaboration ?" (card gradient) dans Contact était redondant.
- L'URL LinkedIn était incorrecte (`michael-m-87177793` → `john-michael-m-87177793`).
- Les icônes `Github` et `Linkedin` de lucide-react sont dépréciées (brand icons supprimées de la librairie).

### Changements
- **Modifié** : `src/components/Contact.tsx` — suppression card CTA + variable `socialLinks`, nettoyage imports `Linkedin`/`Github` devenus inutiles
- **Modifié** : `src/components/Hero.tsx` — URL LinkedIn corrigée, icônes `Github`/`Linkedin` remplacées par SVG inline (évite la dépendance sur des brand icons dépréciées)

### Commit(s)
- Commit à venir (branche : dev)

### Build
`✓ built in 5.66s` — 0 erreur TypeScript

---

## Format pour les entrées futures

```markdown
## YYYY-MM-DD — Titre court

### Contexte
[Pourquoi ce changement a été fait]

### Changements
- **Modifié** : `fichier.tsx` — description
- **Créé** : `fichier.tsx` — description
- **Supprimé** : `fichier.tsx` — description

### Commit(s)
- `abc1234` — message du commit (branche : X)

### Impact sur la dette technique
- Résolu : [item de dette résolu]
- Ajouté : [nouvelle dette introduite]
```
