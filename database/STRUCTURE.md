# Structure de la base de données

## Modèle Conceptuel de Données (MCD)

```
CATEGORIE (1,n) ----< SPECIALITE (1,n) ----< ARTISAN (1,n) ----< CONTACT
```

### Entités

- **CATEGORIE** : Représente une catégorie d'artisanat (Bâtiment, Services, Fabrication, Alimentation)
- **SPECIALITE** : Représente une spécialité au sein d'une catégorie
- **ARTISAN** : Représente un artisan avec ses informations
- **CONTACT** : Représente un formulaire de contact envoyé à un artisan

### Relations

- Une **CATEGORIE** contient plusieurs **SPECIALITE** (1,n)
- Une **SPECIALITE** appartient à une seule **CATEGORIE** (1,1)
- Une **SPECIALITE** contient plusieurs **ARTISAN** (1,n)
- Un **ARTISAN** appartient à une seule **SPECIALITE** (1,1)
- Un **ARTISAN** reçoit plusieurs **CONTACT** (1,n)
- Un **CONTACT** est envoyé à un seul **ARTISAN** (1,1)

## Modèle Logique de Données (MLD)

### Table : categories

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Identifiant unique |
| nom | VARCHAR(100) | NOT NULL, UNIQUE | Nom de la catégorie |
| slug | VARCHAR(100) | NOT NULL, UNIQUE | Slug pour l'URL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date de création |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Date de mise à jour |

### Table : specialites

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Identifiant unique |
| nom | VARCHAR(100) | NOT NULL | Nom de la spécialité |
| slug | VARCHAR(100) | NOT NULL | Slug pour l'URL |
| categorie_id | INT | NOT NULL, FK → categories.id | Référence à la catégorie |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date de création |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Date de mise à jour |

**Contrainte unique** : (nom, categorie_id) - Une spécialité est unique dans une catégorie

### Table : artisans

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Identifiant unique |
| nom | VARCHAR(200) | NOT NULL | Nom de l'artisan/entreprise |
| email | VARCHAR(255) | NOT NULL | Email de contact |
| telephone | VARCHAR(20) | NULL | Téléphone |
| adresse | TEXT | NULL | Adresse complète |
| code_postal | VARCHAR(10) | NULL | Code postal |
| ville | VARCHAR(100) | NULL | Ville |
| note | DECIMAL(3,2) | DEFAULT 0.00, CHECK (0-5) | Note sur 5 |
| nombre_avis | INT | DEFAULT 0 | Nombre d'avis |
| specialite_id | INT | NOT NULL, FK → specialites.id | Référence à la spécialité |
| image_url | VARCHAR(500) | NULL | URL de l'image |
| site_web | VARCHAR(500) | NULL | Site web |
| a_propos | TEXT | NULL | Description |
| artisan_du_mois | BOOLEAN | DEFAULT FALSE | Artisan du mois |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date de création |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Date de mise à jour |

**Index** :
- idx_nom : sur la colonne nom (pour la recherche)
- idx_specialite : sur specialite_id
- idx_artisan_du_mois : sur artisan_du_mois

### Table : contacts

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Identifiant unique |
| artisan_id | INT | NOT NULL, FK → artisans.id | Référence à l'artisan |
| nom | VARCHAR(200) | NOT NULL | Nom du contact |
| email | VARCHAR(255) | NOT NULL | Email du contact |
| objet | VARCHAR(200) | NOT NULL | Objet du message |
| message | TEXT | NOT NULL | Message |
| lu | BOOLEAN | DEFAULT FALSE | Message lu |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date de création |

**Index** :
- idx_artisan : sur artisan_id
- idx_lu : sur lu

## Diagramme de relations

```
categories
├── id (PK)
├── nom
├── slug
└── ...

specialites
├── id (PK)
├── nom
├── slug
├── categorie_id (FK → categories.id)
└── ...

artisans
├── id (PK)
├── nom
├── email
├── telephone
├── adresse
├── code_postal
├── ville
├── note
├── nombre_avis
├── specialite_id (FK → specialites.id)
├── image_url
├── site_web
├── a_propos
├── artisan_du_mois
└── ...

contacts
├── id (PK)
├── artisan_id (FK → artisans.id)
├── nom
├── email
├── objet
├── message
├── lu
└── created_at
```

## Contraintes d'intégrité

1. **Cascade DELETE** : 
   - Suppression d'une catégorie → suppression des spécialités associées
   - Suppression d'une spécialité → suppression des artisans associés
   - Suppression d'un artisan → suppression des contacts associés

2. **Contraintes de validation** :
   - Note entre 0 et 5
   - Email valide (validation Sequelize)
   - URL valide pour site_web (validation Sequelize)
   - Longueurs minimales et maximales pour les champs texte

3. **Unicité** :
   - Nom de catégorie unique
   - Slug de catégorie unique
   - Combinaison (nom, categorie_id) unique pour les spécialités

## Index pour les performances

- **Recherche par nom d'artisan** : index sur `artisans.nom`
- **Filtrage par spécialité** : index sur `artisans.specialite_id`
- **Filtrage artisans du mois** : index sur `artisans.artisan_du_mois`
- **Recherche de contacts par artisan** : index sur `contacts.artisan_id`
- **Filtrage des contacts non lus** : index sur `contacts.lu`

