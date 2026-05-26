import { useState } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react";
import type { Appointment } from "@/types";
import { AppointmentRow } from "./AppointmentRow";
import { updateAppointmentStatus } from "@/api";

interface DashboardProps {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function Dashboard({
  appointments,
  loading,
  error,
  onRefresh,
}: DashboardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = appointments.filter((a) => {
    const matchStatus = filter === "all" || a.status === filter;
    const matchSearch =
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search);
    return matchStatus && matchSearch;
  });

  const stats = {
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  };

  const handleStatusChange = async (
    id: string,
    status: Appointment["status"]
  ) => {
    setUpdating(id);
    try {
      await updateAppointmentStatus(id, status);
      onRefresh();
    } catch {
      alert("Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 max-w-[1440px] mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Pending", count: stats.pending, icon: Clock, color: "#f13a2c" },
            { label: "Confirmed", count: stats.confirmed, icon: CheckCircle2, color: "#03904a" },
            { label: "Completed", count: stats.completed, icon: CheckCircle2, color: "#03904a" },
            { label: "Cancelled", count: stats.cancelled, icon: XCircle, color: "#666666" },
          ].map(({ label, count, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-canvas-elevated border border-hairline rounded-lg p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + "15" }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div>
                <p className="text-2xl font-light text-text-primary">{count}</p>
                <p className="text-xs text-text-muted tracking-wide uppercase">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-canvas border border-hairline text-text-primary px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-text-muted"
            />
          </div>
          <div className="flex gap-2">
            {[
              { value: "all", label: "All" },
              { value: "pending", label: "Pending" },
              { value: "confirmed", label: "Confirmed" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className="px-4 py-3 text-xs font-medium tracking-widest uppercase rounded border transition-colors duration-200"
                style={{
                  backgroundColor: filter === value ? "var(--color-primary)" : "transparent",
                  borderColor: filter === value ? "var(--color-primary)" : "var(--color-hairline)",
                  color: filter === value ? "white" : "var(--color-text-secondary)",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={onRefresh}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium tracking-widest uppercase rounded border border-hairline text-text-secondary hover:border-primary hover:text-primary transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${updating ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Table */}
        <div className="bg-canvas-elevated border border-hairline rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-text-muted">
              <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-sm">Loading appointments...</p>
            </div>
          ) : error ? (
            <div className="p-16 text-center text-warning">
              <p className="text-sm">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center text-text-muted">
              <p className="text-sm">No appointments found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="py-4 px-4 text-left text-xs tracking-widest uppercase text-text-muted font-medium">Date</th>
                    <th className="py-4 px-4 text-left text-xs tracking-widest uppercase text-text-muted font-medium">Name</th>
                    <th className="py-4 px-4 text-left text-xs tracking-widest uppercase text-text-muted font-medium">Service</th>
                    <th className="py-4 px-4 text-left text-xs tracking-widest uppercase text-text-muted font-medium">Status</th>
                    <th className="py-4 pl-4 text-right text-xs tracking-widest uppercase text-text-muted font-medium">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a) => (
                    <AppointmentRow
                      key={a.id}
                      appointment={a}
                      expanded={expandedId === a.id}
                      onToggle={() => setExpandedId(expandedId === a.id ? null : a.id)}
                      onStatusChange={(s) => handleStatusChange(a.id, s)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
