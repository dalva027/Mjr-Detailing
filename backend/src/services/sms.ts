interface AppointmentData {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: Date;
  status: string;
}

const serviceLabels: Record<string, string> = {
  "exterior-wash-wax": "Exterior Wash & Wax/Sealant",
  "mobile-service": "Mobile Service",
  "stain-removal": "Stain Removal",
  "ceramic-coating": "Ceramic Coating",
};

const API_BASE = "https://api.textbee.dev/api/v1";

async function sendSMS(toPhone: string, message: string): Promise<void> {
  const deviceId = process.env.TEXTBEE_DEVICE_ID;
  const apiKey = process.env.TEXTBEE_API_KEY;

  if (!deviceId || !apiKey) {
    console.log(
      `[SMS Preview via textbee.dev] To: ${toPhone}\nMessage: ${message}`
    );
    return;
  }

  try {
    const response = await fetch(
      `${API_BASE}/gateway/devices/${deviceId}/send-sms`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          recipients: [toPhone],
          message,
        }),
      }
    );

    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `textbee.dev SMS failed (${response.status}): ${body}`
      );
    }

    const data = await response.json();
    console.log(`SMS sent via textbee.dev:`, data);
  } catch (error) {
    console.error("textbee.dev SMS error:", error instanceof Error ? error.message : error);
  }
}

export async function sendConfirmationSMS(
  toPhone: string,
  appointment: AppointmentData
): Promise<void> {
  const serviceName = serviceLabels[appointment.service] || appointment.service;
  const dateStr = appointment.date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const message = `Hi ${appointment.name}! Thanks for booking with Blending with Junior. Your ${serviceName} appointment is scheduled for ${dateStr}. We will text you at ${toPhone} to confirm. Questions? Call (210) 992-1268.`;

  await sendSMS(toPhone, message);
}

export async function sendStatusUpdateSMS(
  toPhone: string,
  status: string,
  appointment: AppointmentData
): Promise<void> {
  const statusMessages: Record<string, string> = {
    confirmed: "Your appointment has been confirmed. See you soon!",
    cancelled: "Your appointment has been cancelled. Call us to reschedule.",
    completed: "Thank you for choosing Blending with Junior! We hope you love your detail.",
  };

  const message = `${statusMessages[status] || `Status updated: ${status}`}. Call (210) 992-1268 with questions.`;
  await sendSMS(toPhone, message);
}