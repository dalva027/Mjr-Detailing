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
  // `data.date` is already a full UTC ISO string (built from the picked day +
  // time slot as `YYYY-MM-DDTHH:mm:00.000Z`). Send it as-is — re-parsing it
  // through `new Date()` here is unnecessary and risks a timezone shift.
  const res = await fetch(`${API}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || "Failed to book appointment");
  }
}
