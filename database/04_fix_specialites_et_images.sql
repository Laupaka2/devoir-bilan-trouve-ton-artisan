-- Devoir bilan – Trouve ton artisan
-- Correction des spécialités (après import Excel) et des URLs d'images. À exécuter après 01 et 02.

-- ============================================
-- 1. CORRECTION DES SPÉCIALITÉS (catégories)
-- ============================================

-- Boulangerie Martin : avait 16 (Bijouterie) → 18 (Boulangerie)
UPDATE artisans SET specialite_id = 18 WHERE nom = 'Boulangerie Martin';

-- Pâtisserie Douceur : avait 17 (Poterie) → 19 (Pâtisserie)
UPDATE artisans SET specialite_id = 19 WHERE nom = 'Pâtisserie Douceur';

-- Boucherie Charcuterie Tradition : avait 18 (Boulangerie) → 20 (Boucherie)
UPDATE artisans SET specialite_id = 20 WHERE nom = 'Boucherie Charcuterie Tradition';

-- Fromagerie Affinage : avait 20 (Boucherie) → 22 (Fromagerie)
UPDATE artisans SET specialite_id = 22 WHERE nom = 'Fromagerie Affinage';

-- ============================================
-- 2. CORRECTION DES IMAGES (mapping par ID)
-- Artisans 1-17 : artisan-1.jpg à artisan-17.jpg
-- Artisans 18-21 : placeholder (pas de fichier spécifique)
-- ============================================

UPDATE artisans SET image_url = '/images/artisans/artisan-1.jpg' WHERE id = 1;
UPDATE artisans SET image_url = '/images/artisans/artisan-2.jpg' WHERE id = 2;
UPDATE artisans SET image_url = '/images/artisans/artisan-3.jpg' WHERE id = 3;
UPDATE artisans SET image_url = '/images/artisans/artisan-4.jpg' WHERE id = 4;
UPDATE artisans SET image_url = '/images/artisans/artisan-5.jpg' WHERE id = 5;
UPDATE artisans SET image_url = '/images/artisans/artisan-6.jpg' WHERE id = 6;
UPDATE artisans SET image_url = '/images/artisans/artisan-7.jpg' WHERE id = 7;
UPDATE artisans SET image_url = '/images/artisans/artisan-8.jpg' WHERE id = 8;
UPDATE artisans SET image_url = '/images/artisans/artisan-9.jpg' WHERE id = 9;
UPDATE artisans SET image_url = '/images/artisans/artisan-10.jpg' WHERE id = 10;
UPDATE artisans SET image_url = '/images/artisans/artisan-11.jpg' WHERE id = 11;
UPDATE artisans SET image_url = '/images/artisans/artisan-12.jpg' WHERE id = 12;
UPDATE artisans SET image_url = '/images/artisans/artisan-13.jpg' WHERE id = 13;
UPDATE artisans SET image_url = '/images/artisans/artisan-14.jpg' WHERE id = 14;
UPDATE artisans SET image_url = '/images/artisans/artisan-15.jpg' WHERE id = 15;
UPDATE artisans SET image_url = '/images/artisans/artisan-16.jpg' WHERE id = 16;
UPDATE artisans SET image_url = '/images/artisans/artisan-17.jpg' WHERE id = 17;

-- Artisans 18-21 : image placeholder (pas de fichier artisan-18..21)
UPDATE artisans SET image_url = '/images/placeholder-artisan.jpg' WHERE id IN (18, 19, 20, 21);
