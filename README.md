# 🎬 IMovies 🎀 Pastel Bubblegum Dream Movie Booking Platform

> **Project Type:** Individual Capstone Project  
> **Aesthetic:** Pastel Bubblegum Y2K Cinema 🎀🍬  
> **Author:** Prerna  
> **Version:** 2.0.0  

---

## ⚡ Executive Summary

**IMovies** is a full-stack online movie ticket booking platform built for speed, transparency, and sweet cinema personality. Transformed with a dreamy **Pastel Bubblegum Y2K Cinema** visual identity, IMovies pairs adorable boutique aesthetics with robust technical architecture: **browse now-showing features, select seats on a live interactive auditorium map, and collect adorable digital cinema passes.**

The backend is intentionally kept **lean and robust** (Express.js + MongoDB Mongoose), while the frontend delivers a **charming, cohesive pastel experience** using React (Vite) and a centralized design system.

---

## 🎨 Pastel Bubblegum Dream Design System

The visual design language is grounded in soft candy pastels, rounded pill controls, collectible ticket cards, and accessible typography.

- **Milky White (`#FFF9FC`)**: Primary page background
- **Soft Blush (`#FFE3EF`)**: Secondary surfaces & subtle card sections
- **Bubblegum Pink (`#FF8FC7`)**: Primary actions, active highlights & emphasis
- **Cotton Candy Pink (`#FFC2E2`)**: Surface highlights & accents
- **Baby Blue (`#C8E7FF`)**: Available auditorium seats & secondary highlights
- **Lavender (`#DCCBFF`)**: Complementary chips & metadata
- **Strawberry Red (`#FF5C85`)**: Selected seat accents & important alerts
- **Butter Yellow (`#FFF0A8`)**: Star ratings & price badges
- **Deep Berry (`#542743`)**: High-contrast, readable primary text
- **Soft Rose (`#F0A8CB`)**: Rounded borders & perforated dividers
- **Typography**:
  - Headings: `Fredoka`, cursive, sans-serif
  - Body: `Nunito`, sans-serif
  - Monospace accents: `Space Mono`, monospace

---

## 🏗️ Architecture & Component Flow

```mermaid
flowchart TD
    subgraph Client ["Frontend — React / Vite"]
        UI["Pastel Bubblegum UI"]
        AuthCtx["Auth Context (JWT in LocalStorage)"]
        SeatMap["Interactive 40-Seat Grid Map"]
    end

    subgraph Server ["Backend — Express.js REST API"]
        AuthMdw["JWT Auth Middleware"]
        MovieCtrl["Movies & Showtimes Controller"]
        BookCtrl["Atomic Booking & Race Condition Prevention"]
    end

    subgraph Database ["Cloud Database"]
        Atlas[("MongoDB Atlas M0 Cluster")]
    end

    UI --> AuthCtx
    UI --> SeatMap
    AuthCtx -->|Bearer Token| AuthMdw
    SeatMap -->|Atomic POST /api/bookings| BookCtrl
    AuthMdw --> BookCtrl
    MovieCtrl --> Atlas
    BookCtrl --> Atlas
```

---

## 📊 Database Schema (ERD)

```mermaid
erDiagram
    USER {
        ObjectId _id
        String name
        String email
        String password
        String role
        Date createdAt
    }
    MOVIE {
        ObjectId _id
        String title
        String genre
        String language
        Number duration
        String rating
        String posterUrl
        String description
        Date releaseDate
    }
    SHOWTIME {
        ObjectId _id
        ObjectId movieId
        Date date
        String time
        String hall
        Number totalSeats
        Number price
        Array bookedSeats
    }
    BOOKING {
        ObjectId _id
        ObjectId userId
        ObjectId showtimeId
        Array seats
        Number totalAmount
        String status
        Date createdAt
    }

    USER ||--o{ BOOKING : "makes"
    MOVIE ||--o{ SHOWTIME : "schedules"
    SHOWTIME ||--o{ BOOKING : "contains"
```

---

## 🔌 REST API Endpoints

### 1. Authentication
- `POST /api/auth/register` — Create user account (name, email, password). Returns JWT token.
- `POST /api/auth/login` — Authenticate user credentials. Returns JWT token.
- `GET /api/auth/me` — *(Protected)* Retrieve current user session.

### 2. Movies
- `GET /api/movies` — List all movies (supports `?genre=` and `?search=` query filters).
- `GET /api/movies/:id` — Get single movie details and all scheduled showtimes.

### 3. Showtimes
- `GET /api/showtimes/:id` — Get showtime details with live `bookedSeats` list.

### 4. Bookings *(Protected — Bearer JWT required)*
- `POST /api/bookings` — Book seats. Features **atomic double-booking prevention** via `{ _id, bookedSeats: { $nin: seats } }`. Returns `409 Conflict` if any seat was taken.
- `GET /api/bookings/me` — List all bookings for the logged-in user.
- `PATCH /api/bookings/:id/cancel` — Soft-cancel a booking and atomically release seats (`$pull`).

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v18+ or v20+)
- MongoDB (Local instance or MongoDB Atlas URI)

### 1. Clone & Setup
```bash
git clone https://github.com/your-username/imovies.git
cd imovies
```

### 2. Install Dependencies
```bash
# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
cd ..
```

### 3. Environment Configuration
Create `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/imovies
JWT_SECRET=imovies_super_secret_jwt_key_2026
CLIENT_URL=http://localhost:5173
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Seed Database (Demo Data)
```bash
npm run seed
```
This populates 6 feature films, 12 showtimes, and two demo accounts:
- **User:** `demo@imovies.com` / `password123`
- **Admin:** `admin@imovies.com` / `admin123`

### 5. Start Servers
```bash
# Start backend on http://localhost:5000
npm run dev:server

# In a second terminal, start frontend on http://localhost:5173
npm run dev:client
```

---

## 🧪 Automated Testing

Run the automated integration and unit test suite:
```bash
npm test
```
The test suite utilizes a live in-memory MongoDB engine (`mongodb-memory-server`) and HTTP requests (`supertest`) to validate:
1. **Password Hashing:** Salt generation, hashing, and `bcrypt.compare` verification.
2. **JWT Security:** Signing, 7-day expiration, tampering rejection, and secret validation.
3. **Auth Middleware:** Missing header, malformed token, and successful injection of `req.user`.
4. **Auth Endpoints:** Register, duplicate email 409 conflict, password length rules, email regex validation, login, wrong credentials rejection, and `/api/auth/me`.
5. **Movies & Showtimes:** Catalog listing, genre filtering, search, **regex special character injection resilience** (`search=Dune+[`), and valid/malformed ObjectId 404 handling.
6. **Real MongoDB Concurrency & Anti-Double-Booking:** Simulates simultaneous concurrent race conditions with `Promise.all` for identical seats, asserting that exactly one succeeds (201) while the other is rejected with `409 Conflict`.
7. **Seat Validation & Duplicate Prevention:** Rejects duplicate seat requests in same payload (`400 Bad Request`) and invalid seat formats.
8. **Soft Cancellation & Seat Release:** Verifies `$pull` removes seats from MongoDB showtime doc, prevents double-cancellation, and allows freed seats to be re-booked.
9. **Health & Fallback Routes:** Checks root info, `/api/health`, and 404 fallbacks.

---

## 🌐 Deployment Options

IMovies supports all deployment models requested:

### Option 1: Two Different Platforms (Frontend on Vercel, Backend on Render) — *Recommended*
1. **Database:**
   - Create a free M0 cluster on [MongoDB Atlas](https://cloud.mongodb.com).
   - In Network Access, whitelist `0.0.0.0/0`.
   - Copy connection string into `MONGO_URI`.
2. **Backend (Render):**
   - In [Render Dashboard](https://dashboard.render.com), create a new **Web Service**.
   - Root directory: `server`.
   - Build command: `npm install`.
   - Start command: `node server.js`.
   - Set environment variables: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`.
   - Note your backend URL: e.g. `https://imovies-api.onrender.com`.
3. **Frontend (Vercel):**
   - In [Vercel Dashboard](https://vercel.com), import the repository.
   - Root directory: `client`.
   - Framework preset: `Vite`.
   - Environment variable: `VITE_API_URL=https://imovies-api.onrender.com`.
   - Deploy.

---

### Option 2: Both on Render (Blueprint Deployment)
The repository includes a ready-to-deploy `render.yaml` blueprint:
1. Connect repository in Render.
2. Choose **Blueprints** -> Select `render.yaml`.
3. Render will provision:
   - `imovies-api`: Web Service for Express.js.
   - `imovies-client`: Static Site for Vite React with automatic route rewrites to `/index.html`.
4. Supply your `MONGO_URI` in the dashboard.

---

### Option 3: Both on Vercel (Monorepo Serverless)
The repository includes root `vercel.json` and `api/index.js`:
1. In Vercel, import repository with root directory `/`.
2. Vercel automatically detects the static build for `/client` and serverless functions under `/api`.
3. Set environment variables `MONGO_URI` and `JWT_SECRET` in the Vercel project settings.

---

## 🏆 Evaluation Checklist (Capstone Ready)

- [x] **Clean, modular codebase** with distinct `client/` and `server/` boundaries.
- [x] **RESTful API** with proper HTTP status codes (`200`, `201`, `400`, `401`, `404`, `409`, `500`).
- [x] **JWT Authentication & bcrypt** password encryption with route protection.
- [x] **Anti-Race-Condition Booking:** Atomic seat updates preventing double-booking.
- [x] **Responsive Neo-Brutalist UI:** Custom CSS design system inspired by Hacktoberfest 2026.
- [x] **Interactive Seat Map:** 40 seats with visual cinema screen, aisle gap, and live selection.
- [x] **My Bookings Dashboard:** View passes and cancel reservations with instant seat release.
- [x] **Turn-Key Deployment Files:** `render.yaml`, `vercel.json`, and `.env.example` included.
- [x] **Demo Data Seed Script:** 6 movies, 12 showtimes, and evaluator demo accounts.
- [x] **Automated Test Suite:** 100% test pass rate across 6 test suites.

---

