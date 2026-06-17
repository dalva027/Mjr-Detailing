import type { Appointment } from "@/types";

const API = "/api";

interface AuthUser {
  id: string;
  email: string;
}

// --- Session refresh coordination -----------------------------------------

// A single in-flight refresh shared by every caller. The backend rotates the
// refresh token on each call (the old token is invalidated), so two concurrent
// refreshes would clobber each other and spuriously log the user out — dedupe
// them onto one promise.
let refreshInFlight: Promise<AuthUser | null> | null = null;

export function refreshSession(): Promise<AuthUser | null> {
  if (!refreshInFlight) {
    refreshInFlight = fetch(`${API}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) =>
        res.ok ? ((await res.json()).user as AuthUser) : null
      )
      .catch(() => null)
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

// AuthContext registers a callback so a terminal 401 (refresh also failed) can
// clear the logged-in user and bounce back to the login screen.
let onSessionExpired: (() => void) | null = null;

export function setSessionExpiredHandler(handler: (() => void) | null): void {
  onSessionExpired = handler;
}

// --- Core request helper ---------------------------------------------------

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const send = () =>
    fetch(url, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      ...options,
    });

  let res = await send();

  // 401 usually means the 15-min access token expired. Refresh once and retry
  // the original request transparently; only give up if the retry still 401s.
  if (res.status === 401) {
    const user = await refreshSession();
    if (user) {
      res = await send();
    }
    if (res.status === 401) {
      onSessionExpired?.();
      throw new Error("Session expired. Please log in again.");
    }
  }

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

export async function deleteAppointment(id: string): Promise<void> {
  await request(`${API}/appointments/${id}`, { method: "DELETE" });
}

export async function logout(): Promise<void> {
  await request(`${API}/auth/logout`, { method: "POST" });
}
