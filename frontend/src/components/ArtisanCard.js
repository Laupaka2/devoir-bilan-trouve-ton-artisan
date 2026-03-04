/**
 * Devoir bilan – Trouve ton artisan
 * Carte artisan pour les listes : image, nom, note en étoiles, spécialité, localisation, lien fiche.
 * J'affiche une image de repli si l'URL échoue et j'ai mis les étoiles en aria-label pour l'accessibilité.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './ArtisanCard.scss';

const ArtisanCard = ({ artisan }) => {
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
        <span className="visually-hidden">{note} sur 5</span>
      </div>
    );
  };

  const localisation = artisan.ville 
    ? `${artisan.code_postal || ''} ${artisan.ville}`.trim()
    : 'Localisation non renseignée';

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <Link 
        to={`/artisan/${artisan.id}`} 
        className="artisan-card card h-100 text-decoration-none"
        aria-label={`Voir la fiche de ${artisan.nom}`}
      >
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
            <strong>Localisation :</strong> {localisation}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ArtisanCard;

