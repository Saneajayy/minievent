# Deploying MyEvent Fullstack to Vercel

Your project consists of a **Next.js frontend**, an **Express backend**, and a **MySQL database**. Because of this separated architecture, you'll need to handle deployment in three distinct parts.

## Step 1: Host Your Database in the Cloud
Vercel does not host MySQL databases. You must move your local database to a cloud provider so your deployed backend can access it.
- **Recommended Free/Low-Cost Providers:** [Aiven](https://aiven.io/mysql) or [Railway](https://railway.app/).
- Once created, copy the connection details (Host, User, Password, Database Name).
- Run your `schema.sql` file on this new cloud database to set up the tables.

## Step 2: Push Your Code to GitHub
Vercel deploys directly from your Git repositories.
1. Open your terminal in the `MyEvent` root folder.
2. Initialize git and push the entire folder (both `frontend` and `backend`) to a new GitHub repository.
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/myevent-repo.git
   git push -u origin main
   ```

## Step 3: Deploy the Backend
While Vercel is famous for Next.js frontends, you *can* deploy Express backends using Vercel's Edge/Serverless functions, though services like [Render.com](https://render.com) are usually much easier for Express apps. 

**If deploying Backend to Render (Recommended for Express):**
1. Go to [Render.com](https://render.com) and create a new "Web Service".
2. Connect your GitHub repo.
3. Set the **Root Directory** to `backend`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. **Environment Variables:** Add `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` from your Step 1 cloud database, and `JWT_SECRET`.
7. Click Deploy. *Save the resulting URL (e.g., `https://myevent-backend.onrender.com`).*

## Step 4: Deploy the Frontend (Vercel)
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New... > Project**.
2. Connect your GitHub account and Import your `MyEvent` repository.
3. Look for the **Root Directory** setting, click `Edit`, and select the `frontend` folder.
4. **Environment Variables:** Add a new variable named `NEXT_PUBLIC_API_URL` and set its value to your backend's deployed URL from Step 3 (e.g., `https://myevent-backend.onrender.com`).
5. Click **Deploy**.

Once the build completes, Vercel will give you a live URL for your frontend! All API requests will route to your live backend, which processes them against your live cloud database.
