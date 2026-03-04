-- Devoir bilan – Trouve ton artisan
-- Données de test : catégories (4), spécialités par catégorie, artisans avec 3 artisans du mois.

-- Insertion des catégories
INSERT INTO categories (nom, slug) VALUES
('Bâtiment', 'batiment'),
('Services', 'services'),
('Fabrication', 'fabrication'),
('Alimentation', 'alimentation');

-- Insertion des spécialités
-- Bâtiment
INSERT INTO specialites (nom, slug, categorie_id) VALUES
('Maçonnerie', 'maconnerie', 1),
('Plomberie', 'plomberie', 1),
('Électricité', 'electricite', 1),
('Chauffage', 'chauffage', 1),
('Menuiserie', 'menuiserie', 1),
('Peinture', 'peinture', 1),
('Couverture', 'couverture', 1);

-- Services
INSERT INTO specialites (nom, slug, categorie_id) VALUES
('Coiffure', 'coiffure', 2),
('Esthétique', 'esthetique', 2),
('Réparation automobile', 'reparation-automobile', 2),
('Nettoyage', 'nettoyage', 2),
('Jardinage', 'jardinage', 2);

-- Fabrication
INSERT INTO specialites (nom, slug, categorie_id) VALUES
('Ébénisterie', 'ebenisterie', 3),
('Serrurerie', 'serrurerie', 3),
('Maroquinerie', 'maroquinerie', 3),
('Bijouterie', 'bijouterie', 3),
('Poterie', 'poterie', 3);

-- Alimentation
INSERT INTO specialites (nom, slug, categorie_id) VALUES
('Boulangerie', 'boulangerie', 4),
('Pâtisserie', 'patisserie', 4),
('Boucherie', 'boucherie', 4),
('Charcuterie', 'charcuterie', 4),
('Fromagerie', 'fromagerie', 4);

-- Insertion des artisans (avec 3 artisans du mois)
-- Artisan du mois 1 - Maçonnerie (specialite_id 1)
INSERT INTO artisans (nom, email, telephone, adresse, code_postal, ville, note, nombre_avis, specialite_id, image_url, site_web, a_propos, artisan_du_mois) VALUES
('Dupont Maçonnerie', 'contact@dupont-maconnerie.fr', '04 26 12 34 56', '15 rue de la République', '69001', 'Lyon', 4.8, 127, 1, '/images/artisans/artisan-1.jpg', 'https://www.dupont-maconnerie.fr', 'Spécialiste en maçonnerie depuis 25 ans, nous réalisons tous vos travaux de construction, rénovation et réparation. Qualité et savoir-faire au service de vos projets.', TRUE);

-- Artisan du mois 2 - Boulangerie (specialite_id 18)
INSERT INTO artisans (nom, email, telephone, adresse, code_postal, ville, note, nombre_avis, specialite_id, image_url, site_web, a_propos, artisan_du_mois) VALUES
('Boulangerie Martin', 'contact@boulangerie-martin.fr', '04 26 23 45 67', '42 avenue Victor Hugo', '69003', 'Lyon', 4.9, 203, 18, '/images/artisans/artisan-2.jpg', 'https://www.boulangerie-martin.fr', 'Boulangerie artisanale traditionnelle. Nous fabriquons notre pain au levain naturel et nos pâtisseries avec des produits locaux et de qualité.', TRUE);

-- Artisan du mois 3 - Électricité (specialite_id 3)
INSERT INTO artisans (nom, email, telephone, adresse, code_postal, ville, note, nombre_avis, specialite_id, image_url, site_web, a_propos, artisan_du_mois) VALUES
('Électricité Bernard', 'contact@electricite-bernard.fr', '04 26 34 56 78', '8 place Bellecour', '69002', 'Lyon', 4.7, 156, 3, '/images/artisans/artisan-3.jpg', 'https://www.electricite-bernard.fr', 'Électricien certifié, nous intervenons pour tous vos besoins en électricité : installation, dépannage, rénovation. Devis gratuit et intervention rapide.', TRUE);

-- Autres artisans - Bâtiment (images artisan-4 à artisan-8)
INSERT INTO artisans (nom, email, telephone, adresse, code_postal, ville, note, nombre_avis, specialite_id, image_url, site_web, a_propos) VALUES
('Plomberie Durand', 'contact@plomberie-durand.fr', '04 26 45 67 89', '25 rue Garibaldi', '69006', 'Lyon', 4.6, 98, 2, '/images/artisans/artisan-4.jpg', NULL, 'Plombier professionnel, intervention 24/7 pour vos urgences. Installation, réparation, dépannage de tous vos équipements sanitaires.'),
('Chauffage & Climatisation Moreau', 'contact@chauffage-moreau.fr', '04 26 56 78 90', '12 boulevard de la Croix-Rousse', '69004', 'Lyon', 4.5, 87, 4, '/images/artisans/artisan-5.jpg', 'https://www.chauffage-moreau.fr', 'Spécialiste en chauffage et climatisation. Installation, entretien et dépannage de chaudières, pompes à chaleur, climatiseurs.'),
('Menuiserie Petit', 'contact@menuiserie-petit.fr', '04 26 67 89 01', '30 rue de la Charité', '69002', 'Lyon', 4.7, 112, 5, '/images/artisans/artisan-6.jpg', NULL, 'Menuisier ébéniste, création sur mesure de meubles, portes, fenêtres et agencements intérieurs. Travail du bois de qualité.'),
('Peinture & Décoration Laurent', 'contact@peinture-laurent.fr', '04 26 78 90 12', '18 avenue Jean Jaurès', '69007', 'Lyon', 4.4, 76, 6, '/images/artisans/artisan-7.jpg', 'https://www.peinture-laurent.fr', 'Peintre en bâtiment, rénovation intérieure et extérieure. Travaux de qualité avec finitions soignées.'),
('Couverture & Zinguerie Simon', 'contact@couverture-simon.fr', '04 26 89 01 23', '5 rue de la Part-Dieu', '69003', 'Lyon', 4.6, 94, 7, '/images/artisans/artisan-8.jpg', NULL, 'Couvreur zingueur, réparation et installation de toitures. Travaux en ardoise, tuile, zinc et toiture végétalisée.');

-- Services (images artisan-9 à artisan-13)
INSERT INTO artisans (nom, email, telephone, adresse, code_postal, ville, note, nombre_avis, specialite_id, image_url, site_web, a_propos) VALUES
('Salon Coiffure Sophie', 'contact@coiffure-sophie.fr', '04 26 90 12 34', '22 rue de la République', '69001', 'Lyon', 4.8, 145, 8, '/images/artisans/artisan-9.jpg', 'https://www.coiffure-sophie.fr', 'Salon de coiffure mixte, coupes tendances et colorations. Produits bio et naturels. Accueil chaleureux et professionnel.'),
('Institut Beauté Élégance', 'contact@beaute-elegance.fr', '04 26 01 23 45', '14 place des Terreaux', '69001', 'Lyon', 4.7, 132, 9, '/images/artisans/artisan-10.jpg', NULL, 'Institut de beauté proposant soins du visage, épilation, manucure, pédicure. Produits haut de gamme et techniques professionnelles.'),
('Garage Auto Express', 'contact@garage-express.fr', '04 26 12 34 56', '50 avenue de Saxe', '69003', 'Lyon', 4.5, 167, 10, '/images/artisans/artisan-11.jpg', 'https://www.garage-express.fr', 'Garage automobile, réparation toutes marques, entretien, contrôle technique. Devis gratuit et intervention rapide.'),
('Nettoyage Pro Services', 'contact@nettoyage-pro.fr', '04 26 23 45 67', '7 rue de la Bourse', '69002', 'Lyon', 4.6, 89, 11, '/images/artisans/artisan-12.jpg', NULL, 'Service de nettoyage professionnel pour entreprises et particuliers. Nettoyage régulier ou ponctuel, produits écologiques.'),
('Jardins & Espaces Verts', 'contact@jardins-espaces.fr', '04 26 34 56 78', '35 chemin de Montchat', '69003', 'Lyon', 4.7, 103, 12, '/images/artisans/artisan-13.jpg', 'https://www.jardins-espaces.fr', 'Paysagiste, création et entretien de jardins, tonte, taille, plantation. Aménagement d''espaces verts sur mesure.');

-- Fabrication (images artisan-14 à artisan-18)
INSERT INTO artisans (nom, email, telephone, adresse, code_postal, ville, note, nombre_avis, specialite_id, image_url, site_web, a_propos) VALUES
('Ébénisterie d''Art', 'contact@ebenisterie-art.fr', '04 26 45 67 89', '12 rue des Chartreux', '69001', 'Lyon', 4.9, 78, 13, '/images/artisans/artisan-14.jpg', 'https://www.ebenisterie-art.fr', 'Ébéniste d''art, création de meubles sur mesure, restauration de mobilier ancien. Travail du bois précieux et essences rares.'),
('Serrurerie Sécurité', 'contact@serrurerie-securite.fr', '04 26 56 78 90', '28 rue de la Barre', '69002', 'Lyon', 4.6, 124, 14, '/images/artisans/artisan-15.jpg', NULL, 'Serrurier professionnel, installation et réparation de serrures, portes blindées, volets roulants. Intervention d''urgence 24/7.'),
('Maroquinerie Fine', 'contact@maroquinerie-fine.fr', '04 26 67 89 01', '15 rue Mercière', '69002', 'Lyon', 4.8, 67, 15, '/images/artisans/artisan-16.jpg', 'https://www.maroquinerie-fine.fr', 'Maroquinier artisan, création de sacs, portefeuilles et accessoires en cuir. Pièces uniques et sur mesure.'),
('Bijouterie Or & Argent', 'contact@bijouterie-or.fr', '04 26 78 90 12', '8 rue de la République', '69001', 'Lyon', 4.7, 91, 16, '/images/artisans/artisan-17.jpg', NULL, 'Bijoutier joaillier, création et réparation de bijoux. Achat et vente d''or, argent et pierres précieuses.'),
('Atelier Poterie Terre', 'contact@poterie-terre.fr', '04 26 89 01 23', '20 montée de la Grande Côte', '69001', 'Lyon', 4.5, 54, 17, '/images/placeholder-artisan.jpg', 'https://www.poterie-terre.fr', 'Potier céramiste, création de poteries artisanales, vaisselle et objets décoratifs. Stages et cours disponibles.');

-- Alimentation (specialite_id 19 Pâtisserie, 20 Boucherie, 22 Fromagerie - images placeholder)
INSERT INTO artisans (nom, email, telephone, adresse, code_postal, ville, note, nombre_avis, specialite_id, image_url, site_web, a_propos) VALUES
('Pâtisserie Douceur', 'contact@patisserie-douceur.fr', '04 26 90 12 34', '38 rue de la République', '69001', 'Lyon', 4.8, 178, 19, '/images/placeholder-artisan.jpg', 'https://www.patisserie-douceur.fr', 'Pâtisserie artisanale, gâteaux sur mesure, chocolats et macarons. Créations originales pour tous vos événements.'),
('Boucherie Charcuterie Tradition', 'contact@boucherie-tradition.fr', '04 26 01 23 45', '25 cours Franklin Roosevelt', '69006', 'Lyon', 4.6, 142, 20, '/images/placeholder-artisan.jpg', NULL, 'Boucherie charcuterie traditionnelle, viandes de qualité, produits locaux. Préparations maison et spécialités régionales.'),
('Fromagerie Affinage', 'contact@fromagerie-affinage.fr', '04 26 12 34 56', '12 rue des Archers', '69002', 'Lyon', 4.9, 156, 22, '/images/placeholder-artisan.jpg', 'https://www.fromagerie-affinage.fr', 'Fromager affineur, sélection de fromages d''exception, produits laitiers et spécialités fromagères. Conseils et dégustation.');

