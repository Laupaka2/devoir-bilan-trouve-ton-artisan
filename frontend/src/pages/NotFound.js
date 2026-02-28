import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  // Référencement : Mise à jour du titre et de la description pour les moteurs de recherche
  useEffect(() => {
    document.title = 'Page non trouvée - Trouve ton artisan';
    
    // Mise à jour de la meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'La page que vous avez demandée n\'existe pas. Retournez à la page d\'accueil pour trouver un artisan en Auvergne-Rhône-Alpes.');
    } else {
      // Créer la meta description si elle n'existe pas
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'La page que vous avez demandée n\'existe pas. Retournez à la page d\'accueil pour trouver un artisan en Auvergne-Rhône-Alpes.';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, []);

  return (
    <div className="not-found">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="not-found-content">
              <div className="not-found-image-container mb-4">
                <img 
                  src="/images/404.jpg" 
                  alt="Page non trouvée - Erreur 404"
                  className="not-found-image"
                  onError={(e) => {
                    // Si l'image n'existe pas, afficher un symbole SVG
                    e.target.style.display = 'none';
                    const container = e.target.parentElement;
                    if (container && !container.querySelector('.not-found-svg')) {
                      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                      svg.setAttribute('class', 'not-found-svg');
                      svg.setAttribute('width', '200');
                      svg.setAttribute('height', '200');
                      svg.setAttribute('viewBox', '0 0 200 200');
                      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                      circle.setAttribute('cx', '100');
                      circle.setAttribute('cy', '100');
                      circle.setAttribute('r', '80');
                      circle.setAttribute('fill', '#f1f8fc');
                      circle.setAttribute('stroke', '#0074c7');
                      circle.setAttribute('stroke-width', '3');
                      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                      text.setAttribute('x', '100');
                      text.setAttribute('y', '110');
                      text.setAttribute('text-anchor', 'middle');
                      text.setAttribute('font-size', '60');
                      text.setAttribute('font-weight', 'bold');
                      text.setAttribute('fill', '#0074c7');
                      text.textContent = '404';
                      svg.appendChild(circle);
                      svg.appendChild(text);
                      container.appendChild(svg);
                    }
                  }}
                />
              </div>
              <h1 className="display-1 fw-bold mb-3">404</h1>
              <h2 className="h3 mb-4">Page non trouvée</h2>
              <p className="lead text-muted mb-4">
                La page que vous avez demandée n'existe pas ou a été déplacée.
              </p>
              <p className="text-muted mb-4">
                Vous pouvez retourner à la page d'accueil pour continuer votre recherche d'artisan.
              </p>
              <Link to="/" className="btn btn-404 btn-lg">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

