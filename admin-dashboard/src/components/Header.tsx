import { CalendarDays, LogOut } from "lucide-react";

interface HeaderProps {
  onLogout: () => void;
}

export function Header({ onLogout }: HeaderProps) {
  return (
    <header className="border-b border-hairline px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
          <CalendarDays className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-medium tracking-wide text-text-primary">
            Admin Dashboard
          </h1>
          <p className="text-xs text-text-muted">Blending with Junior</p>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="inline-flex items-center gap-2 text-xs text-text-muted hover:text-text-primary transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">Sign Out</span>
      </button>
    </header>
  );
}
