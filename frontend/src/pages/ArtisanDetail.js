/**
 * Devoir bilan – Trouve ton artisan
 * Fiche détaillée d'un artisan : infos, à propos, formulaire de contact.
 * J'ai relié le formulaire à l'API contacts et géré le SEO dynamique (titre + description).
 */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArtisanById, createContact } from '../services/api';
import ContactForm from '../components/ContactForm';
import './ArtisanDetail.scss';

const ArtisanDetail = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Titre et meta selon l'artisan pour le SEO
  useEffect(() => {
    if (artisan) {
      document.title = `${artisan.nom} - Fiche artisan - Trouve ton artisan`;
      const metaDesc = document.querySelector('meta[name="description"]');
      const description = artisan.a_propos
        ? `${artisan.a_propos.substring(0, 155)}${artisan.a_propos.length > 155 ? '...' : ''}`
        : `${artisan.nom} - ${artisan.specialite?.nom || 'Artisan'} en Auvergne-Rhône-Alpes. Contactez-le pour vos projets.`;
      if (metaDesc) {
        metaDesc.setAttribute('content', description.substring(0, 160));
      }
    }
  }, [artisan]);

  useEffect(() => {
    getArtisanById(id)
      .then(response => {
        setArtisan(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement de l\'artisan:', err);
        setError('Artisan non trouvé');
        setLoading(false);
      });
  }, [id]);

  const handleContactSubmit = async (formData) => {
    try {
      await createContact({
        ...formData,
        artisan_id: parseInt(id)
      });
      return { success: true, message: 'Votre message a été envoyé avec succès. L\'artisan vous répondra sous 48h.' };
    } catch (err) {
      console.error('Erreur lors de l\'envoi du message:', err);
      return { 
        success: false, 
        message: err.response?.data?.errors 
          ? err.response.data.errors.map(e => e.msg).join(', ')
          : 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.'
      };
    }
  };

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
        <span className="ms-2">({note}/5 - {artisan.nombre_avis} avis)</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !artisan) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Erreur</h4>
          <p>{error || 'Artisan non trouvé'}</p>
          <hr />
          <p className="mb-0">
            <Link to="/" className="alert-link">Retour à l'accueil</Link>
          </p>
        </div>
      </div>
    );
  }

  const localisation = artisan.ville 
    ? `${artisan.code_postal || ''} ${artisan.ville}`.trim()
    : 'Localisation non renseignée';

  return (
    <div className="artisan-detail">
      <div className="container py-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Accueil</Link>
            </li>
            {artisan.specialite?.categorie && (
              <li className="breadcrumb-item">
                <Link to={`/categorie/${artisan.specialite.categorie.slug}`}>
                  {artisan.specialite.categorie.nom}
                </Link>
              </li>
            )}
            <li className="breadcrumb-item active" aria-current="page">
              {artisan.nom}
            </li>
          </ol>
        </nav>

        <div className="artisan-header mb-4">
          <h1 className="mb-3">{artisan.nom}</h1>
          {renderStars(parseFloat(artisan.note))}
        </div>

        {artisan.image_url && (
          <div className="artisan-image mb-4">
            <img 
              src={artisan.image_url} 
              alt={artisan.nom}
              className="img-fluid rounded"
              onError={(e) => {
                e.target.src = `/images/artisans/artisan-${id}.jpg`;
                e.target.onerror = () => {
                  e.target.src = '/images/placeholder-artisan.jpg';
                };
              }}
            />
          </div>
        )}

        <div className="row">
          <div className="col-md-6 col-lg-6">
            <div className="artisan-info mb-4">
              <h2 className="h4 mb-3">Informations</h2>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Spécialité :</strong> {artisan.specialite?.nom || 'Non renseignée'}
                </li>
                <li className="mb-2">
                  <strong>Localisation :</strong> {localisation}
                </li>
                {artisan.telephone && (
                  <li className="mb-2">
                    <strong>Téléphone :</strong>{' '}
                    <a href={`tel:${artisan.telephone}`}>{artisan.telephone}</a>
                  </li>
                )}
                {artisan.email && (
                  <li className="mb-2">
                    <strong>Email :</strong>{' '}
                    <a href={`mailto:${artisan.email}`}>{artisan.email}</a>
                  </li>
                )}
                {artisan.site_web && (
                  <li className="mb-2">
                    <strong>Site web :</strong>{' '}
                    <a href={artisan.site_web} target="_blank" rel="noopener noreferrer">
                      {artisan.site_web}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {artisan.a_propos && (
              <div className="artisan-about mb-4">
                <h2 className="h4 mb-3">À propos</h2>
                <p className="text-muted">{artisan.a_propos}</p>
              </div>
            )}
          </div>

          <div className="col-md-6 col-lg-6">
            <div className="contact-form-container">
              <h2 className="h4 mb-3">Contacter cet artisan</h2>
              <ContactForm onSubmit={handleContactSubmit} artisanNom={artisan.nom} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDetail;

