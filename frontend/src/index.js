/**
 * Devoir bilan – Trouve ton artisan
 * Point de montage de l'app React. J'ai enveloppé l'app dans ErrorBoundary pour capturer les erreurs.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

