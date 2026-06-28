# ⚡ QraftAI

> **From target job spec to interview-ready. AI strategy, targeted problem drills, and ATS-tailored resume generation.**

[![Stack](https://img.shields.io/badge/Stack-MERN-blue?style=flat-square)](#)
[![AI Engine](https://img.shields.io/badge/AI-Google_Gemini-orange?style=flat-square)](#)
[![PDF Engine](https://img.shields.io/badge/PDF-Puppeteer-green?style=flat-square)](#)
[![Format](https://img.shields.io/badge/Architecture-Zod_Structured_Schema-purple?style=flat-square)](#)
[![License](https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square)](#)

[🚀 Quick Start](#-quick-start) &bull; [🧩 How It Works](#-how-it-works) &bull; [💡 What It Does](#-what-it-does) &bull; [⚙️ API Workflow](#️-api-workflow)

---

## 💡 What It Does

**QraftAI** is an interview preparation workspace built for developers. Instead of generic advice, QraftAI parses target job descriptions, evaluates candidate resumes or technical profiles, and dynamically synthesizes:

- **Targeted Technical Problems**: Role-specific algorithmic, architectural, and core engineering questions paired with interviewer intention and optimal model answers.
- **Behavioral Scenarios**: Tailored STAR-method question sets addressing team dynamics, conflict resolution, and ownership.
- **Day-by-Day Preparation Roadmap**: A structured study timeline modeled after industry interview sheets (DSA, System Design, Mock Rehearsals).
- **Match Score & Skill Gap Radar**: Accurate compatibility percentages and high/medium/low severity skill gaps.
- **ATS-Tailored Resume PDF Generator**: One-click generation and download of an ATS-compliant resume aligned directly with the target job requirements.

---

## 🧩 How It Works

```mermaid
flowchart TD
    subgraph Client["Frontend Client (React + Vite)"]
        UI["Candidate Workspace\n(Job Description + Resume PDF / Bio)"]
        View["Interactive Study Lab\n(Questions, Roadmap, Score Ring)"]
    end

    subgraph Backend["Express Backend (Node.js)"]
        Auth["Auth Controller\n(JWT & HTTP-Only Cookies)"]
        Parser["PDF Parse / Dossier Ingest"]
        Controller["Interview Controller"]
        ZodGate["Zod Structured Schema Gate\n(Guaranteed JSON Shape)"]
        DB[(MongoDB Atlas)]
    end

    subgraph Engines["AI & Generation Engines"]
        Gemini["Google Gemini Engine\n(Multi-Model Fallback: 2.5 / 2.0 / 1.5)"]
        Puppeteer["Headless Puppeteer Chromium\n(Server-Side PDF Print)"]
    end

    UI -->|Multipart Upload| Parser
    Parser --> Controller
    Controller -->|Target Role & Profile Dossier| Gemini
    Gemini -->|Structured JSON Output| ZodGate
    ZodGate -->|Validated Report| DB
    DB --> Controller
    Controller --> View
    View -->|Request Tailored PDF| Puppeteer
    Puppeteer -->|Binary PDF Stream| UI
```

> **The key design rule:** The analysis gate computes match scores, targeted technical questions, and skill gaps strictly against verified job criteria and structured candidate dossiers, never through ungrounded hallucinations.

---

### What happens when a candidate requests an interview plan

```mermaid
sequenceDiagram
    autonumber
    actor Candidate as Candidate (Web UI)
    participant API as Express Server
    participant DB as MongoDB Atlas
    participant AI as Google Gemini Engine
    participant PDF as Puppeteer Chromium

    Candidate->>API: POST /api/interview/generate (Job Spec + Resume PDF)
    API->>API: Parse Resume Buffer via pdf-parse
    API->>AI: generateContent({ prompt, schema: interviewReportSchema })
    alt Primary Model Overloaded (503 / 429)
        AI-->>API: 503 Spike Detected
        API->>AI: Auto-fallback to gemini-2.0-flash / gemini-1.5-flash
    end
    AI-->>API: Validated JSON (Match Score, Questions, Roadmap, Skill Gaps)
    API->>DB: Save InterviewReport Document
    DB-->>API: Saved Report Object
    API-->>Candidate: 200 OK + Report Data (Navigates to /interview/:id)

    opt Candidate Clicks "Download Tailored Resume"
        Candidate->>API: POST /api/interview/resume/pdf (interviewReportId)
        API->>AI: Generate ATS Tailored HTML
        AI-->>API: Structured HTML
        API->>PDF: Launch Headless Browser & Render PDF Buffer
        PDF-->>API: Binary PDF Stream
        API-->>Candidate: application/pdf Blob Download
    end
```

---

## 🛠️ Core Tech Stack

- **Frontend**: React 19, Vite, SCSS (LeetCode-inspired study theme), React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **AI & Processing**: Google Gemini API (`@google/genai`) with automatic multi-model failover
- **Document Engine**: Puppeteer (server-side headless PDF generation) & `pdf-parse` (resume parsing)
- **Validation**: Zod & `zod-to-json-schema`

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB Database (Local or Atlas cluster)
- Google Gemini API Key ([Google AI Studio](https://aistudio.google.com/))

### 2. Environment Configuration
Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

In `Frontend/`, create `.env`:
```env
VITE_API_URL=http://localhost:3000
```

### 3. Installation & Run

**Terminal 1 — Backend:**
```bash
npm install
node server.js
```

**Terminal 2 — Frontend:**
```bash
cd Frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to start preparing.


