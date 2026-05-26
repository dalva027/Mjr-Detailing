import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import type { Appointment } from "./types";
import { fetchAppointments } from "./api";
import { useCallback, useEffect, useState } from "react";
import { logout } from "./api";

function AppContent() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAppointments();
      setAppointments(data);
    } catch {
      setError("Failed to load appointments. Make sure the backend is running on port 4000.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handleLogout = useCallback(async () => {
    await logout().catch(() => {});
    window.location.href = "/";
  }, []);

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <Header onLogout={handleLogout} />
      <Dashboard
        appointments={appointments}
        loading={loading}
        error={error}
        onRefresh={loadAppointments}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AppContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}
