export const PRIORITY_CONFIG = {
  low:      { label: 'Low',      color: '#22c55e' },
  medium:   { label: 'Medium',   color: '#f59e0b' },
  high:     { label: 'High',     color: '#f97316' },
  critical: { label: 'Critical', color: '#ef4444' },
};

export const STATUS_CONFIG = {
  'open':        { label: 'Open',        color: '#f97316' },
  'in-progress': { label: 'In Progress', color: '#f59e0b' },
  'resolved':    { label: 'Resolved',    color: '#22c55e' },
  'closed':      { label: 'Closed',      color: '#6b7280' },
};

export const SEVERITY_OPTIONS = ['minor', 'major', 'critical'];
export const PRIORITY_OPTIONS = ['low', 'medium', 'high', 'critical'];
export const STATUS_OPTIONS   = ['open', 'in-progress', 'resolved', 'closed'];