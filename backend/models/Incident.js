const mongoose = require('mongoose');

const timelineEntrySchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    actor:  { type: String, required: true },
  },
  { timestamps: true }
);

const postmortemSchema = new mongoose.Schema({
  rootCause:   { type: String, default: '' },
  actions:     { type: [String], default: [] },
  completedAt: { type: Date },
});

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, 'Title is required'],
      trim:     true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type:    String,
      trim:    true,
      default: '',
    },
    priority: {
      type:    String,
      enum:    ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    severity: {
      type:    String,
      enum:    ['minor', 'major', 'critical'],
      default: 'major',
    },
    status: {
      type:    String,
      enum:    ['open', 'in-progress', 'resolved', 'closed'],
      default: 'open',
    },
    assignee:   { type: String, trim: true, default: '' },
    timeline:   { type: [timelineEntrySchema], default: [] },
    postmortem: { type: postmortemSchema, default: () => ({}) },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Incident', incidentSchema);