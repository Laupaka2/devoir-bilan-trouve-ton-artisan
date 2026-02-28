import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { getArtisans, getCategoryBySlug } from '../services/api';
import ArtisanCard from '../components/ArtisanCard';
import './ArtisansList.scss';

const ArtisansList = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [artisans, setArtisans] = useState([]);
  const [categorie, setCategorie] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchTerm = searchParams.get('search');

  // SEO : titre et meta description selon le contexte
  useEffect(() => {
    const titre = searchTerm
      ? `Résultats pour "${searchTerm}" - Trouve ton artisan`
      : categorie
        ? `${categorie.nom} - Trouve ton artisan`
        : 'Tous les artisans - Trouve ton artisan';
    document.title = titre;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Retrouvez les artisans de la région Auvergne-Rhône-Alpes. Consultez leurs fiches et contactez-les directement pour vos projets.');
    }
  }, [categorie, searchTerm]);

  useEffect(() => {
    setLoading(true);
    
    const fetchData = async () => {
      try {
        let currentCategorie = null;
        
        // Si on a un slug de catégorie, récupérer la catégorie
        if (slug && slug !== 'all') {
          const categorieResponse = await getCategoryBySlug(slug);
          currentCategorie = categorieResponse.data;
          setCategorie(currentCategorie);
        }

        // Construire les paramètres de recherche
        const params = {};
        if (searchTerm) {
          params.search = searchTerm;
        } else if (slug && slug !== 'all' && currentCategorie) {
          params.categorie_id = currentCategorie.id;
        }

        // Récupérer les artisans
        const artisansResponse = await getArtisans(params);
        setArtisans(artisansResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, searchTerm]);

  return (
    <div className="artisans-list">
      <div className="container py-5">
        <div className="mb-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Accueil</Link>
              </li>
              {categorie && (
                <li className="breadcrumb-item active" aria-current="page">
                  {categorie.nom}
                </li>
              )}
              {searchTerm && (
                <li className="breadcrumb-item active" aria-current="page">
                  Recherche : {searchTerm}
                </li>
              )}
            </ol>
          </nav>
        </div>

        <h1 className="mb-4">
          {searchTerm 
            ? `Résultats de recherche pour "${searchTerm}"`
            : categorie 
              ? `Artisans - ${categorie.nom}`
              : 'Tous les artisans'
          }
        </h1>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </div>
        ) : artisans.length > 0 ? (
          <div className="row">
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            <h4 className="alert-heading">Aucun artisan trouvé</h4>
            <p>
              {searchTerm 
                ? `Aucun artisan ne correspond à votre recherche "${searchTerm}".`
                : 'Aucun artisan disponible dans cette catégorie pour le moment.'
              }
            </p>
            <hr />
            <p className="mb-0">
              <Link to="/" className="alert-link">Retour à l'accueil</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisansList;

