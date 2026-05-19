import { Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const contactItems = [
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Call or Text",
    value: "(210) 992-1268",
    href: "tel:+12109921268",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Service Area",
    value: "San Antonio, TX",
    href: null,
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Hours",
    value: "Mon - Sun: 7AM - 7PM",
    href: null,
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    label: "Text Us",
    value: "(210) 992-1268",
    href: "sms:+12109921268",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-container mx-auto px-6">
        <SectionHeading
          tag="Get in Touch"
          title="Contact Us"
          subtitle="Ready to transform your vehicle? Reach out by phone, text, or stop by for a consultation."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline max-w-3xl mx-auto">
          {contactItems.map((item) => (
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                className="
                  bg-canvas p-8 flex flex-col items-center gap-4 group
                  hover:bg-canvas-elevated transition-colors duration-300
                  text-center no-underline
                "
              >
                <div className="
                  w-12 h-12 border border-hairline flex items-center justify-center
                  text-text-secondary group-hover:text-primary group-hover:border-primary
                  transition-colors duration-300
                ">
                  {item.icon}
                </div>
                <span className="text-xs tracking-widest uppercase text-text-muted">
                  {item.label}
                </span>
                <span className="text-sm text-text-primary font-medium">
                  {item.value}
                </span>
              </a>
            ) : (
              <div
                key={item.label}
                className="
                  bg-canvas p-8 flex flex-col items-center gap-4
                  hover:bg-canvas-elevated transition-colors duration-300
                  text-center
                "
              >
                <div className="
                  w-12 h-12 border border-hairline flex items-center justify-center
                  text-text-secondary
                ">
                  {item.icon}
                </div>
                <span className="text-xs tracking-widest uppercase text-text-muted">
                  {item.label}
                </span>
                <span className="text-sm text-text-primary font-medium">
                  {item.value}
                </span>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}