# Trouve ton artisan

Plateforme dédiée aux artisans de la région Auvergne-Rhône-Alpes permettant aux particuliers de trouver un artisan et de le contacter facilement.

## Prérequis

- Node.js (version 18 ou supérieure)
- MySQL (version 8.0 ou supérieure) ou MariaDB
- npm ou yarn
- Git

## Structure du projet

```
trouve-ton-artisan/
├── frontend/          # Application React
├── backend/           # API Node.js/Express
├── database/          # Scripts SQL
└── README.md
```

## Installation

### 1. Installation des dépendances

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

### 2. Configuration de la base de données

1. Créer une base de données MySQL :
```sql
CREATE DATABASE trouve_ton_artisan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Exécuter les scripts SQL dans l'ordre :
```bash
mysql -u root -p trouve_ton_artisan < database/01_create_database.sql
mysql -u root -p trouve_ton_artisan < database/02_insert_data.sql
```

### 3. Configuration de l'API

1. Créer un fichier `.env` dans le dossier `backend` :
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
PORT=3001
NODE_ENV=development
```

2. Modifier les valeurs selon votre configuration MySQL.

### 4. Lancement de l'application

#### Démarrer l'API (terminal 1)
```bash
cd backend
npm start
```

L'API sera accessible sur `http://localhost:3001`

#### Démarrer le frontend (terminal 2)
```bash
cd frontend
npm start
```

L'application sera accessible sur `http://localhost:3000`

## Technologies utilisées

### Frontend
- React.js
- Bootstrap 5
- Sass
- React Router

### Backend
- Node.js
- Express
- Sequelize (ORM)
- MySQL/MariaDB

## Fonctionnalités

- Recherche d'artisans par catégorie (Bâtiment, Services, Fabrication, Alimentation)
- Recherche par nom d'artisan
- Affichage des artisans du mois sur la page d'accueil
- Fiche détaillée de chaque artisan
- Formulaire de contact pour contacter un artisan
- Design responsive (mobile first)
- Accessibilité (WCAG 2.1)

## Sécurité

- Validation des données côté serveur
- Protection CORS
- Sanitization des entrées utilisateur
- Protection contre les injections SQL (via Sequelize)
- Validation des emails

## Auteur

Projet réalisé dans le cadre d'un devoir bilan pour le Centre Européen de Formation.

# devoir-bilan-trouve-ton-artisan
