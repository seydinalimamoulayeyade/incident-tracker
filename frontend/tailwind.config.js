/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs de marque (identité partagée du portfolio)
        brand: '#3b82f6',
        'brand-cyan': '#22d3ee',
        // Statuts sémantiques (incidents)
        success: '#3fb950',
        failed: '#f85149',
        running: '#d29922',
        // Palette GitHub Primer — thème SOMBRE (façon Changelog)
        gh: {
          canvas: '#0d1117',        // fond principal
          subtle: '#161b22',        // surfaces élevées
          inset: '#010409',         // zones encastrées
          elevated: '#21262d',      // hover / pills
          border: '#30363d',
          muted: '#21262d',
          fg: '#e6edf3',            // texte principal
          'fg-muted': '#8b949e',    // texte secondaire
          'fg-subtle': '#6e7681',
          accent: '#2f81f7',
          'accent-subtle': 'rgba(56,139,253,0.15)',
          header: '#010409',
          'success-fg': '#3fb950',
          'success-emphasis': '#238636',
          'success-subtle': 'rgba(63,185,80,0.15)',
          'danger-fg': '#f85149',
          'danger-subtle': 'rgba(248,81,73,0.15)',
          'attention-fg': '#d29922',
          'attention-subtle': 'rgba(210,153,34,0.15)',
          'done-fg': '#a371f7',
          'done-subtle': 'rgba(163,113,247,0.15)',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Noto Sans', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      maxWidth: {
        changelog: '1280px',
      },
    },
  },
  plugins: [],
}
