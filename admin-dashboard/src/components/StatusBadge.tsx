import { STATUS_COLORS } from "@/types";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.pending;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.text}33`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: colors.text }}
      />
      {status}
    </span>
  );
}
