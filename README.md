# Blending with Junior - Professional Auto Detailing

Full-stack web application for "Blending with Junior" vehicle detailing business.

## Architecture

```
mjr-detail/
+-- frontend/   # React + TypeScript + Vite + Tailwind CSS
+-- backend/    # Express + TypeScript + Prisma + PostgreSQL
```

## Quick Start

### 1. Backend

```bash
cd backend
npm install
```

Set up your `.env` file (copy `.env.example`):
```bash
cp .env.example .env
```

Set up the database:
```bash
npx prisma migrate dev --name init
```

Start the dev server:
```bash
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Features

- **Hero Section**: Cinematic full-bleed imagery with business tagline
- **Services**: Showcases 4 services (Exterior Wash & Wax, Mobile Service, Stain Removal, Ceramic Coating)
- **Appointment Booking**: Form with validation, creates appointment + sends SMS confirmation
- **Contact**: Phone, text, service area info with clickable links
- **Responsive**: Mobile-first design with hamburger nav

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Express 5, TypeScript |
| Database | PostgreSQL with Prisma ORM |
| SMS | textbee.dev |
| Icons | Lucide React |
| Validation | Zod |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/appointments` | List all appointments |
| GET | `/api/appointments/:id` | Get appointment |
| POST | `/api/appointments` | Create appointment (triggers SMS) |
| PUT | `/api/appointments/:id/status` | Update status |

## SMS Confirmation

When a booking is submitted, the system sends an SMS confirmation to the customer via Twilio. Configure your textbee.dev credentials in the backend `.env`:

```env
TEXTBEE_DEVICE_ID=your_device_id
TEXTBEE_API_KEY=your_api_key
# No phone number needed
```

Without textbee.dev credentials, SMS previews are logged to the console.

## Business Info

- **Name**: Blending with Junior Professional Auto Detailing
- **Phone**: (210) 992-1268
- **Service Area**: San Antonio, TX
- **Services**: Exterior Wash & Wax, Mobile Service, Stain Removal, Ceramic Coating