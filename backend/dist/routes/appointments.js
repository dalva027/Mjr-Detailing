"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const express_rate_limit_1 = require("express-rate-limit");
const prisma_1 = require("../lib/prisma");
const sms_1 = require("../services/sms");
const router = (0, express_1.Router)();
const appointmentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").max(100),
    email: zod_1.z.string().email("Invalid email").max(200),
    phone: zod_1.z
        .string()
        .min(10, "Phone number is required")
        .max(20)
        .regex(/^\+?[\d\s\-()]+$/, "Invalid phone number format"),
    service: zod_1.z.enum([
        "exterior-wash-wax",
        "mobile-service",
        "stain-removal",
        "ceramic-coating",
        "other",
    ]),
    date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date",
    }),
});
const appointmentLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: "Too many appointment requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});
// GET /api/appointments - List all appointments
router.get("/", async (_req, res) => {
    try {
        const appointments = await prisma_1.prisma.appointment.findMany({
            orderBy: { date: "asc" },
        });
        res.json(appointments);
    }
    catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: "Failed to fetch appointments" });
    }
});
// GET /api/appointments/:id - Get single appointment
router.get("/:id", async (req, res) => {
    try {
        const appointment = await prisma_1.prisma.appointment.findUnique({
            where: { id: req.params.id },
        });
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.json(appointment);
    }
    catch (error) {
        console.error("Error fetching appointment:", error);
        res.status(500).json({ error: "Failed to fetch appointment" });
    }
});
// POST /api/appointments - Create appointment
router.post("/", appointmentLimiter, async (req, res) => {
    try {
        const validated = appointmentSchema.parse(req.body);
        const appointment = await prisma_1.prisma.appointment.create({
            data: {
                name: validated.name,
                email: validated.email,
                phone: validated.phone,
                service: validated.service,
                date: new Date(validated.date),
                status: "pending",
            },
        });
        // Send confirmation SMS
        try {
            await (0, sms_1.sendConfirmationSMS)(appointment.phone, appointment);
        }
        catch (smsError) {
            console.error("SMS send failed:", smsError);
        }
        // Send Business SMS
        try {
            if (process.env.BUSINESS_PHONE) {
                await (0, sms_1.sendAdminSMS)(process.env.BUSINESS_PHONE, appointment);
            }
            else {
                console.warn("Admin phone not available, skipping");
            }
        }
        catch (smsError) {
            console.error("SMS for admin not sent:", smsError);
        }
        res.status(201).json(appointment);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: "Validation failed", details: error.errors });
        }
        console.error("Error creating appointment:", error);
        res.status(500).json({ error: "Failed to create appointment" });
    }
});
// PUT /api/appointments/:id/status - Update status
router.put("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;
        if (!["confirmed", "cancelled", "completed"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }
        const appointment = await prisma_1.prisma.appointment.update({
            where: { id: req.params.id },
            data: { status },
        });
        // Send status update SMS to customer
        try {
            await (0, sms_1.sendStatusUpdateSMS)(appointment.phone, status, appointment);
        }
        catch (smsError) {
            console.error("SMS status update failed:", smsError);
        }
        res.json(appointment);
    }
    catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ error: "Failed to update appointment" });
    }
});
exports.default = router;
//# sourceMappingURL=appointments.js.map