import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CheckCircle, Loader2 } from "lucide-react";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  notes: string;
}

const services = [
  { value: "exterior-wash-wax", label: "Exterior Wash & Wax/Sealant" },
  { value: "mobile-service", label: "Mobile Service" },
  { value: "stain-removal", label: "Stain Removal" },
  { value: "ceramic-coating", label: "Ceramic Coating" },
  { value: "Other", label: "Other" },
];

export function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
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

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (formData.phone.replace(/\D/g, "").length < 10) newErrors.phone = "Phone must be at least 10 digits";
    if (!formData.service) newErrors.service = "Select a service";
    if (!formData.date) newErrors.date = "Select a date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to book");
      }

      setSubmitted(true);
    } catch (err) {
      setErrors({ date: err instanceof Error ? err.message : "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
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
              Thank you, {formData.name}. We will text you at {formData.phone} to confirm your appointment.
            </p>
            <Button onClick={() => setSubmitted(false)}>Book Another</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 md:py-32 bg-canvas-elevated">
      <div className="max-w-container mx-auto px-6">
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
                    bg-canvas border text-text-primary px-4 py-3 text-sm
                    transition-colors duration-200 focus:outline-none focus:ring-1
                    ${
                      errors.service
                        ? "border-warning focus:border-warning"
                        : "border-hairline focus:border-primary"
                    }
                    \${loading ? "opacity-50 cursor-not-allowed" : ""}
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

            <div className="flex flex-col gap-2">
              <label
                htmlFor="date"
                className="text-xs tracking-widest uppercase text-text-secondary"
              >
                Preferred Date <span className="text-primary ml-1">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                disabled={loading}
                className={`
                  bg-canvas border text-text-primary px-4 py-3 text-sm
                  transition-colors duration-200 focus:outline-none focus:ring-1
                  ${
                    errors.date
                      ? "border-warning focus:border-warning"
                      : "border-hairline focus:border-primary"
                  }
                `}
              />
              {errors.date && (
                <span className="text-xs text-warning">{errors.date}</span>
              )}
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
                className="bg-canvas border border-hairline text-text-primary px-4 py-3 text-sm transition-colors duration-200 focus:outline-none focus:ring-1 focus:border-primary resize-none"
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
              We will call you at the provided number to confirm your appointment.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
