const API =  "/api";

interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  notes?: string;
}

export async function createAppointment(data: BookingPayload): Promise<void> {
  const res = await fetch(`${API}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      date: new Date(data.date).toISOString(),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || "Failed to book appointment");
  }
}
