# NexSkill Labs

Full-stack site: React + Vite + Tailwind frontend, Express + Nodemailer backend.

## 1. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:
- `NOTIFY_EMAIL` — where lead notifications get sent (your inbox)
- `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` — credentials to *send* mail

**Using Gmail:** turn on 2-Step Verification on the sending account, then create an
App Password (myaccount.google.com/apppasswords) and use that as `SMTP_PASS`
(not your normal Gmail password). `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`.

**Using a transactional email provider** (SendGrid, Mailgun, Resend, Zoho, etc.)
instead: use the SMTP credentials they give you — same fields.

Run it:
```bash
npm run dev      # http://localhost:5000, auto-restarts on changes
# or
npm start
```

Leads are also saved to `server/leads.json` (so nothing is lost even if email
fails), and viewable at `http://localhost:5000/api/leads` — put this behind
auth before deploying publicly.

## 2. Frontend setup

From the project root:
```bash
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:5000
npm run dev             # http://localhost:5173
```

The Contact form, the Careers application form, and the footer newsletter
signup all call the backend (`src/lib/api.js`).

## 3. Rebranding

Edit `src/data/site.js` — one file controls the company name, tagline,
contact details, social links, and stats shown across the whole site.

## 4. Deploying

- **Frontend:** Vercel or Netlify — set `VITE_API_URL` to your deployed
  backend URL as an environment variable at build time.
- **Backend:** Render or Railway (both have a generous free tier) — set the
  same environment variables from `server/.env` in their dashboard, and set
  `CORS_ORIGIN` to your deployed frontend URL.

## Project structure

```
nexskill-labs/
├── src/                 # React frontend
│   ├── components/      # Navbar, Footer, forms, SkillGraph, etc.
│   ├── pages/            # One file per route
│   ├── data/site.js       # rebrand everything from here
│   └── lib/api.js         # API client
└── server/               # Express backend
    ├── index.js            # Routes: /api/contact, /api/register, /api/subscribe
    ├── mailer.js           # Nodemailer email sending
    └── store.js            # Simple JSON file lead storage
```
