/**
 * Devoir bilan – Trouve ton artisan
 * Import des artisans depuis le fichier Excel fourni (data.xlsx) vers MySQL.
 * J'ai mappé les colonnes Excel et les spécialités/catégories vers notre schéma (avec variantes de libellés).
 *
 * Utilisation :
 *   1. Placer data.xlsx dans le dossier database/
 *   2. Exécuter 01_create_database.sql et 02_insert_data.sql (catégories + spécialités)
 *   3. Depuis la racine du projet : node database/import-excel.js
 * 
 * Colonnes attendues dans l'Excel (noms flexibles) :
 *   nom, Nom | email, Email | telephone, Téléphone | adresse, Adresse
 *   code_postal, Code postal | ville, Ville | note, Note | nombre_avis, Nombre avis
 *   specialite, Spécialité, specialite_id | image_url, Image | site_web, Site web
 *   a_propos, À propos | artisan_du_mois, Artisan du mois
 */

const path = require('path');
const fs = require('fs');

// Utiliser les modules du backend (dotenv, sequelize, exceljs)
const backendDir = path.join(__dirname, '..', 'backend');
module.paths.unshift(path.join(backendDir, 'node_modules'));
process.chdir(backendDir);
require('dotenv').config();

const ExcelJS = require('exceljs');
const sequelize = require(path.join(backendDir, 'config', 'database'));
const { QueryTypes } = require('sequelize');

const EXCEL_PATH = path.join(__dirname, 'data.xlsx');

// Mapping des noms de colonnes Excel (structure du fichier fourni)
const COL_MAP = {
  nom: ['nom', 'Nom'],
  email: ['email', 'Email'],
  specialite: ['specialite', 'Spécialité'],
  note: ['note', 'Note'],
  ville: ['ville', 'Ville'],
  a_propos: ['a_propos', 'A propos', 'À propos'],
  site_web: ['site_web', 'Site web', 'Site Web'],
  categorie: ['categorie', 'Catégorie'],
  artisan_du_mois: ['artisan_du_mois', 'Top', 'Artisan du mois'],
  telephone: ['telephone', 'Téléphone'],
  adresse: ['adresse', 'Adresse'],
  code_postal: ['code_postal', 'Code postal'],
  nombre_avis: ['nombre_avis', 'Nombre avis'],
  image_url: ['image_url', 'image', 'Image']
};

// Catégories Excel → categorie_id
const CATEGORIE_IDS = { alimentation: 4, batiment: 1, fabrication: 3, services: 2 };

// Spécialités Excel (texte) → (nom_specialite, categorie_id) pour notre base
// Variantes incluses (accents, féminin, pluriel)
const SPECIALITE_MAP = {
  boucher: ['Boucherie', 4], bouchere: ['Boucherie', 4], bouchers: ['Boucherie', 4],
  boulanger: ['Boulangerie', 4], boulangere: ['Boulangerie', 4], boulangers: ['Boulangerie', 4],
  chocolatier: ['Chocolatier', 4], chocolatiere: ['Chocolatier', 4],
  traiteur: ['Traiteur', 4], traiteuse: ['Traiteur', 4],
  chauffagiste: ['Chauffage', 1], chauffagistes: ['Chauffage', 1],
  electricien: ['Électricité', 1], electriciens: ['Électricité', 1],
  menuisier: ['Menuiserie', 1], menuisiere: ['Menuiserie', 1], menuisiers: ['Menuiserie', 1],
  plombier: ['Plomberie', 1], plombiers: ['Plomberie', 1],
  bijoutier: ['Bijouterie', 3], bijoutiere: ['Bijouterie', 3], bijoutiers: ['Bijouterie', 3],
  couturier: ['Couturier', 3], couturiere: ['Couturier', 3],
  ferronnier: ['Ferronnier', 3], feronnier: ['Ferronnier', 3], ferronier: ['Ferronnier', 3], ferronniers: ['Ferronnier', 3],
  ferronnerie: ['Ferronnier', 3], 'ferronnier d\'art': ['Ferronnier', 3], 'ferronnier dart': ['Ferronnier', 3],
  coiffeur: ['Coiffure', 2], coiffeuse: ['Coiffure', 2], coiffeurs: ['Coiffure', 2],
  fleuriste: ['Fleuriste', 2], fleuristes: ['Fleuriste', 2],
  toiletteur: ['Toiletteur', 2], toiletteuse: ['Toiletteur', 2],
  webdesign: ['Webdesign', 2], webdesigner: ['Webdesign', 2],
  ebeniste: ['Ébénisterie', 3], serrurier: ['Serrurerie', 3],
  maroquinier: ['Maroquinerie', 3], potier: ['Poterie', 3],
  boucherie: ['Boucherie', 4], boulangerie: ['Boulangerie', 4],
  plomberie: ['Plomberie', 1], electricite: ['Électricité', 1],
  menuiserie: ['Menuiserie', 1], chauffage: ['Chauffage', 1],
  coiffure: ['Coiffure', 2], bijouterie: ['Bijouterie', 3]
};

function findCol(headers, keys) {
  const row = headers[0] || [];
  for (const k of keys) {
    const i = row.findIndex(h => h && String(h).toLowerCase().trim() === k.toLowerCase());
    if (i >= 0) return i;
  }
  for (const k of keys) {
    const i = row.findIndex(h => h && String(h).includes(k));
    if (i >= 0) return i;
  }
  return -1;
}

async function ensureSpecialites(sequelize) {
  const toAdd = [
    ['Chocolatier', 'chocolatier', 4],
    ['Traiteur', 'traiteur', 4],
    ['Couturier', 'couturier', 3],
    ['Ferronnier', 'ferronnier', 3],
    ['Fleuriste', 'fleuriste', 2],
    ['Toiletteur', 'toiletteur', 2],
    ['Webdesign', 'webdesign', 2]
  ];
  for (const [nom, slug, catId] of toAdd) {
    await sequelize.query(
      `INSERT IGNORE INTO specialites (nom, slug, categorie_id) VALUES (?, ?, ?)`,
      { replacements: [nom, slug, catId] }
    );
  }
}

function normalizeKey(s) {
  return String(s).trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[èêë]/g, 'e').replace(/[àâä]/g, 'a')
    .replace(/[ùûü]/g, 'u').replace(/[îï]/g, 'i').replace(/[ôö]/g, 'o')
    .replace(/[ç]/g, 'c');
}

function resolveSpecialiteId(excelToId, excelSpecialite) {
  if (excelSpecialite == null || String(excelSpecialite).trim() === '') return null;
  const key = normalizeKey(String(excelSpecialite).trim());
  let id = excelToId[key];
  if (!id && key.length > 2) {
    const partial = Object.keys(excelToId).find(k => key.includes(k) || k.includes(key));
    if (partial) id = excelToId[partial];
  }
  return id || null;
}

async function main() {
  if (!fs.existsSync(EXCEL_PATH)) {
    console.error('Fichier non trouvé :', EXCEL_PATH);
    process.exit(1);
  }

  console.log('Lecture de', EXCEL_PATH);
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(EXCEL_PATH);
  const ws = wb.worksheets[0];
  if (!ws) {
    console.error('Aucune feuille trouvée.');
    process.exit(1);
  }

  const data = [];
  ws.eachRow((row, rowNum) => {
    const vals = row.values || [];
    data.push(vals.slice(1).map(v => (v != null ? String(v) : '')));
  });

  if (!data.length) {
    console.error('Feuille vide.');
    process.exit(1);
  }

  const headers = [data[0]];
  const rows = data.slice(1).filter(r => r && r.some(c => c != null && String(c).trim() !== ''));

  const colIdx = {};
  for (const [dbKey, keys] of Object.entries(COL_MAP)) {
    const i = findCol(headers, keys);
    if (i >= 0) colIdx[dbKey] = i;
  }

  if (colIdx.nom === undefined || colIdx.email === undefined) {
    console.error('Colonnes obligatoires manquantes : nom, email. Colonnes trouvées:', Object.keys(colIdx));
    process.exit(1);
  }

  // Ajouter les spécialités manquantes (Chocolatier, Traiteur, etc.) si besoin
  await ensureSpecialites(sequelize);

  // Vider la table artisans avant import
  await sequelize.query('DELETE FROM artisans');
  console.log('Table artisans vidée.');

  // Récupérer les spécialités et construire un mapping Excel -> id
  const specialitesRaw = await sequelize.query(
    'SELECT id, nom, slug FROM specialites',
    { type: QueryTypes.SELECT }
  );
  const specialites = specialitesRaw.map(r => ({
    id: r.id,
    nom: String(r.nom || '').trim(),
    slug: String(r.slug || '').trim()
  }));
  // Index: valeur normalisée -> id
  const excelToId = {};
  for (const sp of specialites) {
    excelToId[normalizeKey(sp.nom)] = sp.id;
    excelToId[normalizeKey(sp.slug)] = sp.id;
  }
  for (const [excelKey, [dbNom]] of Object.entries(SPECIALITE_MAP)) {
    const nomNorm = normalizeKey(dbNom);
    const sp = specialites.find(s => normalizeKey(s.nom) === nomNorm || normalizeKey(s.slug) === nomNorm);
    if (sp) excelToId[excelKey] = sp.id;
  }

  let inserted = 0;
  let errors = 0;

  for (const row of rows) {
    const nom = row[colIdx.nom] != null ? String(row[colIdx.nom]).trim() : '';
    const email = row[colIdx.email] != null ? String(row[colIdx.email]).trim() : '';
    if (!nom || !email) {
      errors++;
      continue;
    }

    const specialiteId = colIdx.specialite != null
      ? resolveSpecialiteId(excelToId, row[colIdx.specialite])
      : null;
    if (specialiteId == null && colIdx.specialite != null) {
      console.warn(`Spécialité inconnue pour "${nom}", ligne ignorée.`);
      errors++;
      continue;
    }
    if (specialiteId == null) {
      console.warn(`"${nom}" : spécialité requise. Ligne ignorée.`);
      errors++;
      continue;
    }

    const get = (k, def = null) => {
      const i = colIdx[k];
      if (i == null) return def;
      const v = row[i];
      if (v == null || v === '') return def;
      return v;
    };

    const artisan = {
      nom,
      email,
      telephone: get('telephone') ?? null,
      adresse: get('adresse') ?? null,
      code_postal: get('code_postal') ?? null,
      ville: get('ville') ?? null,
      note: parseFloat(get('note')) || 0,
      nombre_avis: parseInt(get('nombre_avis'), 10) || 0,
      specialite_id: specialiteId,
      image_url: get('image_url') ?? null,
      site_web: get('site_web') ?? null,
      a_propos: get('a_propos') ?? null,
      artisan_du_mois: /^(1|true|oui|yes|o|y|vrai)$/i.test(String(get('artisan_du_mois', false)).trim())
    };

    try {
      await sequelize.query(
        `INSERT INTO artisans (nom, email, telephone, adresse, code_postal, ville, note, nombre_avis, specialite_id, image_url, site_web, a_propos, artisan_du_mois)
         VALUES (:nom, :email, :telephone, :adresse, :code_postal, :ville, :note, :nombre_avis, :specialite_id, :image_url, :site_web, :a_propos, :artisan_du_mois)`,
        { replacements: artisan }
      );
      inserted++;
      console.log('  Importé:', artisan.nom);
    } catch (err) {
      console.error('  Erreur pour', artisan.nom, err.message);
      errors++;
    }
  }

  console.log('\nTerminé. Importés:', inserted, '| Erreurs:', errors);
  process.exit(errors > 0 ? 1 : 0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
