import React from 'react';

const Loader = ({ message = 'Chargement...' }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    gap: '16px',
    color: 'var(--text-secondary)',
  }}>
    <div style={{
      width: '36px',
      height: '36px',
      border: '3px solid var(--border)',
      borderTop: '3px solid var(--accent)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    <p style={{ fontSize: '0.9rem' }}>{message}</p>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default Loader;