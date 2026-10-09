# DevAssess — Next-Gen Technical Assessment Platform

**DevAssess** is an enterprise-grade technical assessment and candidate benchmarking platform. Designed to eliminate hiring friction, DevAssess pairs deterministic automated scoring pipelines with tokenized credit economics, bKash automated checkout, granular role-based access, and immutable system audit logs.

---

## 🌐 Live Deployments

* **Frontend Application:** [https://developer-assessment-platform-delta.vercel.app](https://developer-assessment-platform-delta.vercel.app)
* **Backend API Gateway:** [https://coding-platform-henna.vercel.app](https://coding-platform-henna.vercel.app)

---

## ⚡ 1-Click Demo Credentials

The platform features built-in 1-click demo authentication on `/login` to explore all roles without manual registration:


---

## ✨ Key Features & Architecture

### 1. Role-Based Experiences & Portals

#### 🛡️ Administrator Console (`/admin`)

* **Platform Governance:** Search, filter, and inspect registered users across candidates and recruiters.
* **Account Moderation:** One-click account suspension (Block / Unblock) with real-time state sync.
* **Visual Analytics:** Interactive distribution graphs built with **Recharts** highlighting assessment throughput, candidate pass ratios, and user growth.
* **System Audit Logs:** Immutable JSON-level audit trail (`/admin/audit-logs`) logging financial checkouts, privilege updates, and scoring events.

#### 💼 Recruiter Portal (`/recruiter`)

* **Question Pool Authoring:** Rich question authoring tool (`/recruiter/questions/create`) powered by **React Hook Form + Zod** validation.
* **Assessment Pipelines:** Configure customized multi-question technical screenings with automated time restrictions and category benchmarks.
* **Candidate Invitations & Tracking:** Track candidate submission lifecycles from invitation to final score verification.
* **Credit Economics & Billing:**
* Real-time balance badge in dashboard headers.
* Creating and launching candidate assessment pipelines deducts evaluation credits.
* Out-of-credit locks prevent test distribution until top-up.



#### 💳 bKash Payment Integration (`/recruiter/billing`)

* **Automated Credit Top-up:** Select customized hiring credit packages (Starter, Pro, Enterprise).
* **Tokenized Sandbox Checkout:** Direct API integration requesting payment URLs and executing callback transactions.
* **Instant Wallet Credit Update:** Automated webhook/callback verification credits recruiter accounts instantly without manual intervention.

#### 👨‍💻 Candidate Workspace (`/dashboard`)

* **Timed Assessment Interface:** Distraction-free test environment with countdown timers and answer tracking.
* **Automated Evaluation Engine:** Deterministic scoring logic that grades multiple-choice submissions instantly upon submission with zero human latency.
* **Performance Breakdown:** Immediate score reports, answer reviews, and historical assessment records.

---

### 2. UI/UX & Reliability Enhancements

* **Enterprise Form Handling:** Real-time client-side schema validation using **Zod** and **React Hook Form**. Invalid submissions display human-readable inline error badges.
* **Skeleton Loading Screens:** Integrated Next.js `loading.tsx` suspense skeletons across admin, recruiter, and candidate layouts to prevent layout shift during data fetching.
* **Resilient Routing & Error Boundaries:**
* Custom enterprise 404 page (`not-found.tsx`).
* Granular error recovery interface with reset boundaries (`error.tsx`).


* **Route Guards & Middleware:** Cookie-based session tokens (`token`, `role`) validated via middleware to isolate portal access and block unauthorized navigation.
* **Modern Public Presentation:** Marketing pages including Landing (`/`), About (`/about`), Features (`/features`), and Credit Pricing (`/pricing`).

---

## 🛠️ Tech Stack

* **Core Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing)
* **Styling & Design:** [Tailwind CSS](https://tailwindcss.com/)
* **Form & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
* **Data Visualization:** [Recharts](https://recharts.org/)
* **Payment Gateway:** bKash Tokenized Checkout API
* **State & Network:** Native Fetch Client wrapper with centralized error handling
* **Code Quality:** [Biome](https://biomejs.dev/) for strict formatting and linting
* **Deployment:** Vercel Serverless Platform

---

## 📁 Repository Directory Structure

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx             # Auth page with 1-click demo login
│   │   └── register/page.tsx          # Dual-role Zod validated onboarding
│   ├── (public)/
│   │   ├── about/page.tsx             # Company mission and team overview
│   │   ├── features/page.tsx          # Technical capabilities breakdown
│   │   └── pricing/page.tsx           # Credit tiers and purchasing guide
│   ├── admin/
│   │   ├── audit-logs/page.tsx        # System audit records viewer
│   │   ├── loading.tsx                # Dashboard skeleton loader
│   │   └── page.tsx                   # System governance & Recharts analytics
│   ├── recruiter/
│   │   ├── billing/page.tsx           # bKash credit package checkout
│   │   ├── assessments/create/        # Assessment creation workflow
│   │   ├── questions/create/page.tsx  # Zod-validated question authoring
│   │   ├── loading.tsx                # Recruiter skeleton loader
│   │   └── page.tsx                   # Pipeline metrics and assessment status
│   ├── dashboard/                     # Candidate assessment workspace
│   ├── error.tsx                      # Global Error Boundary fallback
│   ├── not-found.tsx                  # Custom 404 route
│   ├── layout.tsx                     # Root App Router layout
│   └── page.tsx                       # Production marketing landing page
├── components/
│   ├── ui/                            # Reusable base components
│   └── shared/                        # Navigation and role-specific sidebars
├── lib/
│   ├── api.ts                         # Centralized fetchClient with cookies/auth
│   └── utils.ts                       # Class merging and formatting helpers
└── middleware.ts                      # Role-based route protection

```

---

## 🚀 Getting Started Locally

### Prerequisites

* **Node.js:** `v20.x` or higher
* **npm:** `v10.x` or higher

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/developer-assessment-platform.git
cd developer-assessment-platform

```


2. **Install project dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=https://coding-platform-henna.vercel.app/api/v1
NEXT_PUBLIC_BASE_URL=http://localhost:3000

```


4. **Run development server:**
```bash
npm run dev

```


Open [http://localhost:3000](http://localhost:3000) in your browser.
5. **Build for production:**
```bash
npm run build
npm run start

```



---

## 🔒 Security & Optimization

* **Strict CORS Integration:** Edge-level origin whitelisting configured via `vercel.json` and Express middleware.
* **HTTP-Only Cookie Session Handling:** Auth tokens and role scopes stored safely with strict path isolation.
* **Client-Side Defense:** Forms are checked by Zod schemas on the client before network requests execute, preventing malformed payloads from consuming API resources.

---

## 📄 License

This project is open-source under the [MIT License](https://www.google.com/search?q=LICENSE).
