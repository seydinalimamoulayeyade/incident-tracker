import { useState, useEffect, useCallback } from 'react';
import incidentService from '../services/incident.service';

const useIncidents = (filters = {}) => {
  const [incidents, setIncidents] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  const fetchIncidents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await incidentService.getAll(filters);
      setIncidents(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch incidents');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  const createIncident = async (payload) => {
    const newIncident = await incidentService.create(payload);
    setIncidents((prev) => [newIncident, ...prev]);
    return newIncident;
  };

  const updateIncident = async (id, payload) => {
    const updated = await incidentService.update(id, payload);
    setIncidents((prev) => prev.map((i) => (i._id === id ? updated : i)));
    return updated;
  };

  const deleteIncident = async (id) => {
    await incidentService.remove(id);
    setIncidents((prev) => prev.filter((i) => i._id !== id));
  };

  return {
    incidents,
    loading,
    error,
    refetch: fetchIncidents,
    createIncident,
    updateIncident,
    deleteIncident,
  };
};

export default useIncidents;