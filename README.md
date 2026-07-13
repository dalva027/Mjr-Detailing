# Blending with Junior - Professional Auto Detailing

Full-stack web application for "Blending with Junior" vehicle detailing business — customer-facing website, REST API, and admin dashboard.

## Architecture

```
mjr-detail/
+-- frontend/          # Customer website (React + Vite + Tailwind CSS)
+-- admin-dashboard/   # Admin panel (React + Vite + Tailwind CSS)
+-- backend/           # Express API (TypeScript + Prisma + PostgreSQL)
```


## Features

### Customer Website (`frontend/`)

- **Hero Section** — Cinematic full-bleed imagery with business tagline
- **Services** — Four tiers of care (Express Wash, Exterior Detail, Interior Detail, Machine Wax)
- **Appointment Booking** — Form with Zod validation, creates appointment + sends SMS confirmation
- **Contact** — Phone, text, service area info with clickable links
- **Responsive** — Mobile-first design with hamburger nav

### Admin Dashboard (`admin-dashboard/`)

- **Authentication** — Login/logout with JWT cookies (access + refresh), rate-limited login endpoint
- **Protected Routes** — Route guards that validate auth state
- **Dashboard** — Overview of appointment statistics
- **Appointment Management** — View, filter, and update appointment status (pending, confirmed, in-progress, completed, cancelled)
- **Status Badges** — Color-coded status indicators

### Backend API (`backend/`)

- JWT-based authentication (access token + refresh token via httpOnly cookies)
- Password hashing with bcrypt
- Rate limiting on login endpoint (5 attempts / 15 min)
- SMS confirmation via textbee.dev
- CORS configured for frontend and admin origins

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Admin Dashboard | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Express 5, TypeScript |
| Database | PostgreSQL with Prisma ORM |
| Auth | JWT (jsonwebtoken), bcrypt, httpOnly cookies |
| SMS | textbee.dev |
| Icons | Lucide React |
| Validation | Zod |
| Security | express-rate-limit, CORS |

## API Endpoints

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/appointments` | Create appointment (triggers SMS) |
| GET | `/api/appointments` | List all appointments |
| GET | `/api/appointments/:id` | Get appointment |
| PUT | `/api/appointments/:id/status` | Update status |

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login (rate-limited) |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout (requires auth) |
| GET | `/api/auth/me` | Get current admin (requires auth) |

## SMS Confirmation

When a booking is submitted, the system sends an SMS confirmation to the customer via **textbee.dev**. Configure your credentials in the backend `.env`:

```env
TEXTBEE_DEVICE_ID=your_device_id
TEXTBEE_API_KEY=your_api_key
```

Without textbee.dev credentials, SMS previews are logged to the console.

## Deployment

The project includes a [`render.yaml`](./render.yaml) configuration for one-click deployment to [Render](https://render.com):

- **Backend** — Web service (Node.js, free plan, Oregon region). Free instances spin down after ~15 min idle, so the first request after a quiet period cold-starts.
- **Database** — External PostgreSQL on [Neon](https://neon.com) (free tier). Create a Neon project and set its **direct** (non-pooled) connection string — including `?sslmode=require` — as `DATABASE_URL` in the Render dashboard (Service → Environment). The build runs `prisma migrate deploy`, and the API auto-seeds the admin from `ADMIN_EMAIL` / `ADMIN_PASSWORD` on first boot.
- **Admin Dashboard** — Deploy separately via Vercel (`vercel.json` included)

## Business Info

- **Name**: Blending with Junior Professional Auto Detailing
- **Phone**: (210) 992-1268
- **Service Area**: San Antonio, TX
- **Services**: Express Wash, Exterior Detail, Interior Detail, Machine Wax
