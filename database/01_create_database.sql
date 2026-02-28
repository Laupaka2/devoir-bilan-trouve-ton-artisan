-- Script de création de la base de données pour "Trouve ton artisan"
-- Base de données : trouve_ton_artisan

-- Suppression des tables si elles existent (dans l'ordre inverse des dépendances)
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS artisans;
DROP TABLE IF EXISTS specialites;
DROP TABLE IF EXISTS categories;

-- Table des catégories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des spécialités
CREATE TABLE specialites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    categorie_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE,
    UNIQUE KEY unique_specialite_categorie (nom, categorie_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des artisans
CREATE TABLE artisans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    adresse TEXT,
    code_postal VARCHAR(10),
    ville VARCHAR(100),
    note DECIMAL(3,2) DEFAULT 0.00 CHECK (note >= 0 AND note <= 5),
    nombre_avis INT DEFAULT 0,
    specialite_id INT NOT NULL,
    image_url VARCHAR(500),
    site_web VARCHAR(500),
    a_propos TEXT,
    artisan_du_mois BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (specialite_id) REFERENCES specialites(id) ON DELETE CASCADE,
    INDEX idx_nom (nom),
    INDEX idx_specialite (specialite_id),
    INDEX idx_artisan_du_mois (artisan_du_mois)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des contacts (formulaires de contact)
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artisan_id INT NOT NULL,
    nom VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    objet VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    lu BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (artisan_id) REFERENCES artisans(id) ON DELETE CASCADE,
    INDEX idx_artisan (artisan_id),
    INDEX idx_lu (lu)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

