# Blending with Junior - Backend API

Express + TypeScript + PostgreSQL + Prisma + textbee.dev SMS

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

3. Set up PostgreSQL database:
```bash
npx prisma migrate dev --name init
```

4. Start the dev server:
```bash
npm run dev
```

## Environment Variables

- `PORT` - Server port (default: 4000)
- `DATABASE_URL` - PostgreSQL connection string
- `TEXTBEE_DEVICE_ID` - Your Android device ID from textbee.dev dashboard
- `TEXTBEE_API_KEY` - Your API key from textbee.dev dashboard

## API Endpoints

- `GET /health` - Health check
- `GET /api/appointments` - List all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create appointment (sends SMS confirmation)
- `PUT /api/appointments/:id/status` - Update appointment status

## SMS Integration

When textbee.dev credentials are configured, appointments trigger an SMS confirmation to the customer via the textbee.dev Android SMS gateway. When credentials are not set, SMS previews are logged to the console.

For setup, visit https://app.textbee.dev/dashboard to register your Android device and generate an API key.