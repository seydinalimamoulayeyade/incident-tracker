import React from 'react';

const Badge = ({ label, color }) => (
  <span style={{
    backgroundColor: `${color}18`,
    color,
    border: `1px solid ${color}35`,
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '0.7rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontFamily: 'var(--font-mono)',
    whiteSpace: 'nowrap',
  }}>
    {label}
  </span>
);

export default Badge;