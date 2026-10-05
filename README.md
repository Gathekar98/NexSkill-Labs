# NexSkill Labs

NexSkill Labs is a React/Vite website with a separate Express API for contact enquiries, applications, newsletter subscriptions, and Razorpay payments.

## Run in VS Code

1. Open this folder in VS Code.
2. Install frontend dependencies with `npm install`.
3. Copy `.env.example` to `.env` in the project root. The default API URL is `http://localhost:5000`.
4. In a terminal, run `npm run dev` for the website.
5. In a second terminal, run `cd server`, `npm install`, copy `server/.env.example` to `server/.env`, then run `npm run dev`.
6. Open the Vite URL shown in the first terminal (normally `http://localhost:5173`).

The root and server environment files are ignored by Git. Add real credentials only to `server/.env`; never commit them. Contact and application submissions are saved by the API. Sending email requires a verified Brevo sender and `BREVO_API_KEY`. Payments require Razorpay test keys in `server/.env`; use live credentials only when ready to accept payments.

## Deploy using the existing GitHub, Vercel, and Render projects

The frontend now lives at the repository root. The previous nested
`nexskill-labs/` directory has been removed intentionally. Keep the existing
GitHub repository and hosting projects; update their directory settings.

### Vercel frontend

1. Open the existing project's **Settings > Build and Deployment**.
2. Clear **Root Directory** so it uses the repository root. Do not set it to
   `nexskill-labs`, `src`, or `server`. This dashboard setting must be changed
   even when `vercel.json` is present.
3. Select **Vite** as the framework. The root `vercel.json` sets installation
   to `npm ci`, build to `npm run build`, and output to `dist`.
4. Use Node.js **22.x** or **24.x**. Vite requires Node 20.19+ or 22.12+.
5. Keep the existing GitHub connection and production branch.
6. In **Environment Variables**, set `VITE_API_URL` to the existing Render
   backend's HTTPS origin, without `/api` or a trailing slash. Enable it for
   Production and, if needed, Preview. Never put backend secrets in `VITE_*`
   variables because they are included in the browser bundle.
7. Push these configuration changes to GitHub, then deploy the latest commit.
   If manually redeploying, select the deployment for the new commit rather
   than an older commit containing the nested folder structure.

The rewrite in `vercel.json` serves the React application when a visitor
opens or refreshes a page such as `/contact` or `/programs/data-science`.

### Render backend

On the existing web service, set **Root Directory** to `server` (previously
it may have been `nexskill-labs/server`), **Build Command** to `npm ci`, and
**Start Command** to `npm start`. Keep the existing environment credentials.
Set `CORS_ORIGIN` to the exact frontend origin, such as
`https://your-project.vercel.app`; multiple origins can be comma-separated.
Include the custom domain if one is used. Redeploy the latest commit.

After deployment, open the backend's `/api/health` endpoint and confirm it
returns `{"ok":true}`. Check the website homepage, refresh `/contact`, and
verify a form can reach the backend. Changing `VITE_API_URL` requires a new
frontend build.

The server writes leads to `server/leads.json`. Preserve existing lead data
before redeploying; durable storage requires a separate persistence setup.
The example environment file contains placeholders only. If a real Razorpay
secret was previously committed, rotate it in Razorpay and update Render;
removing it from the current file does not remove it from Git history.

## Available scripts

- `npm run dev` — start the Vite frontend.
- `npm run build` — create the production frontend build.
- `npm run preview` — preview the production build.
- In `server/`, `npm run dev` — start the API with nodemon; `npm start` runs it without nodemon.

The frontend includes the course and career pages; course registration and NQT checkout retain the backend payment integration. Program applications without a configured fee use the application form.
