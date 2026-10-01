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

## Available scripts

- `npm run dev` — start the Vite frontend.
- `npm run build` — create the production frontend build.
- `npm run preview` — preview the production build.
- In `server/`, `npm run dev` — start the API with nodemon; `npm start` runs it without nodemon.

The frontend includes the course and career pages; course registration and NQT checkout retain the backend payment integration. Program applications without a configured fee use the application form.
