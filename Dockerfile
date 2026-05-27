# ── Étape 1 : Build du frontend ──────────────────────────
FROM node:22-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# ── Étape 2 : Image de production ────────────────────────
FROM node:22-alpine

# Mise à jour des packages système pour corriger les CVE Alpine
RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Dépendances backend uniquement
COPY backend/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Code backend
COPY backend/ .

# Build frontend
COPY --from=frontend-builder /app/frontend/build ./public

# Sécurité : ne pas tourner en root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "server.js"]