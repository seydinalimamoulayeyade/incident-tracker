import React from 'react';

const Badge = ({ label, color }) => (
  <span style={{
    backgroundColor: `${color}22`,
    color,
    border: `1px solid ${color}55`,
    padding: '2px 10px',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
  }}>
    {label}
  </span>
);

export default Badge;