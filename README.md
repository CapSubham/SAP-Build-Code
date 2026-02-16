
# Full-Stack Node.js CRUD (SAP Build Code friendly)

A minimal full‑stack app using **Express (Node.js)** + **SQLite** backend and **React (Vite)** frontend. It implements CRUD for a simple `Task` entity.

Works great locally, in VS Code, and in **SAP Business Application Studio** (Dev Space: Node.js / Full-Stack). You can also deploy the server to SAP BTP (Cloud Foundry) and serve the built React app from the same process.

---

## 📦 Project structure

```text
node-crud-fullstack-sap-build/
├─ server/                # Express + SQLite API
│  ├─ src/
│  │  ├─ index.js         # App entry, mounts /api/tasks
│  │  └─ routes/tasks.js  # CRUD routes
│  ├─ src/db.js           # SQLite init
│  ├─ package.json
│  └─ .env                # PORT=4000
└─ client/                # React + Vite UI
   ├─ src/
   │  ├─ components/
   │  │  ├─ TaskForm.jsx
   │  │  └─ TaskList.jsx
   │  ├─ App.jsx
   │  ├─ api.js
   │  └─ main.jsx
   ├─ index.html
   ├─ vite.config.js
   └─ package.json
```

## 🏃‍♂️ Run locally (two terminals)

**Terminal A – API**

```bash
cd server
npm install
npm run dev   # starts http://localhost:4000
```

**Terminal B – Frontend**

```bash
cd client
npm install
npm run dev   # opens http://localhost:5173, proxy to /api
```

## 🧪 Test API quickly

After starting the server, try:

```bash
curl -X POST http://localhost:4000/api/tasks        -H 'Content-Type: application/json'        -d '{"title":"First task","description":"Hello"}'

curl http://localhost:4000/api/tasks
```

## 🏗️ Build for production

```bash
# Build static frontend
cd client && npm install && npm run build

# Start server in production mode (serves client/dist)
cd ../server
NODE_ENV=production npm start
# Open http://localhost:4000
```

## 🧰 Use in SAP Business Application Studio

1. Create a **Node.js** dev space.
2. Upload or clone this project.
3. Open two terminals and follow the local run steps above.
4. Optional: configure a **Cloud Foundry** target and push the server with a `manifest.yml` (bind to a SQLite-compatible persistent storage or migrate to **SAP HANA Cloud** / PostgreSQL). Frontend build can be served by the same Express app.

## 🔌 API surface

- `GET    /api/tasks` – list tasks
- `GET    /api/tasks/:id` – fetch one
- `POST   /api/tasks` – create `{ title, description?, status? }`
- `PUT    /api/tasks/:id` – update any of `{ title, description, status }`
- `DELETE /api/tasks/:id` – remove

## 📄 License

MIT — use freely.
