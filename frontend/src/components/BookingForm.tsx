import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Calendar } from "@/components/ui/Calendar";
import { CheckCircle, Clock, Loader2 } from "lucide-react";
import { createAppointment } from "@/api";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm" (24h)
  notes: string;
}

const services = [
  { value: "interior-detail", label: "Interior Detail" },
  { value: "exterior-detail", label: "Exterior Detail" },
  { value: "express-wash", label: "Express Wash" },
  { value: "machine-wax", label: "Machine Wax" },
  { value: "other", label: "Other" },
];

// Bookable time slots — business hours in 30-minute increments.
// Adjust OPEN_HOUR / CLOSE_HOUR / SLOT_MINUTES to change availability.
const OPEN_HOUR = 8; // first slot at 8:00 AM
const CLOSE_HOUR = 18; // slots stop before 6:00 PM
const SLOT_MINUTES = 30;

const pad = (n: number) => String(n).padStart(2, "0");
const todayKey = () => {
  const n = new Date();
  return `${n.getFullYear()}-${pad(n.getMonth() + 1)}-${pad(n.getDate())}`;
};

const timeSlots: { value: string; label: string }[] = [];
for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
  for (let m = 0; m < 60; m += SLOT_MINUTES) {
    timeSlots.push({
      value: `${pad(h)}:${pad(m)}`,
      label: new Date(2000, 0, 1, h, m).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    });
  }
}

export function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // A slot is unavailable if it's already passed on today's date.
  const isSlotPast = (slotValue: string): boolean => {
    if (!formData.date || formData.date !== todayKey()) return false;
    const [h, m] = slotValue.split(":").map(Number);
    const now = new Date();
    return h < now.getHours() || (h === now.getHours() && m <= now.getMinutes());
  };

  const handleDateChange = (date: string) => {
    setFormData((prev) => {
      // Clear a previously chosen time if it's no longer valid for the new date.
      const clearTime =
        prev.time && date === todayKey() && isSlotPast(prev.time) ? "" : prev.time;
      return { ...prev, date, time: clearTime };
    });
    setErrors((prev) => ({ ...prev, date: undefined }));
  };

  const handleTimeChange = (time: string) => {
    setFormData((prev) => ({ ...prev, time }));
    setErrors((prev) => ({ ...prev, time: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (formData.phone.replace(/\D/g, "").length < 10) newErrors.phone = "Phone must be at least 10 digits";
    if (!formData.service) newErrors.service = "Select a service";
    if (!formData.date) newErrors.date = "Select a date";
    if (!formData.time) newErrors.time = "Select a time";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await createAppointment({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        // Pin the chosen wall-clock day + time to UTC so it's preserved exactly
        // end-to-end (DB, admin, SMS) without timezone shifts. Everything reads
        // this value back in UTC.
        date: `${formData.date}T${formData.time}:00.000Z`,
        notes: formData.notes,
      });

      setSubmitted(true);
    } catch (err) {
      setErrors({ date: err instanceof Error ? err.message : "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    const when = new Date(
      `${formData.date}T${formData.time}:00.000Z`
    ).toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    });

    return (
      <section id="booking" className="py-24 md:py-32">
        <div className="max-w-container mx-auto px-6">
          <div className="max-w-lg mx-auto text-center py-20">
            <div className="w-16 h-16 mx-auto mb-8 bg-success/10 border border-success/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-3xl font-light text-text-primary mb-4">
              Booking Received
            </h2>
            <p className="text-text-secondary mb-8">
              Thank you, {formData.name}. Your appointment is requested for{" "}
              <span className="text-text-primary font-medium">{when}</span>. We
              will text you at {formData.phone} to confirm.
            </p>
            <Button onClick={() => setSubmitted(false)}>Book Another</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="relative overflow-hidden py-24 md:py-32 bg-canvas-2 border-t border-hairline">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 20%, rgba(200,162,76,0.12), transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <SectionHeading
            tag="Schedule Your Detail"
            title="Book an Appointment"
            subtitle="Fill out the form below and we will confirm your booking via phone call."
            centered
          />

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                error={errors.name}
                disabled={loading}
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                error={errors.email}
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(210) 555-0100"
                required
                error={errors.phone}
                disabled={loading}
              />
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="service"
                  className="text-xs tracking-widest uppercase text-text-secondary"
                >
                  Service <span className="text-primary ml-1">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  disabled={loading}
                  className={`
                    bg-canvas border rounded-xl text-text-primary px-4 py-3 text-sm
                    transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-primary/40
                    ${
                      errors.service
                        ? "border-warning focus:border-warning"
                        : "border-hairline focus:border-primary"
                    }
                    ${loading ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span className="text-xs text-warning">{errors.service}</span>
                )}
              </div>
            </div>

            {/* Date & time */}
            <div className="flex flex-col gap-3">
              <label className="text-xs tracking-widest uppercase text-text-secondary">
                Preferred Date &amp; Time <span className="text-primary ml-1">*</span>
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Calendar value={formData.date} onChange={handleDateChange} />
                  {errors.date && (
                    <span className="mt-2 block text-xs text-warning">{errors.date}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-text-muted mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    {formData.date ? "Select a time" : "Pick a date first"}
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2 overflow-y-auto pr-1 max-h-[300px]">
                    {timeSlots.map((slot) => {
                      const disabled = loading || !formData.date || isSlotPast(slot.value);
                      const selected = formData.time === slot.value;
                      const cls = disabled
                        ? "border-hairline text-text-muted/40 cursor-not-allowed"
                        : selected
                          ? "bg-gradient-to-b from-gold-soft to-gold text-[#171205] border-transparent font-semibold shadow-[0_6px_18px_-8px_rgba(200,162,76,0.7)]"
                          : "border-hairline text-text-secondary hover:border-primary hover:text-text-primary";
                      return (
                        <button
                          type="button"
                          key={slot.value}
                          disabled={disabled}
                          onClick={() => handleTimeChange(slot.value)}
                          className={`rounded-xl border py-2.5 text-sm text-center transition-colors duration-150 ${cls}`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                  {errors.time && (
                    <span className="mt-2 block text-xs text-warning">{errors.time}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="notes"
                className="text-xs tracking-widest uppercase text-text-secondary"
              >
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Vehicle type, special requests, etc."
                rows={4}
                disabled={loading}
                className="bg-canvas border border-hairline rounded-xl text-text-primary px-4 py-3 text-sm transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary resize-none"
              />
            </div>

            <Button type="submit" size="lg" fullWidth disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Booking...
                </span>
              ) : (
                "Confirm Booking"
              )}
            </Button>

            <p className="text-xs text-text-muted text-center">
              We will text you at the provided number to confirm your appointment.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
