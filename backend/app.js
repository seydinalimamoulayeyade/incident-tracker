const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error.middleware');
const incidentRoutes = require('./routes/incident.routes');

const app = express();

// Middleware globaux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/incidents', incidentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Route inconnue
app.use((req, res) => {
  res.status(404).json({ status: 'fail', message: `Route ${req.originalUrl} not found` });
});

// Gestionnaire d'erreurs global
app.use(errorHandler);

module.exports = app;