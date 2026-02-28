import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer footer-custom mt-auto">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-3 mb-md-0">
            <h5 className="mb-3">Pages légales</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/mentions-legales" className="text-white-50 text-decoration-none">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/donnees-personnelles" className="text-white-50 text-decoration-none">
                  Données personnelles
                </Link>
              </li>
              <li>
                <Link to="/accessibilité" className="text-white-50 text-decoration-none">
                  Accessibilité
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-white-50 text-decoration-none">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-6 col-lg-4 mb-3 mb-md-0">
            <h5 className="mb-3">Contact</h5>
            <address className="text-white-50 mb-0">
              <strong>Région Auvergne-Rhône-Alpes</strong><br />
              Antenne de Lyon<br />
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              <a href="tel:+33426734000" className="text-white-50 text-decoration-none">
                +33 (0)4 26 73 40 00
              </a>
            </address>
          </div>

          <div className="col-md-12 col-lg-4">
            <h5 className="mb-3">À propos</h5>
            <p className="text-white-50 mb-0">
              Plateforme dédiée aux artisans de la région Auvergne-Rhône-Alpes.
              Trouvez facilement l'artisan qu'il vous faut pour tous vos projets.
            </p>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        <div className="row">
          <div className="col-12 text-center">
            <p className="text-white-50 mb-0">
              &copy; {new Date().getFullYear()} Région Auvergne-Rhône-Alpes - Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

