import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  /** Selected day as "YYYY-MM-DD", or "" when nothing is chosen. */
  value: string;
  onChange: (value: string) => void;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const pad = (n: number) => String(n).padStart(2, "0");
// Build a "YYYY-MM-DD" key from calendar components directly — never via
// toISOString(), which would shift the day across timezones.
const toKey = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

export function Calendar({ value, onChange }: CalendarProps) {
  const now = new Date();
  const todayKey = toKey(now.getFullYear(), now.getMonth(), now.getDate());

  // Start the view on the selected month, falling back to the current month.
  const [view, setView] = useState(() => {
    if (value) {
      const [y, m] = value.split("-");
      return { year: Number(y), month: Number(m) - 1 };
    }
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const firstWeekday = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const atCurrentMonth =
    view.year === now.getFullYear() && view.month === now.getMonth();

  const prevMonth = () => {
    if (atCurrentMonth) return;
    setView((v) =>
      v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 }
    );
  };
  const nextMonth = () =>
    setView((v) =>
      v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 }
    );

  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          disabled={atCurrentMonth}
          aria-label="Previous month"
          className="w-9 h-9 grid place-items-center rounded-full border border-hairline text-text-secondary hover:text-text-primary hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-hairline"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="font-display font-semibold text-text-primary">
          {MONTHS[view.month]} {view.year}
        </div>
        <button
          type="button"
          onClick={nextMonth}
          aria-label="Next month"
          className="w-9 h-9 grid place-items-center rounded-full border border-hairline text-text-secondary hover:text-text-primary hover:border-primary transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="text-center text-[0.7rem] font-medium tracking-wider uppercase text-text-muted py-1"
          >
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`pad-${i}`} />;
          const key = toKey(view.year, view.month, day);
          const isPast = key < todayKey;
          const isSelected = key === value;
          const isToday = key === todayKey;

          const cls = isPast
            ? "text-text-muted/40 cursor-not-allowed"
            : isSelected
              ? "bg-gradient-to-b from-gold-soft to-gold text-[#171205] font-semibold shadow-[0_6px_18px_-8px_rgba(200,162,76,0.7)]"
              : isToday
                ? "border border-gold/40 text-text-primary hover:bg-white/[0.06]"
                : "text-text-secondary hover:bg-white/[0.06] hover:text-text-primary";

          return (
            <button
              key={key}
              type="button"
              disabled={isPast}
              onClick={() => onChange(key)}
              className={`aspect-square rounded-lg text-sm flex items-center justify-center transition-colors duration-150 ${cls}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
