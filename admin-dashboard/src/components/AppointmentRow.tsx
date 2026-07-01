import {
  Calendar,
  Mail,
  Phone,
  Wrench,
  ChevronDown,
  ChevronUp,
  FileText,
  Trash2,
} from "lucide-react";
import type { Appointment } from "@/types";
import { SERVICE_LABELS, STATUS_COLORS } from "@/types";

interface AppointmentRowProps {
  appointment: Appointment;
  expanded: boolean;
  busy: boolean;
  onToggle: () => void;
  onStatusChange: (status: Appointment["status"]) => void;
  onDelete: () => void;
}

export function AppointmentRow({
  appointment,
  expanded,
  busy,
  onToggle,
  onStatusChange,
  onDelete,
}: AppointmentRowProps) {
  const serviceLabel = SERVICE_LABELS[appointment.service] || appointment.service;
  const statusColors = STATUS_COLORS[appointment.status] || STATUS_COLORS.pending;

  // Appointments are date-only and stored at UTC midnight. Format in UTC so the
  // calendar day matches what the customer picked (and the SMS confirmation),
  // instead of shifting a day earlier in the admin's local timezone.
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  // Match formatDate: the appointment time is a business-local wall-clock stored
  // at that clock time in UTC, so read it back in UTC to show the booked slot.
  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    });
  };

  const nextStatuses: Appointment["status"][] =
    appointment.status === "pending"
      ? ["confirmed", "cancelled"]
      : appointment.status === "confirmed"
        ? ["completed"]
        : [];

  return (
    <>
      <tr
        className="border-b border-hairline hover:bg-canvas-elevated/50 cursor-pointer transition-colors"
        onClick={onToggle}
      >
        <td className="py-4 pr-4 text-sm text-text-primary font-medium">
          {formatDate(appointment.date)}
          <span className="ml-2 text-xs text-text-muted">
            {formatTime(appointment.date)}
          </span>
        </td>
        <td className="py-4 px-4 text-sm text-text-primary">{appointment.name}</td>
        <td className="py-4 px-4 text-sm text-text-secondary">{serviceLabel}</td>
        <td className="py-4 px-4">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase"
            style={{
              backgroundColor: statusColors.bg,
              color: statusColors.text,
              border: `1px solid ${statusColors.text}33`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: statusColors.text }}
            />
            {appointment.status}
          </span>
        </td>
        <td className="py-4 pl-4 text-right">
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-text-muted inline" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-muted inline" />
          )}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={5} className="py-4 px-8 bg-canvas-elevated/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-text-muted flex-shrink-0" />
                  <span className="text-text-secondary">{appointment.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-text-muted flex-shrink-0" />
                  <span className="text-text-secondary">{appointment.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Wrench className="w-4 h-4 text-text-muted flex-shrink-0" />
                  <span className="text-text-secondary">{serviceLabel}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-text-muted flex-shrink-0" />
                  <span className="text-text-secondary">
                    Booked: {}
                    {new Date(appointment.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3 text-sm">
                  <FileText className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-xs tracking-widest uppercase text-text-muted block mb-1">Notes</span>
                    <span className="text-text-secondary whitespace-pre-wrap">{appointment.notes?.trim() ? appointment.notes : "No notes provided."}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs tracking-widest uppercase text-text-secondary">
                    Update Status
                  </span>
                  <div className="flex gap-2 mt-2">
                    {nextStatuses.map((s) => (
                      <button
                        key={s}
                        onClick={(e) => {
                          e.stopPropagation();
                          onStatusChange(s);
                        }}
                        className="inline-flex items-center px-4 py-2 text-xs font-medium tracking-widest uppercase rounded border transition-colors duration-200"
                        style={{
                          borderColor: statusColors.text + "33",
                          color: statusColors.text,
                          backgroundColor: statusColors.text + "10",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = statusColors.text + "20";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = statusColors.text + "10";
                        }}
                      >
                        Mark as {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-hairline flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                disabled={busy}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-widest uppercase rounded border border-warning/40 text-warning hover:bg-warning/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {busy ? "Deleting…" : "Delete"}
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
