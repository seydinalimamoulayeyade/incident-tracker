import React, { useState } from 'react';
import useIncidents from './hooks/useIncidents';
import IncidentList from './components/IncidentList/IncidentList';
import IncidentForm from './components/IncidentForm/IncidentForm';
import IncidentDetail from './components/IncidentDetail/IncidentDetail';
import Loader from './components/shared/Loader';

const App = () => {
  const { incidents, loading, error, createIncident, updateIncident, deleteIncident } = useIncidents();
  const [showForm,    setShowForm]    = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [selected,    setSelected]    = useState(null);

  const handleCreate = async (payload) => {
    setFormLoading(true);
    await createIncident(payload);
    setFormLoading(false);
    setShowForm(false);
  };

  // Synchronise le panneau avec les mises à jour en temps réel
  const handleUpdate = async (id, payload) => {
    const updated = await updateIncident(id, payload);
    if (selected?._id === id) setSelected(updated);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>🚨 Incident Tracker</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '4px' }}>
            Gestion et suivi des incidents de production
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          style={{ padding: '10px 20px', background: showForm ? 'transparent' : 'var(--accent)', color: showForm ? 'var(--text-secondary)' : '#fff', border: showForm ? '1px solid var(--border)' : 'none', borderRadius: 'var(--radius)', fontWeight: '500' }}
        >
          {showForm ? 'Annuler' : '+ Nouvel incident'}
        </button>
      </header>

      {showForm && (
        <IncidentForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
          loading={formLoading}
        />
      )}

      {loading  && <Loader />}
      {error    && <p style={{ color: 'var(--danger)', textAlign: 'center', padding: '40px' }}>{error}</p>}
      {!loading && !error && (
        <IncidentList
          incidents={incidents}
          onUpdate={handleUpdate}
          onDelete={deleteIncident}
          onSelect={setSelected}
        />
      )}

      {selected && (
        <IncidentDetail
          incident={selected}
          onUpdate={handleUpdate}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default App;