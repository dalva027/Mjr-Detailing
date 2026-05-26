import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import appointmentRoutes from "./routes/appointments";
import authRoutes from "./routes/auth";
import { seedAdmin } from "./services/admin";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "4000", 10);

// CORS with credentials support
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(new Date().toISOString() + " " + req.method + " " + req.path);
  next();
});

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "blending-with-junior-api" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

// Seed default admin on startup
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@blendingwithjunior.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@1234";
seedAdmin(ADMIN_EMAIL, ADMIN_PASSWORD).catch(console.error);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
  console.log("Health check: http://localhost:" + PORT + "/health");
});
