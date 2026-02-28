import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ArtisansList from './pages/ArtisansList';
import ArtisanDetail from './pages/ArtisanDetail';
import NotFound from './pages/NotFound';
import LegalPage from './pages/LegalPage';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorie/:slug" element={<ArtisansList />} />
            <Route path="/artisan/:id" element={<ArtisanDetail />} />
            <Route path="/mentions-legales" element={<LegalPage title="Mentions légales" />} />
            <Route path="/donnees-personnelles" element={<LegalPage title="Données personnelles" />} />
            <Route path="/accessibilité" element={<LegalPage title="Accessibilité" />} />
            <Route path="/cookies" element={<LegalPage title="Cookies" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

