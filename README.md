# 🚨 Incident Tracker

Application de gestion des incidents de production — construite avec la stack MERN, conteneurisée avec Docker.

![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=flat-square&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)

---

## Aperçu

Incident Tracker permet aux équipes DevOps/SRE de créer, suivre et clôturer des incidents de production avec timeline automatique et postmortem structuré.

**Fonctionnalités :**
- Création d'incidents avec priorité et sévérité
- Suivi des statuts : Open → In Progress → Resolved → Closed
- Timeline automatique à chaque changement de statut
- Postmortem : cause racine + actions correctives
- Dashboard avec statistiques en temps réel
- Notifications Slack sur les incidents critiques

---

## Stack Technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React 18, hooks custom, service layer |
| Backend | Node.js, Express 4, architecture MVC |
| Base de données | MongoDB 7.0, Mongoose |
| Containerisation | Docker multi-stage, Docker Compose |
| Notifications | Slack Webhooks |

---

## Lancer le projet

### Prérequis
- Docker & Docker Compose installés

### Démarrage

```bash
# Cloner le repo
git clone https://github.com/seydinalimamoulayeyade/incident-tracker.git
cd incident-tracker

# Configurer les variables d'environnement
cp .env.example .env

# Lancer l'application
docker-compose up --build
```

L'application est accessible sur **http://localhost:5000**

### Variables d'environnement

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://mongo:27017/incident-tracker
SLACK_WEBHOOK_URL=         # Optionnel
```

---

## Architecture

```
┌─────────────────────────────────────────┐
│            docker-compose               │
│                                         │
│  ┌──────────┐    ┌──────────────────┐  │
│  │  React   │───▶│  Node.js/Express │  │
│  │ (static) │    │  :5000           │  │
│  └──────────┘    └────────┬─────────┘  │
│                           │             │
│                  ┌────────▼──────────┐  │
│                  │   MongoDB 7.0     │  │
│                  └───────────────────┘  │
└─────────────────────────────────────────┘
```

---

## Structure du projet

```
incident-tracker/
├── backend/
│   ├── config/         # Connexion MongoDB
│   ├── controllers/    # Logique métier
│   ├── middleware/     # Error handler global
│   ├── models/         # Schéma Mongoose
│   ├── routes/         # Endpoints API
│   ├── services/       # Slack notifications
│   ├── utils/          # ApiError custom
│   ├── app.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/ # IncidentForm, Card, List, Detail
│   │   ├── hooks/      # useIncidents
│   │   ├── services/   # incident.service.js
│   │   ├── styles/     # Design system Dark + Orange
│   │   └── utils/      # Constants
│   └── package.json
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

---

## API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/incidents` | Liste tous les incidents |
| GET | `/api/incidents?status=open` | Filtrer par statut |
| GET | `/api/incidents/:id` | Détail d'un incident |
| POST | `/api/incidents` | Créer un incident |
| PATCH | `/api/incidents/:id` | Modifier un incident |
| DELETE | `/api/incidents/:id` | Supprimer un incident |
| GET | `/health` | Health check |

---

## Docker Hub

```bash
docker pull lims4/incident-tracker:latest
```

---

*Projet 1/5 du portfolio DevOps*