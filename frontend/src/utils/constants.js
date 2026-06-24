// Configs de présentation — alignées sur la palette GitHub Primer (gh.*)
// Chaque entrée fournit les classes Tailwind du pill (fond + texte) et du dot.

export const PRIORITY_CONFIG = {
  low:      { label: 'Low',      pill: 'bg-gh-success-subtle text-gh-success-fg',     dot: 'bg-gh-success-fg' },
  medium:   { label: 'Medium',   pill: 'bg-gh-attention-subtle text-gh-attention-fg', dot: 'bg-gh-attention-fg' },
  high:     { label: 'High',     pill: 'bg-orange-500/15 text-orange-400',            dot: 'bg-orange-400' },
  critical: { label: 'Critical', pill: 'bg-gh-danger-subtle text-gh-danger-fg',       dot: 'bg-gh-danger-fg' },
};

export const STATUS_CONFIG = {
  'open':        { label: 'Open',        pill: 'bg-gh-accent-subtle text-gh-accent',          dot: 'bg-gh-accent' },
  'in-progress': { label: 'In Progress', pill: 'bg-gh-attention-subtle text-gh-attention-fg', dot: 'bg-gh-attention-fg' },
  'resolved':    { label: 'Resolved',    pill: 'bg-gh-success-subtle text-gh-success-fg',     dot: 'bg-gh-success-fg' },
  'closed':      { label: 'Closed',      pill: 'bg-gh-elevated text-gh-fg-muted',             dot: 'bg-gh-fg-subtle' },
};

export const SEVERITY_OPTIONS = ['minor', 'major', 'critical'];
export const PRIORITY_OPTIONS = ['low', 'medium', 'high', 'critical'];
export const STATUS_OPTIONS   = ['open', 'in-progress', 'resolved', 'closed'];
