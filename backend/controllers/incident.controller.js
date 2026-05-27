const Incident  = require('../models/Incident');
const ApiError  = require('../utils/ApiError');
const { notifySlack } = require('../services/slack.service');

// GET /api/incidents
const getAllIncidents = async (req, res, next) => {
  try {
    const { status, priority } = req.query;
    const filter = {};

    if (status)   filter.status   = status;
    if (priority) filter.priority = priority;

    const incidents = await Incident.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ status: 'success', results: incidents.length, data: incidents });
  } catch (err) {
    next(err);
  }
};

// GET /api/incidents/:id
const getIncidentById = async (req, res, next) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) throw new ApiError(404, 'Incident not found');

    res.status(200).json({ status: 'success', data: incident });
  } catch (err) {
    next(err);
  }
};

// POST /api/incidents
const createIncident = async (req, res, next) => {
  try {
    const incident = await Incident.create({
      ...req.body,
      timeline: [{ action: 'Incident created', actor: req.body.assignee || 'system' }],
    });

    if (incident.priority === 'critical') {
      await notifySlack(`🚨 *Critical incident created:* ${incident.title}`);
    }

    res.status(201).json({ status: 'success', data: incident });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/incidents/:id
const updateIncident = async (req, res, next) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) throw new ApiError(404, 'Incident not found');

    // Enregistrer le changement de statut dans la timeline
    if (req.body.status && req.body.status !== incident.status) {
      incident.timeline.push({
        action: `Status changed from "${incident.status}" to "${req.body.status}"`,
        actor:  req.body.updatedBy || 'system',
      });
    }

    Object.assign(incident, req.body);
    await incident.save();

    // Notifier Slack si résolu
    if (req.body.status === 'resolved') {
      await notifySlack(`✅ *Incident resolved:* ${incident.title}`);
    }

    res.status(200).json({ status: 'success', data: incident });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/incidents/:id
const deleteIncident = async (req, res, next) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) throw new ApiError(404, 'Incident not found');

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllIncidents,
  getIncidentById,
  createIncident,
  updateIncident,
  deleteIncident,
};