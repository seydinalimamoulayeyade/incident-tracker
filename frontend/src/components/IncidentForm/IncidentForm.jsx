import React, { useState } from 'react';
import { PRIORITY_OPTIONS, SEVERITY_OPTIONS } from '../../utils/constants';

const initialState = {
  title:       '',
  description: '',
  priority:    'medium',
  severity:    'major',
  assignee:    '',
};

const inputClass =
  'w-full text-sm rounded-md border border-gh-border bg-gh-canvas text-gh-fg px-3 py-2 outline-none transition-colors placeholder:text-gh-fg-subtle focus:border-gh-accent focus:ring-1 focus:ring-gh-accent';
const labelClass = 'gh-mono-label text-[11px] text-gh-fg-muted';

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
    <form
      onSubmit={handleSubmit}
      className="mb-10 rounded-md border border-gh-border bg-gh-subtle p-6 flex flex-col gap-5"
    >
      <h2 className="text-lg font-semibold text-gh-fg">Nouvel incident</h2>

      {error && (
        <p className="text-sm text-gh-danger-fg bg-gh-danger-subtle rounded-md px-3 py-2">{error}</p>
      )}

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Titre *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ex: API Gateway indisponible"
          maxLength={100}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Décrivez l'incident..."
          rows={3}
          className={`${inputClass} resize-y`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Priorité</label>
          <select name="priority" value={form.priority} onChange={handleChange} className={inputClass}>
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Sévérité</label>
          <select name="severity" value={form.severity} onChange={handleChange} className={inputClass}>
            {SEVERITY_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Assigné à</label>
        <input
          name="assignee"
          value={form.assignee}
          onChange={handleChange}
          placeholder="Nom ou identifiant"
          className={inputClass}
        />
      </div>

      <div className="flex justify-end gap-3 mt-1">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium rounded-md border border-gh-border text-gh-fg-muted hover:text-gh-fg hover:bg-gh-elevated transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-brand to-brand-cyan hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Création...' : "Créer l'incident"}
        </button>
      </div>
    </form>
  );
};

export default IncidentForm;
