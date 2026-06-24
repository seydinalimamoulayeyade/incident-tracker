import React, { useState } from 'react';
import Badge from '../shared/Badge';
import { PRIORITY_CONFIG, STATUS_CONFIG, STATUS_OPTIONS } from '../../utils/constants';

const IncidentCard = ({ incident, onUpdate, onDelete, onClick }) => {
  const [updating, setUpdating] = useState(false);

  const status = STATUS_CONFIG[incident.status] || {};

  const handleStatusChange = async (e) => {
    e.stopPropagation();
    setUpdating(true);
    await onUpdate(incident._id, { status: e.target.value, updatedBy: 'user' });
    setUpdating(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Supprimer l'incident "${incident.title}" ?`)) {
      onDelete(incident._id);
    }
  };

  const createdAt = new Date(incident.createdAt).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <article className="relative">
      {/* Point sur la timeline */}
      <span
        className={`absolute -left-[25px] sm:-left-[33px] top-1.5 w-3 h-3 rounded-full ring-4 ring-gh-canvas ${status.dot || 'bg-gh-fg-subtle'}`}
        aria-hidden="true"
      />

      {/* Ligne méta : date + badges */}
      <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="gh-mono-label text-xs text-gh-fg-muted">{createdAt}</span>
          <Badge {...PRIORITY_CONFIG[incident.priority]} />
          <Badge {...STATUS_CONFIG[incident.status]} />
        </div>
      </div>

      {/* Titre */}
      <button
        onClick={() => onClick(incident)}
        className="block text-left text-xl font-semibold text-gh-fg hover:text-gh-accent transition-colors mb-2"
      >
        {incident.title}
      </button>

      {incident.description && (
        <p className="text-sm text-gh-fg-muted mb-3 line-clamp-2">{incident.description}</p>
      )}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-sm text-gh-fg-muted">
          {incident.assignee ? `Assigné à ${incident.assignee}` : 'Non assigné'}
        </span>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <select
            value={incident.status}
            onChange={handleStatusChange}
            disabled={updating}
            className="text-xs gh-mono-label rounded-md border border-gh-border bg-gh-subtle text-gh-fg px-2 py-1.5 outline-none focus:border-gh-accent disabled:opacity-50 cursor-pointer"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <button
            onClick={handleDelete}
            title="Supprimer"
            className="px-2 py-1.5 text-xs rounded-md border border-gh-border text-gh-fg-muted hover:text-gh-danger-fg hover:border-gh-danger-fg/50 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </article>
  );
};

export default IncidentCard;
