import React from 'react';
import IncidentCard from '../IncidentCard/IncidentCard';
import { PRIORITY_CONFIG, STATUS_CONFIG } from '../../utils/constants';

const StatCard = ({ label, value, color }) => (
  <div style={{
    background: 'var(--bg-secondary)',
    border: `1px solid ${color}44`,
    borderRadius: 'var(--radius)',
    padding: '16px 24px',
    textAlign: 'center',
    minWidth: '120px',
  }}>
    <p style={{ fontSize: '2rem', fontWeight: '700', color }}>{value}</p>
    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
  </div>
);

const IncidentList = ({ incidents, onUpdate, onDelete, onSelect }) => {
  const stats = {
    total:    incidents.length,
    open:     incidents.filter((i) => i.status === 'open').length,
    critical: incidents.filter((i) => i.priority === 'critical').length,
    resolved: incidents.filter((i) => i.status === 'resolved').length,
  };

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <StatCard label="Total"    value={stats.total}    color="var(--text-secondary)" />
        <StatCard label="Ouverts"  value={stats.open}     color={STATUS_CONFIG['open'].color} />
        <StatCard label="Critiques" value={stats.critical} color={PRIORITY_CONFIG['critical'].color} />
        <StatCard label="Résolus"  value={stats.resolved}  color={STATUS_CONFIG['resolved'].color} />
      </div>

      {/* Liste */}
      {incidents.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '8px' }}>✅</p>
          <p>Aucun incident pour le moment.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
          {incidents.map((incident) => (
            <IncidentCard
              key={incident._id}
              incident={incident}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onClick={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IncidentList;