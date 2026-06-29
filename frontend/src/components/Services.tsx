import { Check, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

interface ChecklistItem {
  label: string;
  sub?: string;
}

interface Tier {
  num: string;
  title: React.ReactNode;
  description: string;
  count: number;
  items: ChecklistItem[];
}

const tiers: Tier[] = [
  {
    num: "01",
    title: (
      <>
        Express
        <br />
        Wash
      </>
    ),
    description:
      "A fast, thorough refresh inside and out for when you're short on time but still want it clean.",
    count: 8,
    items: [
      { label: "Foam wash" },
      { label: "Vacuum" },
      { label: "Tires cleaned & dressed" },
      { label: "Wheels / rims cleaned" },
      { label: "Wheel wells cleaned" },
      { label: "Exterior / interior glass" },
      { label: "Clean dashboard" },
      { label: "Clean cup holders" },
    ],
  },
  {
    num: "02",
    title: (
      <>
        Exterior
        <br />
        Detail
      </>
    ),
    description:
      "Hand-washed, decontaminated and refined to a clean, reflective finish — paint, glass, trim and wheels.",
    count: 7,
    items: [
      { label: "Hand wash & dry" },
      { label: "Clean door jambs" },
      { label: "Clean outside windows" },
      { label: "Clean rims & shine tires" },
      { label: "Shine plastics, trim & wheel wells" },
      { label: "Engine detail" },
      {
        label: "Buff entire vehicle",
        sub: "Removes light scratches & swirls — single-stage compound",
      },
    ],
  },
  {
    num: "03",
    title: (
      <>
        Interior
        <br />
        Detail
      </>
    ),
    description:
      "A deep reset for everything inside — fabrics, leather, glass and every hidden crevice restored and refreshed.",
    count: 11,
    items: [
      { label: "Vacuum interior & trunk" },
      { label: "Clean inside windows" },
      { label: "Shampoo carpets & seats" },
      { label: "Spot clean headliner" },
      { label: "Deep cleaning", sub: "Vents, cup holders, door panels & more" },
      { label: "Clean & condition leather, vinyl & plastics" },
      { label: "Steam cleaning" },
      { label: "Scrub treated stains" },
      { label: "Full headliner cleaning" },
      { label: "Shampoo carpets & seats — twice over" },
      { label: "Compressed-air blowout", sub: "Cracks & crevices" },
    ],
  },
  {
    num: "04",
    title: (
      <>
        Machine
        <br />
        Wax
      </>
    ),
    description:
      "Foam, dry and a hand-applied cream wax for lasting depth, shine and protection.",
    count: 6,
    items: [
      { label: "Foam wash" },
      { label: "Air blow dry" },
      { label: "Hand-applied cream wax" },
      { label: "Wheel wells & tires cleaned / dressed" },
      { label: "Rims cleaned" },
      { label: "Exterior glass cleaned" },
    ],
  },
];

function TierBlock({ tier, index }: { tier: Tier; index: number }) {
  const reversed = index % 2 === 1;
  const { ref, inView } = useInView<HTMLDivElement>(0.12);

  return (
    <div ref={ref} className="relative overflow-hidden tier-texture border-t border-hairline">
      {/* Giant watermark number */}
      <span
        className={`watermark pointer-events-none absolute top-1/2 -translate-y-1/2 text-[13rem] md:text-[22rem] lg:text-[28rem] ${
          reversed ? "left-0 -translate-x-[15%]" : "right-0 translate-x-[15%]"
        }`}
      >
        {tier.num}
      </span>

      <div className="relative z-10 max-w-container mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Intro */}
          <div
            className={`lg:sticky lg:top-28 ${reversed ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="font-display text-sm font-bold tracking-[0.3em] gold uppercase">
              Tier {tier.num}
            </div>
            <h3 className="chrome text-4xl md:text-5xl lg:text-6xl font-extrabold mt-4 mb-5">
              {tier.title}
            </h3>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-md">
              {tier.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-text-muted">
                <b className="text-text-primary font-semibold">{tier.count}</b>
                services included
              </span>
              <a
                href="#booking"
                className="group inline-flex items-center gap-2 text-sm font-display font-semibold text-gold hover:text-text-primary transition-colors duration-200"
              >
                Book this detail
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Checklist */}
          <ul
            className={`flex flex-col gap-3.5 ${reversed ? "lg:order-1" : "lg:order-2"}`}
          >
            {tier.items.map((item, i) => (
              <li
                key={item.label}
                style={{ transitionDelay: `${Math.min(i * 60, 480)}ms` }}
                className={`
                  glass rounded-2xl px-5 py-4 flex items-center gap-4
                  shadow-[0_18px_40px_-28px_rgba(0,0,0,0.8)]
                  transition-all duration-700 ease-out
                  ${
                    inView
                      ? "opacity-100 translate-x-0"
                      : `opacity-0 ${reversed ? "translate-x-10" : "-translate-x-10"}`
                  }
                `}
              >
                <span className="shrink-0 w-[30px] h-[30px] rounded-full grid place-items-center border border-gold/45 bg-[radial-gradient(circle_at_30%_25%,rgba(220,196,134,0.30),rgba(200,162,76,0.12))]">
                  <Check className="w-[15px] h-[15px] text-gold" strokeWidth={2.5} />
                </span>
                <span className="flex flex-col">
                  <span className="text-text-primary font-medium leading-snug">
                    {item.label}
                  </span>
                  {item.sub && (
                    <span className="text-text-secondary text-[0.82rem] leading-snug mt-0.5">
                      {item.sub}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden">
      {/* Intro */}
      <div className="max-w-container mx-auto px-6 pt-24 md:pt-32 pb-2 text-center">
        <span className="eyebrow">Our Services</span>
        <h2 className="chrome text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-5">
          Four tiers of care
        </h2>
        <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          From a quick refresh to a full interior reset and a hand-applied wax —
          pick the level of detail your vehicle deserves.
        </p>
        <div className="gold-rule w-full max-w-container mx-auto mt-14" />
      </div>

      {tiers.map((tier, index) => (
        <TierBlock key={tier.num} tier={tier} index={index} />
      ))}
    </section>
  );
}
