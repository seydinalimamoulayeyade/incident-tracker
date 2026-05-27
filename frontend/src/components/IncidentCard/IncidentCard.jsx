import React, { useState } from 'react';
import Badge from '../shared/Badge';
import { PRIORITY_CONFIG, STATUS_CONFIG, STATUS_OPTIONS } from '../../utils/constants';

const IncidentCard = ({ incident, onUpdate, onDelete, onClick }) => {
  const [updating, setUpdating] = useState(false);

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
    <div onClick={() => onClick(incident)} style={styles.card}>
      <div style={styles.header}>
        <div style={styles.badges}>
          <Badge {...PRIORITY_CONFIG[incident.priority]} />
          <Badge {...STATUS_CONFIG[incident.status]} />
        </div>
        <span style={styles.date}>{createdAt}</span>
      </div>

      <h3 style={styles.title}>{incident.title}</h3>

      {incident.description && (
        <p style={styles.description}>{incident.description}</p>
      )}

      <div style={styles.footer}>
        <span style={styles.assignee}>
          {incident.assignee ? `👤 ${incident.assignee}` : '👤 Non assigné'}
        </span>

        <div style={styles.actions} onClick={(e) => e.stopPropagation()}>
          <select
            value={incident.status}
            onChange={handleStatusChange}
            disabled={updating}
            style={styles.select}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <button onClick={handleDelete} style={styles.btnDelete} title="Supprimer">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card:        { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px', cursor: 'pointer', transition: 'border-color 0.2s', display: 'flex', flexDirection: 'column', gap: '12px' },
  header:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' },
  badges:      { display: 'flex', gap: '8px' },
  date:        { fontSize: '0.75rem', color: 'var(--text-secondary)' },
  title:       { fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', lineHeight: '1.4' },
  description: { fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  footer:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '4px' },
  assignee:    { fontSize: '0.8rem', color: 'var(--text-secondary)' },
  actions:     { display: 'flex', gap: '8px', alignItems: 'center' },
  select:      { fontSize: '0.8rem', padding: '4px 8px', background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer' },
  btnDelete:   { background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: '4px', padding: '4px 8px', fontSize: '0.75rem' },
};

export default IncidentCard;