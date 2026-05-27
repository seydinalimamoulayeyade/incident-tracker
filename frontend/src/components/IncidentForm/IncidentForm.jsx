import React, { useState } from 'react';
import { PRIORITY_OPTIONS, SEVERITY_OPTIONS } from '../../utils/constants';

const initialState = {
  title:       '',
  description: '',
  priority:    'medium',
  severity:    'major',
  assignee:    '',
};

const IncidentForm = ({ onSubmit, onCancel, loading }) => {
  const [form, setForm]   = useState(initialState);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Le titre est obligatoire.');
      return;
    }
    setError('');
    await onSubmit(form);
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Nouvel incident</h2>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.field}>
        <label style={styles.label}>Titre *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ex: API Gateway indisponible"
          maxLength={100}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Décrivez l'incident..."
          rows={3}
          style={{ resize: 'vertical' }}
        />
      </div>

      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Priorité</label>
          <select name="priority" value={form.priority} onChange={handleChange}>
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Sévérité</label>
          <select name="severity" value={form.severity} onChange={handleChange}>
            {SEVERITY_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Assigné à</label>
        <input
          name="assignee"
          value={form.assignee}
          onChange={handleChange}
          placeholder="Nom ou identifiant"
        />
      </div>

      <div style={styles.actions}>
        <button type="button" onClick={onCancel} style={styles.btnSecondary}>
          Annuler
        </button>
        <button type="submit" disabled={loading} style={styles.btnPrimary}>
          {loading ? 'Création...' : 'Créer l\'incident'}
        </button>
      </div>
    </form>
  );
};

const styles = {
  form:         { background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px', marginBottom: '32px' },
  title:        { fontSize: '1.1rem', fontWeight: '600', marginBottom: '20px', color: 'var(--text-primary)' },
  field:        { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 },
  label:        { fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' },
  row:          { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  actions:      { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' },
  btnPrimary:   { padding: '9px 20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontWeight: '500' },
  btnSecondary: { padding: '9px 20px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontWeight: '500' },
  error:        { color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '12px' },
};

export default IncidentForm;