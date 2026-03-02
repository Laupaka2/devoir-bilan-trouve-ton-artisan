import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArtisansDuMois } from '../services/api';
import './Home.scss';

const Home = () => {
  const [artisansDuMois, setArtisansDuMois] = useState([]);
  const [loading, setLoading] = useState(true);

  // SEO : titre et meta description
  useEffect(() => {
    document.title = 'Trouve ton artisan - Plateforme des artisans Auvergne-Rhône-Alpes';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Trouvez l\'artisan qu\'il vous faut. Plateforme dédiée aux artisans de la région Auvergne-Rhône-Alpes. Recherchez par catégorie et contactez directement les professionnels.');
    }
  }, []);

  useEffect(() => {
    getArtisansDuMois()
      .then(response => {
        setArtisansDuMois(Array.isArray(response?.data) ? response.data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des artisans du mois:', error);
        setLoading(false);
      });
  }, []);

  const renderStars = (note) => {
    const fullStars = Math.floor(note);
    const hasHalfStar = note % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="stars" aria-label={`Note : ${note} sur 5`}>
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star star-full" aria-hidden="true">★</span>
        ))}
        {hasHalfStar && (
          <span className="star star-half" aria-hidden="true">★</span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="star star-empty" aria-hidden="true">☆</span>
        ))}
      </div>
    );
  };

  return (
    <div className="home">
      {/* Section Hero */}
      <section className="hero py-5" aria-labelledby="hero-title">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 id="hero-title" className="display-4 fw-bold mb-4">
                Trouvez l'artisan qu'il vous faut
              </h1>
              <p className="lead mb-4">
                La plateforme dédiée aux artisans de la région Auvergne-Rhône-Alpes.
                Des professionnels qualifiés pour tous vos projets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Comment trouver mon artisan */}
      <section className="how-it-works py-5" aria-labelledby="how-it-works-title">
        <div className="container">
          <h2 id="how-it-works-title" className="text-center mb-5">Comment trouver mon artisan ?</h2>
          <div className="row g-4" role="list">
            <div className="col-md-6 col-lg-3" role="listitem">
              <div className="step-card text-center p-4">
                <div className="step-number rounded-circle d-inline-flex align-items-center justify-content-center mb-3" aria-label="Étape 1">
                  1
                </div>
                <h3 className="h5 mb-3 text-primary-custom">Choisir la catégorie</h3>
                <p className="text-muted">
                  Choisir la catégorie d'artisanat dans le menu (Bâtiment, Services, Fabrication, Alimentation).
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" role="listitem">
              <div className="step-card text-center p-4">
                <div className="step-number rounded-circle d-inline-flex align-items-center justify-content-center mb-3" aria-label="Étape 2">
                  2
                </div>
                <h3 className="h5 mb-3 text-primary-custom">Choisir un artisan</h3>
                <p className="text-muted">
                  Parcourir la liste des artisans et sélectionner celui qui correspond à vos besoins.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" role="listitem">
              <div className="step-card text-center p-4">
                <div className="step-number rounded-circle d-inline-flex align-items-center justify-content-center mb-3" aria-label="Étape 3">
                  3
                </div>
                <h3 className="h5 mb-3 text-primary-custom">Le contacter</h3>
                <p className="text-muted">
                  Le contacter via le formulaire de contact directement sur sa fiche.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" role="listitem">
              <div className="step-card text-center p-4">
                <div className="step-number rounded-circle d-inline-flex align-items-center justify-content-center mb-3" aria-label="Étape 4">
                  4
                </div>
                <h3 className="h5 mb-3 text-primary-custom">Recevoir une réponse</h3>
                <p className="text-muted">
                  Une réponse sera apportée sous 48h par l'artisan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Artisans du mois */}
      <section className="artisans-du-mois py-5" aria-labelledby="artisans-du-mois-title">
        <div className="container">
          <h2 id="artisans-du-mois-title" className="text-center mb-5">Les artisans du mois</h2>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          ) : artisansDuMois.length > 0 ? (
            <div className="row">
              {artisansDuMois.map((artisan) => (
                <div key={artisan.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 artisan-du-mois-card">
                    {artisan.image_url && (
                      <img 
                        src={artisan.image_url} 
                        alt={artisan.nom}
                        className="card-img-top"
                        onError={(e) => {
                          e.target.src = '/images/placeholder-artisan.jpg';
                        }}
                      />
                    )}
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{artisan.nom}</h5>
                      {renderStars(parseFloat(artisan.note))}
                      <p className="card-text text-muted mb-2">
                        <strong>Spécialité :</strong> {artisan.specialite?.nom || 'Non renseignée'}
                      </p>
                      <p className="card-text text-muted mb-auto">
                        <strong>Localisation :</strong> {artisan.ville ? `${artisan.code_postal || ''} ${artisan.ville}`.trim() : 'Non renseignée'}
                      </p>
                      <Link 
                        to={`/artisan/${artisan.id}`} 
                        className="btn btn-artisan-du-mois mt-3"
                      >
                        Voir la fiche
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">Aucun artisan du mois pour le moment.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

