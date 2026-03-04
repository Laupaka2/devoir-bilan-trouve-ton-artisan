/**
 * Devoir bilan – Trouve ton artisan
 * Page légale générique (mentions, données personnelles, accessibilité, cookies). Titre dynamique, contenu "en construction".
 */
import React, { useEffect } from 'react';
import './LegalPage.scss';

const LegalPage = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - Trouve ton artisan`;
  }, [title]);

  return (
    <div className="legal-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="mb-4">{title}</h1>
            <div className="alert alert-info" role="alert">
              <h4 className="alert-heading">Page en construction</h4>
              <p className="mb-0">
                Cette page est actuellement en construction. 
                Elle sera complétée prochainement par un cabinet spécialisé.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;

