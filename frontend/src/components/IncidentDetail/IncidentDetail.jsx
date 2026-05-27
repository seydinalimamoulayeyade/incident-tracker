import React, { useState } from 'react';
import Badge from '../shared/Badge';
import { PRIORITY_CONFIG, STATUS_CONFIG, STATUS_OPTIONS } from '../../utils/constants';

const IncidentDetail = ({ incident, onUpdate, onClose }) => {
  const [postmortem, setPostmortem] = useState({
    rootCause: incident.postmortem?.rootCause || '',
    actions:   incident.postmortem?.actions?.join('\n') || '',
  });
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  const handleSavePostmortem = async () => {
    setSaving(true);
    await onUpdate(incident._id, {
      postmortem: {
        rootCause:   postmortem.rootCause,
        actions:     postmortem.actions.split('\n').filter(Boolean),
        completedAt: new Date(),
      },
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  const duration = incident.status === 'resolved' && incident.updatedAt
    ? Math.round((new Date(incident.updatedAt) - new Date(incident.createdAt)) / 60000)
    : null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.panel} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Badge {...PRIORITY_CONFIG[incident.priority]} />
            <Badge {...STATUS_CONFIG[incident.status]} />
          </div>
          <button onClick={onClose} style={styles.btnClose}>✕</button>
        </div>

        <h2 style={styles.title}>{incident.title}</h2>

        {incident.description && (
          <p style={styles.description}>{incident.description}</p>
        )}

        {/* Méta */}
        <div style={styles.meta}>
          <span>👤 {incident.assignee || 'Non assigné'}</span>
          <span>🕒 Créé le {formatDate(incident.createdAt)}</span>
          {duration && <span>⏱ Résolu en {duration} min</span>}
        </div>

        {/* Changer le statut */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Statut</h4>
          <select
            value={incident.status}
            onChange={(e) => onUpdate(incident._id, { status: e.target.value, updatedBy: 'user' })}
            style={{ width: 'fit-content' }}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Timeline */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Timeline</h4>
          <div style={styles.timeline}>
            {incident.timeline?.map((entry, idx) => (
              <div key={idx} style={styles.timelineEntry}>
                <div style={styles.timelineDot} />
                <div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{entry.action}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {entry.actor} · {formatDate(entry.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Postmortem */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Postmortem</h4>

          <div style={styles.field}>
            <label style={styles.label}>Cause racine</label>
            <textarea
              value={postmortem.rootCause}
              onChange={(e) => setPostmortem((p) => ({ ...p, rootCause: e.target.value }))}
              placeholder="Quelle est la cause principale de cet incident ?"
              rows={3}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Actions correctives (une par ligne)</label>
            <textarea
              value={postmortem.actions}
              onChange={(e) => setPostmortem((p) => ({ ...p, actions: e.target.value }))}
              placeholder={"Ajouter un healthcheck\nMéttre en place une alerte CPU"}
              rows={4}
              style={{ resize: 'vertical' }}
            />
          </div>

          <button
            onClick={handleSavePostmortem}
            disabled={saving}
            style={styles.btnSave}
          >
            {saving ? 'Enregistrement...' : saved ? '✓ Enregistré' : 'Enregistrer le postmortem'}
          </button>
        </div>

      </div>
    </div>
  );
};

const styles = {
  overlay:       { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' },
  panel:         { background: 'var(--bg-secondary)', width: '100%', maxWidth: '560px', height: '100vh', overflowY: 'auto', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '24px' },
  header:        { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  btnClose:      { background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: '6px', padding: '4px 10px', fontSize: '0.875rem' },
  title:         { fontSize: '1.25rem', fontWeight: '700', lineHeight: '1.4', color: 'var(--text-primary)' },
  description:   { fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' },
  meta:          { display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '12px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' },
  section:       { display: 'flex', flexDirection: 'column', gap: '12px' },
  sectionTitle:  { fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)' },
  timeline:      { display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: '12px', borderLeft: '2px solid var(--border)' },
  timelineEntry: { display: 'flex', gap: '12px', alignItems: 'flex-start', position: 'relative' },
  timelineDot:   { width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', marginTop: '5px', flexShrink: 0, marginLeft: '-17px' },
  field:         { display: 'flex', flexDirection: 'column', gap: '6px' },
  label:         { fontSize: '0.75rem', fontWeight: '500', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' },
  btnSave:       { padding: '9px 20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontWeight: '500', alignSelf: 'flex-start' },
};

export default IncidentDetail;