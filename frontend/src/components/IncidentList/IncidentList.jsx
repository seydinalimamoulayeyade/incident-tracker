import React from 'react';
import IncidentCard from '../IncidentCard/IncidentCard';

const StatCard = ({ label, value, accent }) => (
  <div className="flex-1 min-w-[140px] rounded-md border border-gh-border bg-gh-subtle px-5 py-4">
    <p className={`text-3xl font-bold ${accent}`}>{value}</p>
    <p className="gh-mono-label text-[11px] text-gh-fg-muted mt-1">{label}</p>
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
      <div className="flex flex-wrap gap-4 mb-10">
        <StatCard label="Total"     value={stats.total}    accent="text-gh-fg" />
        <StatCard label="Ouverts"   value={stats.open}     accent="text-gh-accent" />
        <StatCard label="Critiques" value={stats.critical} accent="text-gh-danger-fg" />
        <StatCard label="Résolus"   value={stats.resolved} accent="text-gh-success-fg" />
      </div>

      {/* Liste / Timeline */}
      {incidents.length === 0 ? (
        <div className="text-center py-20 text-gh-fg-muted">
          <p className="text-2xl mb-2">✓</p>
          <p className="text-sm">Aucun incident pour le moment.</p>
        </div>
      ) : (
        <div className="relative border-l border-gh-border pl-6 sm:pl-8 ml-3 space-y-10">
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
