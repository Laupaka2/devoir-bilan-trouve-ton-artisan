# Trouve ton artisan

Plateforme que j’ai développée pour mettre en relation les particuliers et les artisans de la région Auvergne‑Rhône‑Alpes.  
Le projet fait partie de mon devoir bilan au Centre Européen de Formation.

---

## Prérequis

- Node.js **18+**
- MySQL **8+** (ou MariaDB)
- npm (ou yarn)
- Git

---

## Structure du projet

```text
trouve-ton-artisan/
├── frontend/          # Application React (Vite + React Router, Bootstrap, Sass)
├── backend/           # API Node.js / Express / Sequelize
├── database/          # Scripts SQL + import Excel
└── README.md
```

**Rendu des livrables (énoncé section 5.2)**  
Je dois rendre **un dossier au format PDF** comprenant : contexte du projet (entreprise, besoins, contraintes, livrables attendus), maquettes Figma (captures d’écran + lien vers les maquettes complètes), présentation de la base de données (MCD, MLD), éléments de sécurité (mise en œuvre et intérêt), veille sur les vulnérabilités et failles corrigées, lien vers ce repository GitHub, lien du site en ligne. Le dépôt GitHub doit contenir le code du projet, le script de création de la base (.sql) et le script d’alimentation (.sql). Ce PDF n’est pas inclus dans le dépôt ; je le remets au CEF à part.

---

## Installation et lancement en local

### 1. Installer les dépendances

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

### 2. Préparer la base de données

1. Créer la base :

```sql
CREATE DATABASE trouve_ton_artisan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Exécuter les scripts SQL de création + données de base :

```bash
mysql -u root -p trouve_ton_artisan < database/01_create_database.sql
mysql -u root -p trouve_ton_artisan < database/02_insert_data.sql
```

3. (Optionnel) Importer les artisans depuis l’Excel fourni, puis appliquer les corrections :

- Configurer la connexion dans `backend/.env` (voir plus bas)
- Placer `data.xlsx` dans `database/`
- Depuis la racine du projet :

```bash
node database/import-excel.js
mysql -u root -p trouve_ton_artisan < database/04_fix_specialites_et_images.sql
mysql -u root -p trouve_ton_artisan < database/05_noms_et_images_personnalises.sql
```

### 3. Configurer l’API (`backend/.env`)

Dans le dossier `backend`, je crée un fichier `.env` (non versionné) :

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=votre_mot_de_passe

PORT=3001
NODE_ENV=development

# URL du frontend (utile pour CORS en production)
FRONTEND_URL=http://localhost:3000

# (Optionnel) SMTP pour l’envoi des emails de contact
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=mon_compte@example.com
EMAIL_PASSWORD=mon_mot_de_passe
```

En production (Railway), j’utilise les variables fournies par la plateforme (`MYSQLHOST`, `MYSQLUSER`, `MYSQLDATABASE`, etc.) que je mappe dans `config/database.js`.

### 4. Configurer le frontend (`frontend/.env`)

Pour que le frontend sache où joindre l’API, je peux définir :

```env
REACT_APP_API_URL=http://localhost:3001/api
```

Sans cette variable, le frontend pointe par défaut sur `http://localhost:3001/api`.

### 5. Lancer l’application en développement

#### API (terminal 1)

```bash
cd backend
npm start
```

API disponible sur `http://localhost:3001`.

#### Frontend (terminal 2)

```bash
cd frontend
npm start
```

Site disponible sur `http://localhost:3000`.

---

## Déploiement (ce que j’ai mis en place)

- **Frontend** : déployé sur **Vercel**.
- **Backend + MySQL** : déployés sur **Railway**.
  - Le fichier `backend/Procfile` définit la commande de démarrage.
  - `backend/nixpacks.toml` décrit l’environnement (Node.js) utilisé par Railway.
  - Les variables d’environnement (DB, FRONTEND_URL, EMAIL_*) sont renseignées directement dans le dashboard Railway.

Les URLs du site (Vercel) et du dépôt GitHub sont indiquées dans le **PDF du devoir bilan** remis au CEF.

---

## Technologies utilisées

### Frontend

- React.js
- React Router
- Bootstrap 5
- Sass

### Backend

- Node.js
- Express
- Sequelize (ORM)
- MySQL / MariaDB

---

## Fonctionnalités principales

- Recherche d’artisans par **catégorie** (Bâtiment, Services, Fabrication, Alimentation).
- Recherche **par nom** d’artisan.
- Mise en avant des **artisans du mois** sur la page d’accueil.
- Fiche détaillée par artisan (spécialité, localisation, contact, à propos).
- Formulaire de contact relié à l’API (enregistrement en base + email optionnel).
- Design **responsive** (mobile first) et respect des bonnes pratiques d’accessibilité (WCAG 2.1).

---

## Tests automatisés

**Frontend** (Jest + React Testing Library) — validation du formulaire de contact :

```bash
cd frontend
npm test
```

**Backend** (Jest + Supertest) — routes `POST /api/contacts` et `GET /api/artisans` :

```bash
cd backend
npm test
```

Les tests backend mockent Sequelize et n’ont pas besoin d’une base MySQL locale.

---

## Sécurité et bonnes pratiques

Sur l’API, j’ai mis en place :

- `helmet` pour sécuriser les en‑têtes HTTP.
- CORS configuré pour n’autoriser que le domaine du frontend.
- Validation des données avec **express‑validator** (nom, email, objet, message, artisan_id).
- Protection contre l’**injection SQL** via Sequelize et requêtes paramétrées ; les recherches par nom utilisent une requête brute avec échappement.
- Taille maximale du JSON limitée à 10 Mo pour éviter certains abus.
- Gestion d’erreurs globales et réponses génériques en production.

---

## Auteur

Projet que j’ai réalisé dans le cadre du **devoir bilan React.js** pour le **Centre Européen de Formation**.  
Le code est organisé pour être facilement relançable en local (scripts SQL, import Excel, configuration `.env`) et déployable sur Vercel / Railway.
