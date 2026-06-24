import React from 'react';

const Loader = ({ message = 'Chargement...' }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-16 text-gh-fg-muted">
    <span
      className="w-9 h-9 rounded-full border-[3px] border-gh-border border-t-brand"
      style={{ animation: 'spin 0.8s linear infinite' }}
    />
    <p className="text-sm">{message}</p>
  </div>
);

export default Loader;
