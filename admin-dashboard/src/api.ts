import type { Appointment } from "@/types";

const API = "/api";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error (${res.status}): ${body}`);
  }
  return res.json();
}

export async function fetchAppointments(): Promise<Appointment[]> {
  return request(`${API}/appointments`);
}

export async function updateAppointmentStatus(
  id: string,
  status: Appointment["status"]
): Promise<Appointment> {
  return request(`${API}/appointments/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

export async function logout(): Promise<void> {
  await request(`${API}/auth/logout`, { method: "POST" });
}
