# SEE LIVE WEBSITE HERE - https://minievent-frontend.vercel.app

# Mini Event Management System

A production-ready full-stack application built with Express.js, Next.js, and MySQL. Provides clean REST APIs for managing events, robust concurrent booking using database transactions, and a minimal, responsive white-themed UI.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS, Axios.
- **Backend**: Node.js, Express.js, `mysql2`, `express-validator`, `swagger-ui-express`.
- **Database**: MySQL.

## 📂 Project Structure

- `/backend/` - The Express API server holding the controllers, models, and routes.
- `/frontend/` - The Next.js client application styled with Tailwind.
- `/backend/schema.sql` - Database table definitions.
- `/backend/swagger.yaml` - OpenAPI docs.
- `/backend/postman_collection.json` - Ready-to-import Postman queries.

## 🛠️ Setup Instructions

### 1. Database Setup
Ensure you have MySQL running. Create the database and tables using the provided schema:
```bash
mysql -u root -p < backend/schema.sql
```

### 2. Backend Configuration
1. Navigate to `backend/`: `cd backend`
2. Install dependencies: `npm install`
3. Configure environment variables: Rename `.env.example` to `.env` and fill in your DB credentials.
4. Run the server: `npm run dev`
   - The API will be available at `http://localhost:3000`
   - Swagger Documentation: `http://localhost:3000/api-docs`

### 3. Frontend Configuration
1. Navigate to `frontend/`: `cd frontend`
2. Install dependencies: `npm install`
3. If your backend is NOT running on port 3000, create a `.env.local` file inside `frontend/` and add:
   `NEXT_PUBLIC_API_URL=http://localhost:3000`
4. Run the Next.js app: `npm run dev`
   - The app will be available at `http://localhost:3001` (or 3000 depending on availability).

## 🌍 Deployment

### 1. Database (PlanetScale / Railway)
- Provision a MySQL database on Railway or PlanetScale.
- Execute `schema.sql` in the new database.
- Obtain the `DATABASE_URL` or equivalent credentials.

### 2. Backend (Render / Railway / Fly.io)
- Connect your GitHub repository to your host.
- Set the root directory to `backend`.
- Add environment variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
- Set Start Command: `npm start`
- Your API is now live. Update your frontend's `NEXT_PUBLIC_API_URL` to this new host.

### 3. Frontend (Vercel)
- Connect your GitHub repository to Vercel.
- Set the root directory to `frontend`.
- Specify the framework as `Next.js`.
- Add the `NEXT_PUBLIC_API_URL` pointing to your deployed Backend instance.
- Deploy.

## 📌 Features
- Complete abstraction of Database querying logic (Controllers -> Models).
- Transactional consistency during checkout (`SELECT FOR UPDATE`).
- Mobile responsive, accessible minimalistic UI.
- Thorough validation using `express-validator`.
