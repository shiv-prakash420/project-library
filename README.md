**Project Setup**

- **Repository:** `project-library` (contains `library-backend` and `library-frontend`).

**Prerequisites**
- Node.js (recommended 18.x or 20.x)
- npm 9+ (or use the bundled `npx` for CLI tools)
- PostgreSQL (or Docker) for the backend datastore
- Git

Overview
- Backend: `library-backend` (NestJS + Prisma)
- Frontend: `library-frontend` (React)

Quick start (recommended order)

1) Backend — install, configure database, run migrations

  - Copy the example env and set your database connection (PowerShell):

    ```powershell
    cd library-backend
    copy .env.example .env 2>$null || Out-Null
    # Edit `.env` and set DATABASE_URL accordingly
    ```

  - Example `DATABASE_URL` (Postgres):

    ```text
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME?schema=public"
    ```

  - JWT secret

    - The backend uses JWT for authentication (see `src/auth`). Set a strong secret in `library-backend/.env` named `JWT_SECRET`.
    - Example (add to `.env` after copying `.env.example`):

      ```text
      JWT_SECRET="very_long_random_secret_here"
      ```

    - Best practices:
      - Use a long (>=32 characters), random string (e.g., from `openssl rand -base64 32`).
      - Do NOT commit the real secret to the repo — keep `.env` in `.gitignore` and only commit `.env.example`.
      - In production, store secrets in a secrets manager (AWS Secrets Manager, Azure Key Vault, GitHub Secrets, etc.) and inject them into the runtime environment.

  - Install dependencies and use the local Prisma CLI 
  (prisma version 5.22)(avoid global-version mismatch):

    ```powershell
    npm install
    npx prisma -v
    npx prisma generate
    ```

  - Apply existing SQL migrations (recommended for production-like state):

    ```powershell
    npx prisma migrate deploy
    ```

    For development (you can also use):

    ```powershell
    npx prisma migrate dev --name init
    # or
    npx prisma db push
    ```

  - Start the backend (dev):

    ```powershell
    npm run start:dev
    ```

  Notes about Prisma version and common issues
  - This project uses Prisma `^5.22.0` (see `library-backend/package.json`). Use the local `npx prisma` so you run the same binary as the project.
  - If you see errors such as `Prisma schema parse error` or `Prisma client version mismatch`, run:

    ```powershell
    # from library-backend
    npm install
    npx prisma generate
    ```

  - If database connection fails:
    - Confirm `DATABASE_URL` is correct and the DB accepts connections from your machine.
    - If using Docker, expose port `5432` and map it to the host.
    - Check TLS / SSL requirements; add query params (e.g. `?sslmode=require`) if your DB needs it.

2) Frontend — install and run

  - Configure API base URL (defaults to `http://localhost:3000` in `library-frontend/src/api/axios.ts`). If backend runs elsewhere, update the `baseURL`.

  - Install and run:

    ```powershell
    cd library-frontend
    npm install
    npm start
    ```

3) Run both together

  - Start backend (on port 3000) and then frontend. The React app will call the backend at `http://localhost:3000` by default.



Useful commands (PowerShell)

```powershell
# Backend
cd library-backend
npm install
npx prisma generate
npx prisma migrate deploy    # apply existing migrations
npm run start:dev

# Frontend (new window)
cd library-frontend
npm install
npm start
```

