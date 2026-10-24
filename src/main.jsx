import React, { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '4rem auto', backgroundColor: '#FFF5F5', border: '1px solid #FEB2B2', borderRadius: '12px', fontFamily: 'sans-serif', color: '#9B2C2C' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Terjadi Kesalahan Tampilan</h2>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#742A2A' }}>
            {this.state.error?.message || 'Error tidak diketahui'}
          </p>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#9B2C2C', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Reset Data & Muat Ulang
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Global error listener to prevent blank white screens
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('Window error detected:', event);
    const root = document.getElementById('root');
    if (root && root.children.length === 0) {
      root.innerHTML = `
        <div style="padding: 2.5rem; max-width: 580px; margin: 4rem auto; background-color: #FFF5F5; border: 1px solid #FEB2B2; border-radius: 12px; font-family: sans-serif; color: #9B2C2C; box-shadow: 0 8px 24px rgba(0,0,0,0.06);">
          <h2 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">Memuat Ulang Aplikasi</h2>
          <p style="font-size: 0.9rem; margin-bottom: 1.25rem; color: #742A2A; line-height: 1.5;">
            ${event.message || 'Terjadi kesalahan saat memuat komponen.'}
          </p>
          <button onclick="localStorage.clear(); window.location.reload();" style="padding: 0.65rem 1.25rem; background-color: #9B2C2C; color: #FFF; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
            Reset Cache & Muat Ulang
          </button>
        </div>
      `;
    }
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
