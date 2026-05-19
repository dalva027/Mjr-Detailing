import { Car, Truck, Sparkles, Shield } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  id: string;
}

const services: Service[] = [
  {
    icon: <Car className="w-6 h-6" />,
    title: "Exterior Wash & Wax",
    description:
      "Hand wash with premium products followed by a protective wax or sealant layer. Leaves your finish with a deep, lasting shine that repels dirt and water.",
    id: "exterior-wash-wax",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Mobile Service",
    description:
      "We come to you. Whether at home or the office, our mobile detailing brings professional-grade equipment and products for a showroom-quality result.",
    id: "mobile-service",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Stain Removal",
    description:
      "Expert interior and exterior stain treatment. We tackle tough spots on paint, glass, and upholstery to restore clarity and cleanliness.",
    id: "stain-removal",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Ceramic Coating",
    description:
      "Long-lasting ceramic protection that bonds to your paint for years. Provides superior gloss, hydrophobic properties, and UV resistance.",
    id: "ceramic-coating",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="max-w-container mx-auto px-6">
        <SectionHeading
          tag="What We Offer"
          title="Our Services"
          subtitle="From routine maintenance to long-term protection, every detail is handled with precision and care."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`
                bg-canvas p-8 md:p-10 flex flex-col gap-6 group
                hover:bg-canvas-elevated transition-colors duration-300
                ${index === 0 ? "md:rounded-tl-none" : ""}
                ${index === services.length - 1 ? "md:rounded-tr-none" : ""}
              `}
            >
              <div className="w-12 h-12 bg-canvas-elevated border border-hairline flex items-center justify-center text-primary group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-light text-text-primary">
                {service.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed flex-1">
                {service.description}
              </p>
              <a
                href="#booking"
                className="text-xs tracking-widest uppercase text-primary hover:text-text-primary transition-colors duration-200 inline-flex items-center gap-2 mt-auto"
              >
                Book Now
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
