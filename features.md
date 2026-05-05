# Features — Ditems Portfolio CV

> Inventaire de toutes les fonctionnalités. À lire avant toute modification. À mettre à jour après chaque évolution.
> **Aucune API backend n'existe actuellement.** Ne pas inventer d'endpoints.

---

## Fonctionnalités existantes

---

### Navigation Header

**Statut** : Existante

**Description**
Barre de navigation fixe en haut de page. Devient translucide avec effet blur au scroll (> 50px). Contient le logo Ditems (cliquable → scroll Hero), les liens de navigation smooth-scroll, et le bouton téléchargement CV.
Sur mobile : remplacement par un overlay plein écran avec hamburger.

**Composant** : `src/components/Header.tsx`

**Comportement**
- Scroll > 50px → `bg-background/80 backdrop-blur-md`
- Clic logo → `scrollIntoView({ behavior: 'smooth' })` vers `#hero`
- Clic nav item → scroll vers section correspondante
- Mobile : fermeture automatique du menu au clic sur un item

**Sections navigables** : `about`, `experience`, `certifications`, `work`, `contact`

**Dépendances** : `useTranslation` (i18n), Lucide (Download, Menu, X)

**Contraintes**
- Lien CV en dur : GitHub raw URL (FR uniquement)
- Pas de sélecteur de langue visible

---

### Section Hero

**Statut** : Existante

**Description**
Section d'accroche plein écran. Fond gradient animé avec éléments flottants. Présente le titre, la description, deux CTA et les liens sociaux.

**Composant** : `src/components/Hero.tsx`

**Éléments**
- H1 : `{t('hero.title')}` + `{t('hero.subtitle')}`
- Description : `{t('hero.description')}`
- Bouton "Explore My Work" → scroll `#about`
- Bouton "Get In Touch" → **non câblé** (ne scrolle pas vers Contact)
- Liens sociaux : LinkedIn, GitHub, Email
- Indicateur de scroll animé (bounce)

**Dépendances** : `useTranslation`, Lucide (ArrowDown, Github, Linkedin, Mail)

**Contraintes / Dette**
- Bouton "Get In Touch" non relié à `#contact` — bug connu

---

### Section À propos (About)

**Statut** : Existante

**Description**
Présentation du profil professionnel : texte biographique (i18n), jauges de compétences, preview de 3 certifications.

**Composant** : `src/components/About.tsx`

**Compétences affichées**
Azure (90%), Data Visualization (80%), DataOps (90%), Docker (90%), MS Fabrics (70%), Python (75%), SQL (95%)

**Certifications preview** (3 cards)
- Azure Data Engineer Associate
- Azure Solutions Architect Expert *(non présente dans Certifications.tsx — incohérence)*
- Power BI Data Analyst *(non présente dans Certifications.tsx — incohérence)*

**Dépendances** : `useTranslation`, shadcn Card, Lucide

**Contraintes / Dette**
- Liens Credly invalides (`https://www.credly.com/badges/your-badge-id`)
- Certifications preview ne correspondent pas aux certifications réelles de `Certifications.tsx`
- Barres de compétences animées au scroll via `useIntersection` (largeur 0% → niveau réel, stagger par index)

---

### Section Expériences (Experience)

**Statut** : Existante

**Description**
Liste chronologique de 6 expériences professionnelles. Cards avec titre, entreprise, localisation, période, description, réalisations et technologies.

**Composant** : `src/components/Experience.tsx`

**Expériences (6 postes)**
1. Junior Cloud Data Architect – Azure Data Engineer @ HAGER GROUP (03/2025 - Present)
2. Tech Lead Data MSBI – Azure Data Engineer – DataOps @ VIDAL GROUP (06/2019 - 03/2025)
3. Senior MSBI Developer - Azure Data Engineer @ COVAGE (10/2018 – 06/2019)
4. Confirmed MSBI Developer @ PHILIP MORRIS FRANCE (06/2018 – 10/2018)
5. Confirmed MSBI Developer @ LA MUTUELLE FAMILIALE (09/2016 – 06/2018)
6. Junior MSBI Developer @ LIEBHERR-MINING (01/2016 – 09/2016)

**Contraintes / Dette**
- Données hardcodées en anglais (non traduit via i18n)
- Animations au scroll implémentées via `useIntersection` (fade-in + slide-up staggeré)

---

### Section Certifications

**Statut** : Existante

**Description**
4 certifications Microsoft en grille 2×2.

**Composant** : `src/components/Certifications.tsx`

**Certifications**
1. Azure Data Engineer Associate (DP-203) — 2024
2. Azure Fundamentals (AZ-900) — 2020
3. Implementing a Data Warehouse (70-767) — 2019
4. Querying SQL Server 2012/2014 (70-461) — 2018

**Contraintes / Dette**
- Pas de liens vers les badges Credly
- Animations au scroll implémentées via `useIntersection` (fade-in + slide-up staggeré)
- Données hardcodées en anglais

---

### Section Projets (Work)

**Statut** : Existante (contenu placeholder)

**Description**
Galerie de 3 projets en grille 2 colonnes. Cards avec image, titre, description, features et technologies.

**Composant** : `src/components/Work.tsx`

**Projets actuels** — tous fictifs/placeholder
1. Real-time Analytics Platform
2. ML Pipeline Orchestrator
3. Data Lake Architecture

**Contraintes / Dette**
- Projets fictifs — à remplacer par de vrais projets personnels
- Images : `/api/placeholder/400/250` — non réelles
- Liens "Live Demo" et "Code" → `#` — non fonctionnels

---

### Formulaire de contact (Contact)

**Statut** : Existante

**Description**
Formulaire de contact avec validation Zod, envoi via EmailJS, et rate limiting client-side.
Layout 2 colonnes : formulaire + informations de contact.

**Composant** : `src/components/Contact.tsx`

**Backend**
Aucune API. Envoi direct depuis le navigateur via `emailjs-com`.
- Service ID : `service_t6so8r5`
- Template ID : `template_meqf9bp`
- Public Key : `IobH6oMwMiIETnEVh`

**Champs**
| Champ | Validation |
|---|---|
| name | 2–50 chars, regex `[a-zA-Z\s-']` |
| email | Format valide, max 100 chars |
| subject | 3–100 chars, regex alphanumérique |
| message | 10–1000 chars |

**Comportement**
- Validation Zod + React Hook Form
- Anti-spam : `localStorage["lastContactSubmission"]` — délai 60s
- Sanitisation : trim, toLowerCase (email)
- Feedback : toast succès/erreur (Sonner)
- Reset du formulaire après succès

**Sécurité**
- Validation Zod côté client
- Rate limiting localStorage (contournable)
- `security.ts` disponible mais **non utilisé** dans Contact.tsx

**Contraintes / Dette**
- `emailjs-com` déprécié (remplacé par `@emailjs/browser`)
- Clés hardcodées (acceptables pour EmailJS, mais dette organisationnelle)
- `security.ts` non intégré
- Pas de protection anti-bot (honeypot absent)
- Textes non traduits via i18n

---

### Bouton flottant CV (FloatingDownload)

**Statut** : Existante

**Description**
Bouton circulaire flottant bas-droite, visible après scroll > 50% hauteur d'écran.

**Composant** : `src/components/FloatingDownload.tsx`

**Comportement**
- Visible si `scrollY > window.innerHeight / 2`
- Click → téléchargement depuis GitHub raw URL (FR uniquement)
- Animation `animate-float` + `shadow-glow`

**Comportement langue**
- `navigator.language.startsWith("fr")` → `CV_METINHOUE_FR.pdf`
- Sinon → `CV_METINHOUE_EN.pdf`

**Contraintes / Dette**
- `CV_METINHOUE_EN.pdf` à ajouter dans `resume/` (fichier manquant)

---

### Internationalisation (i18n)

**Statut** : Existante (partielle)

**Description**
Support FR/EN via i18next avec détection automatique de la langue du navigateur.

**Configuration** : `src/i18n/config.ts`
**Locales** : `src/i18n/locales/en.json` + `src/i18n/locales/fr.json`

**Détection** : `navigator` → `htmlTag` → `path` → `subdomain`
**Cache** : `localStorage`
**Fallback** : anglais

**Composants traduits** : Header, Hero, About (partiellement)
**Non traduits** : Experience, Certifications, Work, Contact

**Contraintes / Dette**
- Pas de sélecteur de langue dans l'UI
- Données structurelles hardcodées en anglais

---

### Gestion des erreurs (ErrorBoundary)

**Statut** : Existante

**Description**
Error Boundary React global wrappant toute l'application. Affiche une UI de fallback en cas d'erreur JS non catchée.

**Composant** : `src/components/ErrorBoundary.tsx`

---

### Utilitaires de sécurité

**Statut** : Existante (non intégrés)

**Description**
Fonctions de sécurité côté client disponibles mais non utilisées dans Contact.tsx.

**Fichier** : `src/utils/security.ts`

**Fonctions disponibles**
- `escapeHtml()` — encodage HTML entities (anti-XSS)
- `sanitizeInput()` — suppression balises, `javascript:`, event handlers
- `isValidEmail()` — validation email basique
- `checkRateLimit()` / `setRateLimit()` — rate limiting via localStorage
- `isValidUrl()` — validation protocoles autorisés
- `createSecureLink()` — génération attributs `rel`/`target` sécurisés

**Contraintes / Dette**
- Non utilisés dans Contact.tsx (doublon partiel avec Zod)

---

## Fonctionnalités planifiées

---

### Chat IA contextualisé

**Statut** : Planifié

**Description**
Assistant conversationnel IA basé sur le profil CV de Michael. Répond aux questions des visiteurs sur les compétences, l'expérience et la disponibilité.

**Backend**
Aucune API actuellement.
Prévoir une route `/api/chat` si une architecture backend (serverless) est ajoutée.
Provider envisagé : Anthropic Claude API avec streaming SSE.

**Frontend**
- Composant `ChatPanel.tsx` (à créer)
- Bouton d'ouverture dans le header ou en floating

**Contraintes**
- Streaming temps réel (SSE)
- Historique limité à 20 messages
- Rate limiting côté serveur
- Prompt système à construire à partir du CV

---

### Sélecteur de langue visible

**Statut** : Planifié

**Description**
Switcher FR/EN visible dans le Header permettant à l'utilisateur de changer manuellement la langue.

**Impacte** : `Header.tsx`, `i18n/locales/*.json`

**Contraintes**
- Nécessite de traduire les données structurelles (expériences, certifs, projets) avant activation complète

---

### Vrais projets dans Work

**Statut** : Planifié

**Description**
Remplacer les 3 projets placeholder par de vrais projets avec images réelles et liens fonctionnels.

**Impacte** : `Work.tsx`

---

### Liens Credly valides

**Statut** : Planifié

**Description**
Remplacer les URLs Credly placeholder par les vraies URLs des badges de certification.

**Impacte** : `About.tsx`

---

### Animations scroll (Intersection Observer)

**Statut** : Planifié

**Description**
Révélation des sections et animation des barres de compétences au scroll.

**Impacte** : `About.tsx`, `Experience.tsx`, `Certifications.tsx`, `Work.tsx`

---

### Version EN du CV PDF

**Statut** : Partiellement implémenté — en attente du fichier PDF

**Description**
La logique de sélection de langue est en place dans `FloatingDownload.tsx` et `Header.tsx` (via `navigator.language`).
Il reste à ajouter `CV_METINHOUE_EN.pdf` dans `resume/` pour activer complètement la fonctionnalité.

**Impacte** : `resume/` (fichier PDF à ajouter)
