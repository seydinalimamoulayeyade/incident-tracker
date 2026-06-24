import React from 'react';

/**
 * Pill de statut/priorité façon GitHub Primer.
 * @param {string} label - texte affiché
 * @param {string} pill  - classes Tailwind (fond + texte)
 * @param {string} dot   - classe Tailwind du point coloré
 */
const Badge = ({ label, pill = 'bg-gh-elevated text-gh-fg-muted', dot = 'bg-gh-fg-subtle' }) => (
  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] gh-mono-label whitespace-nowrap ${pill}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
    {label}
  </span>
);

export default Badge;
