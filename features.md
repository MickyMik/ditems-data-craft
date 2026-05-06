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

**Dépendances** : `useTranslation` (i18n), `useActiveSection`, Lucide (Download, Menu, X)

**Active section**
- `useActiveSection(NAV_IDS)` — IntersectionObserver threshold 0.35 sur chaque section
- Item actif : `text-primary` + point souligné animé (`w-4 h-0.5 bg-primary rounded-full`)

**Sélecteur de langue**
- Bouton toggle `FR` / `EN` visible dans la barre de navigation (desktop + mobile)
- `i18n.changeLanguage()` au clic

**Contraintes**
- Lien CV : GitHub raw URL, sélection FR/EN selon `i18n.language`

---

### Section Hero

**Statut** : Existante

**Description**
Section d'accroche plein écran. Fond gradient animé avec éléments flottants. Présente le titre, la description, deux CTA et les liens sociaux.

**Composant** : `src/components/Hero.tsx`

**Éléments**
- H1 : `{t('hero.title')}` + sous-titre avec effet typewriter (`useTypewriter`, 70ms/char, délai 900ms) + curseur clignotant `animate-blink`
- Description : `{t('hero.description')}`
- Bouton "Explore My Work" → scroll `#about` (`animate-pulse-glow`)
- Bouton "Get In Touch" → scroll `#contact`
- Bloc stats glassmorphism : 10+ années exp., 4 certifications, 6 entreprises (compteurs animés via `useCounter`, ease-out cubique)
- 3 blobs animés `animate-float` en arrière-plan
- Liens sociaux : LinkedIn (SVG inline), GitHub (SVG inline), Email
- Indicateur de scroll animé (bounce), cliquable

**Dépendances** : `useTranslation`, `useTypewriter`, `useCounter`, `useIntersection`, Lucide (ArrowDown, Mail)

**Icônes**
- LinkedIn et GitHub : SVG inline (brand icons supprimées de lucide-react)
- URL LinkedIn : `https://www.linkedin.com/in/john-michael-m-87177793/`

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

**Animations**
- `SectionTitle` : slide-up + underline grow au scroll
- Barres de compétences : `useIntersection`, largeur 0% → niveau réel, stagger ×100ms
- Cards strengths : fade-in + translateY stagger ×150ms

**Contraintes / Dette**
- Certifications preview (3 cards) ne correspondent pas aux certifications réelles de `Certifications.tsx` — incohérence persistante

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

**Timeline**
- Ligne verticale animée : hauteur 0% → 100% au scroll (`timelineVisible`)
- Dots circulaires : scale-in stagger par index
- Cards : slide-in depuis la gauche + fade-in stagger ×120ms

**Contraintes / Dette**
- Données hardcodées en anglais (non traduites via i18n)

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

**Animations**
- `SectionTitle` + `TiltCard` (wrapper 3D, intensity=10) + `.shimmer-card` (sweep ::after)
- Fade-in + translateY stagger ×120ms via `useIntersection`

**Contraintes / Dette**
- Données hardcodées en anglais (non traduites via i18n)

---

### Section Projets (Work)

**Statut** : Existante (vrais projets)

**Description**
Galerie de 3 projets en grille 2 colonnes. Cards avec bandeau gradient, titre, description, features, technologies et liens.

**Composant** : `src/components/Work.tsx`

**Projets**
1. **Ditems Portfolio** — ce site (public, lien demo + GitHub)
2. **360° Customer Intelligence Platform** — HAGER GROUP (NDA, badge "Client Project", icône cadenas)
3. **Hybrid Data Platform Modernization** — VIDAL GROUP (NDA, badge "Client Project", icône cadenas)

**Animations**
- `SectionTitle` + `TiltCard` (intensity=6) + `.shimmer-card`
- Fade-in + translateY stagger ×150ms via `useIntersection`

**CTA bas de page** : card gradient avec bouton "Let's Work Together" → scroll `#contact`

---

### Formulaire de contact (Contact)

**Statut** : Existante

**Description**
Formulaire de contact avec validation Zod, envoi via EmailJS, et rate limiting client-side.
Layout 2 colonnes : formulaire + informations de contact.

**Composant** : `src/components/Contact.tsx`

**Backend**
Aucune API. Envoi direct depuis le navigateur via `@emailjs/browser`.
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
- Rate limiting `checkRateLimit()` / `setRateLimit()` via `security.ts` (localStorage, 60s)
- Sanitisation : `sanitizeInput()` sur tous les champs avant envoi

**État succès**
- Après envoi réussi : affichage inline d'un état succès (CheckCircle2, animation slide-up `count-up`)
- Bouton pour réinitialiser et renvoyer un message

**Layout**
- `SectionTitle` (prop `light=true`) sur fond `bg-gradient-hero`
- Card informations de contact + card "Disponibilité" (réponse sous 24h)

**Contraintes / Dette**
- Clés EmailJS hardcodées (acceptables pour EmailJS, conçu client-side)
- Pas de protection anti-bot (honeypot absent)

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

**Composants traduits** : Header, Hero, About, Experience (labels), Certifications (labels), Work (labels), Contact
**Non traduits** : données structurelles (intitulés de postes, descriptions de projets, réalisations — hardcodées en anglais)

**Sélecteur de langue** : bouton toggle FR/EN dans le Header (desktop + mobile)

**Contraintes / Dette**
- Données structurelles hardcodées en anglais (postes, projets, certifications)

---

### Gestion des erreurs (ErrorBoundary)

**Statut** : Existante

**Description**
Error Boundary React global wrappant toute l'application. Affiche une UI de fallback en cas d'erreur JS non catchée.

**Composant** : `src/components/ErrorBoundary.tsx`

---

### Utilitaires de sécurité

**Statut** : Existante (intégrée)

**Description**
Fonctions de sécurité côté client utilisées dans Contact.tsx.

**Fichier** : `src/utils/security.ts`

**Fonctions disponibles**
- `escapeHtml()` — encodage HTML entities (anti-XSS)
- `sanitizeInput()` — suppression balises, `javascript:`, event handlers
- `isValidEmail()` — validation email basique
- `checkRateLimit()` / `setRateLimit()` — rate limiting via localStorage
- `isValidUrl()` — validation protocoles autorisés
- `createSecureLink()` — génération attributs `rel`/`target` sécurisés

---

---

### Barre de progression scroll (ScrollProgress)

**Statut** : Existante

**Description**
Barre fine (3px) fixée en haut de page, affichant la progression du scroll de 0% à 100%.

**Composant** : `src/components/ScrollProgress.tsx`

**Comportement**
- Calcul : `scrollY / (scrollHeight - innerHeight) * 100`
- Style : gradient primary → blue-bright, z-index 9999, transition fluide

---

### Titre de section animé (SectionTitle)

**Statut** : Existante

**Description**
Composant réutilisable pour les titres de section. Slide-up au scroll + underline grow.

**Composant** : `src/components/SectionTitle.tsx`

**Props**
- `text` : texte du h2
- `subtitle?` : sous-titre optionnel
- `light?` : mode clair (texte blanc, underline blue-light) pour fonds sombres

**Utilisé dans** : About, Experience, Certifications, Work, Contact

---

### Carte 3D tilt (TiltCard)

**Statut** : Existante

**Description**
Wrapper qui applique un effet de perspective 3D (rotateX/Y) au survol de la souris.

**Composant** : `src/components/TiltCard.tsx`

**Props**
- `intensity?` : amplitude de rotation en degrés (défaut : 10)
- `style?` : styles inline passés au div wrapper (pour animations staggerées)
- `className?` : classes CSS additionnelles

**Utilisé dans** : Certifications, Work

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

### ~~Sélecteur de langue visible~~ — Implémenté

**Statut** : ~~Planifié~~ → **Existant** (voir section Header)

---

### ~~Vrais projets dans Work~~ — Implémenté

**Statut** : ~~Planifié~~ → **Existant** (voir section Work)

---

### ~~Liens Credly valides~~ — Implémenté

**Statut** : ~~Planifié~~ → **Existant** (voir section Certifications)

---

### ~~Animations scroll (Intersection Observer)~~ — Implémenté

**Statut** : ~~Planifié~~ → **Existant** (tous les composants animés)

---

### ~~Version EN du CV PDF~~ — Implémenté

**Statut** : ~~Partiellement~~ → **Existant** (`resume/CV_METINHOUE_EN.pdf` présent)

---

### Chat IA contextualisé

**Statut** : Planifié

**Description**
Assistant conversationnel IA basé sur le profil CV de Michael. Répond aux questions des visiteurs sur les compétences, l'expérience et la disponibilité.

**Backend**
Aucune API actuellement. Prévoir route `/api/chat` (serverless). Provider : Anthropic Claude API avec streaming SSE.

**Frontend**
- Composant `ChatPanel.tsx` (à créer)
- Bouton d'ouverture dans le header ou en floating

**Contraintes**
- Streaming SSE, historique 20 messages max, rate limiting serveur, prompt système depuis CV
