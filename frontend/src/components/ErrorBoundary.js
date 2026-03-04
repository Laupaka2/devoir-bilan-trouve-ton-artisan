/**
 * Devoir bilan – Trouve ton artisan
 * Périmètre d'erreur React : en cas d'exception dans l'arbre, j'affiche un message et un bouton "Recharger".
 */
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erreur React:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '2rem auto' }}>
          <h1 style={{ color: '#c00' }}>Une erreur s'est produite</h1>
          <p>{this.state.error?.message || 'Erreur inconnue'}</p>
          <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto', fontSize: '12px' }}>
            {this.state.error?.stack}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            Recharger la page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
