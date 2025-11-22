# NoteNest
A full‑stack application for managing **Projects** and **Notes**, built with **React + TypeScript** on the frontend and **Express + MongoDB + Zod** on the backend.

## Features
- **Authentication** middleware (`requireAuth`) ensures only logged‑in users can access their data
- **Projects CRUD**: create, read, update, delete projects
- **Notes CRUD**: create, read, update, delete notes tied to projects
- **Dialogs** (`ProjectDialog`, `NoteDialog`) for clean UI interactions
- **Custom hooks** (`useProjects`, `useNotes`) for stateful data fetching and mutation
- **Zod schemas** for validation, aligned with Mongo models
- **Error handling** with clear messages for frontend display

## Backend Setup
- **Install dependencies**
   ```bash
  cd backend
  npm install
  ```
   
- **Environmental variables (`.env`)**
  ```bash
  MONGO_URI=mongodb://localhost:27017/note-nest
  JWT_SECRET=your-secret-key
  PORT=5000
  ```

  - **Run server**
    ```bash
    npm run dev
    ```

## Frontend Setup
- **Install dependencies**
  ```bash
  cd frontend
  npm install
  ```

- **Run server**
  ```bash
  npm run dev
  ```
