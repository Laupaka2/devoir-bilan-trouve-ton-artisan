import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Gestion des erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erreur de réponse du serveur
      console.error('Erreur API:', error.response.data);
    } else if (error.request) {
      // Requête envoyée mais pas de réponse
      console.error('Pas de réponse du serveur');
    } else {
      // Erreur lors de la configuration de la requête
      console.error('Erreur de configuration:', error.message);
    }
    return Promise.reject(error);
  }
);

// API pour les catégories
export const getCategories = () => api.get('/categories');
export const getCategoryBySlug = (slug) => api.get(`/categories/${slug}`);

// API pour les spécialités
export const getSpecialites = () => api.get('/specialites');
export const getSpecialitesByCategorie = (categorieId) => api.get(`/specialites/categorie/${categorieId}`);

// API pour les artisans
export const getArtisans = (params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.search) queryParams.append('search', params.search);
  if (params.specialite_id) queryParams.append('specialite_id', params.specialite_id);
  if (params.categorie_id) queryParams.append('categorie_id', params.categorie_id);
  if (params.artisan_du_mois) queryParams.append('artisan_du_mois', params.artisan_du_mois);
  
  const queryString = queryParams.toString();
  return api.get(`/artisans${queryString ? `?${queryString}` : ''}`);
};

export const getArtisanById = (id) => api.get(`/artisans/${id}`);
export const getArtisansDuMois = () => api.get('/artisans/du-mois');

// API pour les contacts
export const createContact = (data) => api.post('/contacts', data);

export default api;

