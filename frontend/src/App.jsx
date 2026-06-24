import React, { useState } from "react";
import useIncidents from "./hooks/useIncidents";
import IncidentList from "./components/IncidentList/IncidentList";
import IncidentForm from "./components/IncidentForm/IncidentForm";
import IncidentDetail from "./components/IncidentDetail/IncidentDetail";
import Loader from "./components/shared/Loader";
import Logo from "./components/shared/Logo";

const App = () => {
  const {
    incidents,
    loading,
    error,
    createIncident,
    updateIncident,
    deleteIncident,
  } = useIncidents();
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [selected, setSelected] = useState(null);

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
    <div className="min-h-screen bg-gh-canvas text-gh-fg flex flex-col">
      {/* Barre de navigation */}
      <header className="bg-gh-header border-b border-gh-border">
        <div className="max-w-changelog mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-6">
            <Logo size={30} />
            <div className="ml-auto flex items-center gap-3">
              <button
                onClick={() => setShowForm((v) => !v)}
                className={
                  showForm
                    ? "px-3 py-1.5 text-sm font-medium rounded-md border border-gh-border text-gh-fg-muted hover:text-gh-fg hover:bg-gh-elevated transition-colors"
                    : "px-3 py-1.5 text-sm font-medium rounded-md text-white bg-gradient-to-r from-brand to-brand-cyan hover:opacity-90 transition-opacity"
                }
              >
                {showForm ? "Annuler" : "+ Nouvel incident"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* En-tête héro avec grille */}
      <div className="gh-grid border-b border-gh-border">
        <div className="max-w-changelog mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <p className="gh-mono-label text-xs text-gh-fg-muted mb-6">
            Gestion des incidents de production
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="text-gh-fg">Incident</span>
              <span className="bg-gradient-to-r from-brand to-brand-cyan bg-clip-text text-transparent">
                {" "}Tracker
              </span>
            </h1>
            <p className="gh-mono-label text-xs text-gh-fg-subtle">
              MERN · Docker · Slack
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="flex-1 max-w-changelog mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {showForm && (
          <IncidentForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
            loading={formLoading}
          />
        )}

        {loading && <Loader />}
        {error && (
          <div className="my-6 p-4 rounded-md border border-gh-danger-fg/40 bg-gh-danger-subtle text-gh-danger-fg text-sm text-center">
            {error}
          </div>
        )}
        {!loading && !error && (
          <IncidentList
            incidents={incidents}
            onUpdate={handleUpdate}
            onDelete={deleteIncident}
            onSelect={setSelected}
          />
        )}
      </main>

      {/* Pied de page */}
      <footer className="border-t border-gh-border mt-auto">
        <div className="max-w-changelog mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-3">
          <Logo size={20} withText={false} />
          <p className="gh-mono-label text-xs text-gh-fg-muted">
            Incident Tracker — Suivi des incidents en temps réel
          </p>
        </div>
      </footer>

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
