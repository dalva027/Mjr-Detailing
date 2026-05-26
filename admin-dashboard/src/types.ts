export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  notes: string;
  date: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
  updatedAt: string;
}

export const SERVICE_LABELS: Record<string, string> = {
  "exterior-wash-wax": "Exterior Wash & Wax/Sealant",
  "mobile-service": "Mobile Service",
  "stain-removal": "Stain Removal",
  "ceramic-coating": "Ceramic Coating",
  other: "Other",
};

export const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending: { bg: "#1e1e1e", text: "#f13a2c" },
  confirmed: { bg: "#032a12", text: "#03904a" },
  cancelled: { bg: "#1e1e1e", text: "#666666" },
  completed: { bg: "#032a12", text: "#03904a" },
};
