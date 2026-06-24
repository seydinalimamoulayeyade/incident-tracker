import React, { useState } from 'react';
import Badge from '../shared/Badge';
import { PRIORITY_CONFIG, STATUS_CONFIG, STATUS_OPTIONS } from '../../utils/constants';

const inputClass =
  'w-full text-sm rounded-md border border-gh-border bg-gh-canvas text-gh-fg px-3 py-2 outline-none transition-colors placeholder:text-gh-fg-subtle focus:border-gh-accent focus:ring-1 focus:ring-gh-accent';
const labelClass = 'gh-mono-label text-[11px] text-gh-fg-muted';
const sectionTitleClass = 'gh-mono-label text-xs text-gh-fg-muted';

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
    <div
      className="fixed inset-0 z-50 bg-black/60 flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[560px] h-screen overflow-y-auto bg-gh-subtle border-l border-gh-border p-7 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge {...PRIORITY_CONFIG[incident.priority]} />
            <Badge {...STATUS_CONFIG[incident.status]} />
          </div>
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-sm rounded-md border border-gh-border text-gh-fg-muted hover:text-gh-fg hover:bg-gh-elevated transition-colors"
          >
            ✕
          </button>
        </div>

        <h2 className="text-xl font-bold leading-snug text-gh-fg">{incident.title}</h2>

        {incident.description && (
          <p className="text-sm text-gh-fg-muted leading-relaxed">{incident.description}</p>
        )}

        {/* Méta */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-gh-fg-muted py-3 border-y border-gh-border">
          <span>{incident.assignee || 'Non assigné'}</span>
          <span>Créé le {formatDate(incident.createdAt)}</span>
          {duration !== null && <span>Résolu en {duration} min</span>}
        </div>

        {/* Statut */}
        <div className="flex flex-col gap-3">
          <h4 className={sectionTitleClass}>Statut</h4>
          <select
            value={incident.status}
            onChange={(e) => onUpdate(incident._id, { status: e.target.value, updatedBy: 'user' })}
            className={`${inputClass} w-fit`}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-3">
          <h4 className={sectionTitleClass}>Timeline</h4>
          <div className="flex flex-col gap-4 pl-3 border-l-2 border-gh-border">
            {incident.timeline?.map((entry, idx) => (
              <div key={idx} className="relative flex gap-3 items-start">
                <span className="absolute -left-[17px] mt-1.5 w-2 h-2 rounded-full bg-gh-accent" />
                <div>
                  <p className="text-sm text-gh-fg">{entry.action}</p>
                  <p className="text-xs text-gh-fg-muted mt-0.5">
                    {entry.actor} · {formatDate(entry.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Postmortem */}
        <div className="flex flex-col gap-3">
          <h4 className={sectionTitleClass}>Postmortem</h4>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Cause racine</label>
            <textarea
              value={postmortem.rootCause}
              onChange={(e) => setPostmortem((p) => ({ ...p, rootCause: e.target.value }))}
              placeholder="Quelle est la cause principale de cet incident ?"
              rows={3}
              className={`${inputClass} resize-y`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Actions correctives (une par ligne)</label>
            <textarea
              value={postmortem.actions}
              onChange={(e) => setPostmortem((p) => ({ ...p, actions: e.target.value }))}
              placeholder={"Ajouter un healthcheck\nMettre en place une alerte CPU"}
              rows={4}
              className={`${inputClass} resize-y`}
            />
          </div>

          <button
            onClick={handleSavePostmortem}
            disabled={saving}
            className="self-start px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-brand to-brand-cyan hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? 'Enregistrement...' : saved ? '✓ Enregistré' : 'Enregistrer le postmortem'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
