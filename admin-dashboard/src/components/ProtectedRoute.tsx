import { useAuth } from "@/contexts/AuthContext";
import { Login } from "@/pages/Login";
import type { ReactNode } from "react";
import { useCallback } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, login } = useAuth();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        await login(email, password);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Login failed";
        alert(message);
      }
    },
    [login]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} error={null} />;
  }

  return <>{children}</>;
}
