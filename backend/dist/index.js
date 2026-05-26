"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const appointments_1 = __importDefault(require("./routes/appointments"));
const auth_1 = __importDefault(require("./routes/auth"));
const admin_1 = require("./services/admin");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "4000", 10);
// CORS with credentials support
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Request logging
app.use((req, _res, next) => {
    console.log(new Date().toISOString() + " " + req.method + " " + req.path);
    next();
});
// Health check
app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "blending-with-junior-api" });
});
// Routes
app.use("/api/auth", auth_1.default);
app.use("/api/appointments", appointments_1.default);
// Seed default admin on startup
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@blendingwithjunior.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@1234";
(0, admin_1.seedAdmin)(ADMIN_EMAIL, ADMIN_PASSWORD).catch(console.error);
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});
// Error handler
app.use((err, _req, res, _next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
});
app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
    console.log("Health check: http://localhost:" + PORT + "/health");
});
//# sourceMappingURL=index.js.map