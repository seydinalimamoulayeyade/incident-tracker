const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const errorHandler = require('./middleware/error.middleware');
const incidentRoutes = require('./routes/incident.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes API
app.use('/api/incidents', incidentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Servir le frontend React en production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// Route inconnue (dev uniquement)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res) => {
    res.status(404).json({ status: 'fail', message: `Route ${req.originalUrl} not found` });
  });
}

app.use(errorHandler);

module.exports = app;