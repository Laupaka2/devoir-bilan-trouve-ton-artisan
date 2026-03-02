import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories } from '../services/api';
import './Header.scss';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les catégories depuis l'API
    setIsLoading(true);
    getCategories()
      .then(response => {
        setCategories(Array.isArray(response?.data) ? response.data : []);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des catégories:', error);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/categorie/all?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Ligne 1 : Logo + Titre + Menu burger (mobile) */}
          <div className="header-top d-flex align-items-center justify-content-between w-100">
            <Link className="navbar-brand d-flex align-items-center" to="/" aria-label="Accueil - Trouve ton artisan">
              <img 
                src="/images/Logo.png" 
                alt="Logo Trouve ton artisan" 
                className="logo"
              />
              <span className="fw-bold">Trouve ton artisan</span>
            </Link>

            <button
              className="navbar-toggler d-lg-none"
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
              aria-controls="navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Barre de recherche mobile - toujours visible en dessous */}
          <form className="d-flex search-form search-form-mobile d-lg-none" onSubmit={handleSearch} role="search">
            <input
              className="form-control search-input"
              type="search"
              placeholder="Rechercher un artisan..."
              aria-label="Rechercher un artisan"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary search-button" type="submit" aria-label="Rechercher un artisan">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <span className="visually-hidden">Rechercher</span>
            </button>
          </form>

          {/* Menu et recherche desktop */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <div className="d-flex align-items-center w-100 flex-column flex-lg-row justify-content-lg-end">
              <ul className="navbar-nav mb-2 mb-lg-0 me-lg-3">
                {isLoading ? (
                  <li className="nav-item">
                    <span className="nav-link">Chargement...</span>
                  </li>
                ) : categories.length > 0 ? (
                  categories.map((categorie) => (
                    <li key={categorie.id} className="nav-item">
                      <Link
                        className="nav-link"
                        to={`/categorie/${categorie.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {categorie.nom}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="nav-item">
                    <span className="nav-link text-muted">Aucune catégorie</span>
                  </li>
                )}
              </ul>

              <form className="d-flex search-form search-form-desktop d-none d-lg-flex" onSubmit={handleSearch} role="search">
                <input
                  className="form-control me-2 search-input"
                  type="search"
                  placeholder="Rechercher un artisan..."
                  aria-label="Rechercher un artisan"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary search-button" type="submit" aria-label="Rechercher un artisan">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                  <span className="visually-hidden">Rechercher</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

