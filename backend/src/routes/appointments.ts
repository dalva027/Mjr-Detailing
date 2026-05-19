import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { sendConfirmationSMS } from "../services/sms";

const router = Router();

const appointmentSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email").max(200),
  phone: z.string().min(10, "Phone number is required").max(20),
  service: z.enum([
    "exterior-wash-wax",
    "mobile-service",
    "stain-removal",
    "ceramic-coating",
  ]),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
});

// GET /api/appointments - List all appointments
router.get("/", async (_req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { date: "asc" },
    });
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// GET /api/appointments/:id - Get single appointment
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ error: "Failed to fetch appointment" });
  }
});

// POST /api/appointments - Create appointment
router.post("/", async (req: Request, res: Response) => {
  try {
    const validated = appointmentSchema.parse(req.body);
    const appointment = await prisma.appointment.create({
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
      await sendConfirmationSMS(appointment.phone, appointment);
    } catch (smsError) {
      console.error("SMS send failed:", smsError);
    }

    res.status(201).json(appointment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

// PUT /api/appointments/:id/status - Update status
router.put("/:id/status", async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (!["confirmed", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
    });

    res.json(appointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

export default router;
