import React from 'react';

/**
 * Logo de marque Incident Tracker — bouclier/alerte avec dégradé.
 * Partage la signature visuelle (bleu → cyan) du portfolio DevOps.
 * @param {number} size - taille en pixels
 * @param {boolean} withText - affiche le nom à côté du symbole
 */
const Logo = ({ size = 32, withText = true }) => {
  const gid = 'it-logo-grad';
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="#0d1117" />
        <rect x="1.5" y="1.5" width="61" height="61" rx="12.5" stroke={`url(#${gid})`} strokeOpacity="0.5" strokeWidth="3" />
        {/* Bouclier */}
        <path
          d="M32 12l16 6v12c0 9.5-6.4 16.8-16 20-9.6-3.2-16-10.5-16-20V18l16-6z"
          fill={`url(#${gid})`}
        />
        {/* Point d'exclamation (incident) */}
        <rect x="29.8" y="22" width="4.4" height="14" rx="2.2" fill="#0d1117" />
        <circle cx="32" cy="42" r="2.6" fill="#0d1117" />
      </svg>
      {withText && (
        <span className="font-semibold text-gh-fg tracking-tight">
          Incident<span className="text-brand-cyan">Tracker</span>
        </span>
      )}
    </span>
  );
};

export default Logo;
