# Import des artisans depuis Excel (data.xlsx)

## Prérequis

1. **data.xlsx** doit être dans le dossier `database/`
2. La base MySQL doit exister avec les tables **categories** et **specialites** créées et remplies :
   - Exécuter `01_create_database.sql`
   - Exécuter `02_insert_data.sql` (au moins les INSERT de categories et specialites)

## Colonnes attendues dans l'Excel

La première ligne doit contenir les en-têtes. Noms acceptés (insensibles à la casse) :

| Champ DB     | Colonnes acceptées                    |
|--------------|---------------------------------------|
| nom          | nom, Nom                              |
| email        | email, Email                          |
| telephone    | telephone, Téléphone                 |
| adresse      | adresse, Adresse                     |
| code_postal  | code_postal, Code postal              |
| ville        | ville, Ville                          |
| note         | note, Note                            |
| nombre_avis  | nombre_avis, Nombre avis              |
| specialite   | specialite, Spécialité, specialite_id |
| image_url    | image_url, image, Image               |
| site_web     | site_web, Site web                    |
| a_propos     | a_propos, À propos, description       |
| artisan_du_mois | artisan_du_mois, Artisan du mois  |

**Spécialité** : nom de la spécialité (ex. "Maçonnerie", "Boulangerie") ou son ID numérique.

## Utilisation

1. Installer les dépendances du backend (inclut xlsx) :
   ```bash
   cd backend
   npm install
   ```

2. Configurer le fichier `backend/.env` avec les identifiants MySQL.

3. Lancer l'import (depuis la **racine du projet**) :
   ```bash
   node database/import-excel.js
   ```

Le script vide la table `artisans` puis importe toutes les lignes du fichier Excel.
