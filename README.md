# MERN Task Manager

Simple full-stack MERN task manager for demonstrating frontend and backend deployment.

## Folder Structure

```text
TO-DO-Deployment/
|-- client/
|-- server/
|-- .gitignore
|-- README.md
```

## Frontend

- React + Vite
- Uses `VITE_API_URL`
- Vercel-ready with `vercel.json`

## Backend

- Express + Mongoose
- Uses `PORT`, `DATABASE_URL`, `CLIENT_URL`, and `NODE_ENV`
- Includes `/api/health`

## Run Locally

### Server

```bash
cd server
npm install
npm run dev
```

### Client

```bash
cd client
npm install
npm run dev
```
