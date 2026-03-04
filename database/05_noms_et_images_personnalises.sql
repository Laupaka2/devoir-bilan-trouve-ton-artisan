-- Devoir bilan – Trouve ton artisan
-- Mise à jour des image_url par artisan (nom) : association des photos aux fiches.
-- Les noms viennent de l'Excel ; j'utilise WHERE nom = '...' pour cibler chaque artisan.
-- =============================================================

-- ALIMENTATION (ids 1-4)
UPDATE artisans SET image_url = '/images/artisans/artisan-3.jpg' WHERE nom = 'Chocolaterie Labbé';
UPDATE artisans SET image_url = '/images/artisans/artisan-2.jpg' WHERE nom = 'Au pain chaud';
UPDATE artisans SET image_url = '/images/artisans/artisan-1.jpg' WHERE nom = 'Boucherie Dumont';
UPDATE artisans SET image_url = '/images/artisans/artisan-4.jpg' WHERE nom = 'Traiteur Truchon';

-- BÂTIMENT (ids 5-8)
UPDATE artisans SET image_url = '/images/artisans/artisan-5.jpg' WHERE nom = 'Orville Salmons';
UPDATE artisans SET image_url = '/images/artisans/artisan-7.jpg' WHERE nom = 'Boutot & fils';
UPDATE artisans SET image_url = '/images/artisans/artisan-6.jpg' WHERE nom = 'Mont Blanc Électricité';
UPDATE artisans SET image_url = '/images/artisans/artisan-8.jpg' WHERE nom = 'Vallis Bellemare';

-- FABRICATION (ids 9-11)
UPDATE artisans SET image_url = '/images/artisans/artisan-11.jpg' WHERE nom = 'Ernest Carignan';
UPDATE artisans SET image_url = '/images/artisans/artisan-10.jpg' WHERE nom = 'Amitee Lécuyer';
UPDATE artisans SET image_url = '/images/artisans/artisan-9.jpg' WHERE nom = 'Claude Quinn';

-- SERVICES (ids 12-17) — à ajuster selon tes screenshots
UPDATE artisans SET image_url = '/images/artisans/artisan-12.jpg' WHERE nom = 'Royden Charbonneau';
UPDATE artisans SET image_url = '/images/artisans/artisan-13.jpg' WHERE nom = 'Leala Dennis';
UPDATE artisans SET image_url = '/images/artisans/artisan-14.jpg' WHERE nom = "C'est sup'hair";
UPDATE artisans SET image_url = '/images/artisans/artisan-15.jpg' WHERE nom = 'Le monde des fleurs';
UPDATE artisans SET image_url = '/images/artisans/artisan-16.jpg' WHERE nom = 'Valérie Laderoute';
UPDATE artisans SET image_url = '/images/artisans/artisan-17.jpg' WHERE nom = 'CM Graphisme';
