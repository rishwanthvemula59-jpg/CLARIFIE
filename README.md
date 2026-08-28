# Clarifie — Multi-Channel Digital & Telephonic Fraud Fusion Engine

Clarifie is a production-grade multimodal fraud-fusion forensics engine built for security analysts, victims, and financial fraud teams. It ingests telephonic audio, screenshots, and PDF document evidence from a suspected scam incident, analyzes each stream independently with Gemini AI, and executes a cross-modal reasoning pass to uncover hidden fraud signals that single-modality tools miss.

---

## 🌟 Key Features

1. **Authenticated User Workspaces**: Custom JWT authentication and bcrypt password hashing backed by Supabase PostgreSQL Row Level Security (RLS).
2. **Multi-Evidence Upload Flow**: Upload any combination of Audio (MP3/WAV/M4A), Screenshots (PNG/JPG/WEBP), and Documents (PDF) in one multipart request.
3. **Per-Modality AI Analysis**:
   - **Audio**: Transcribes voice calls and flags social-engineering tactics (panic triggers, authority impersonation, OTP requests).
   - **Image**: Scans screenshots for visual phishing flags, logo mismatches, and unverified web domains.
   - **Document**: Evaluates contracts for predatory clauses, non-standard Zelle/wire payment requirements, and hidden fees.
4. **Cross-Modal Fusion Engine**: Performs a reasoning pass cross-referencing all submitted evidence to detect contradictions, channel spoofing, and multi-channel attack patterns.
5. **Signature Fusion Convergence Interaction**: Real-time visual animation demonstrating active node convergence into a unified risk verdict.
6. **Guardian Mode Triage**: Real-time text-only chat triage for immediate fraud reads before evidence is collected.
7. **Evidence Report Generator**: Formats case findings into printable, exportable incident dossiers suitable for filing with bank fraud departments or police complaints.
8. **Scam Pattern Library**: Anonymized cross-user signature matching.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, React Router, Tailwind CSS (Custom forensic tokens), Framer Motion, Axios, Lucide Icons, Recharts.
- **Backend**: Node.js, Express.js, JWT authentication, bcrypt, Zod validation, Multer.
- **Database**: Supabase PostgreSQL with Row Level Security (RLS) policies keyed off JWT user IDs.
- **AI Engine**: Google Gemini API via `@google/genai` SDK (`gemini-2.5-flash`).

---

## 📁 Repository Structure

```
MULTI MODAL AI/
├── client/                      # React + Vite Frontend
│   ├── src/
│   │   ├── api/                 # Axios client with JWT interceptor
│   │   ├── components/          # FusionConvergenceAnimation, RiskScoreGauge, CrossModalFindings, etc.
│   │   ├── context/             # AuthContext provider
│   │   ├── pages/               # LandingPage, Dashboard, NewCase, CaseResult, Guardian, etc.
│   │   ├── styles/ & index.css  # Forensic CSS design system
│   ├── index.html
│   ├── tailwind.config.js       # Custom forensic color tokens & fonts
│   └── vite.config.js
│
├── server/                      # Express API Backend
│   ├── src/
│   │   ├── config/              # db.js (Supabase client & memory fallback)
│   │   ├── controllers/         # auth, case, guardian controllers
│   │   ├── middleware/          # auth, multer upload, zod validation
│   │   ├── routes/              # API route definitions
│   │   ├── services/            # gemini.service.js (@google/genai SDK integration)
│   │   └── index.js             # Express bootstrap & static uploads server
│   └── package.json
│
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql # PostgreSQL schema & RLS policies
│
├── .gitignore
└── README.md
```

---

## 🚀 Local Quickstart Instructions

### 1. Configure Environment Files

Create `server/.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_long_random_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

Create `client/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Execute Database Migrations (Supabase Console)
Paste the contents of `supabase/migrations/001_initial_schema.sql` into your Supabase Dashboard **SQL Editor** and click **Run**.

### 3. Run Backend & Frontend

Terminal 1 (Server):
```bash
cd server
npm install
npm run dev
```

Terminal 2 (Client):
```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.
