import { useState, useCallback } from "react";
import { CalendarDays } from "lucide-react";

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  error: string | null;
}

export function Login({ onLogin, error }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || !password) return;
      setLoading(true);
      try {
        await onLogin(email, password);
      } finally {
        setLoading(false);
      }
    },
    [email, password, onLogin]
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
            <CalendarDays className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-medium tracking-wide text-white">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Blending with Junior</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-900/20 border border-red-800/50 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#141414] border border-gray-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600"
              placeholder="your@emailexample.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#141414] border border-gray-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600"
              placeholder="password"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 text-sm font-medium tracking-wider uppercase rounded-lg transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
