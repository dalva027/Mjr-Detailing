import { Shield, Gift, ArrowRight } from "lucide-react";

const AFFILIATE_LINK =
  "https://ripclean.com/?sca_ref=10473013.pqweH2gGj1&sca_source=https%253A%252F%252Fwww.instagram.com%252Fjuni0r_blendz00%253Figsh%253DbDhoajZhZm9pZWdu&utm_source=qr&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnwkrNUIGWBtmWr9sagRaCiodOIh0oKunhr6XRFJZhG8_J1q5Zc8kzg-_n9kU_aem_Pqzt3xK7UuC2U83OJEwU6Q";

export function RipCleanPartner() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-container mx-auto px-6">
        <div className="glass rounded-3xl overflow-hidden shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image side */}
            <div className="relative flex items-center justify-center p-6 md:p-16 bg-canvas">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(70% 70% at 50% 50%, rgba(200,162,76,0.10), transparent 70%)",
                }}
              />
              <img
                src="/partner_off.webp"
                alt="Blending with Junior — Official RipClean Partner"
                className="relative w-full max-w-sm object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              />
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-center p-10 md:p-16 gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gold" />
                  <span className="eyebrow !text-[0.72rem]">Official Partner</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="chrome">Powered by </span>
                  <span className="gold">RIPCLEAN</span>
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-text-secondary max-w-md">
                  As an official <span className="font-semibold text-text-primary">RIPCLEAN</span>{" "}
                  partner, we use their professional-grade paint correction and
                  detailing products to deliver showroom-quality results on every
                  vehicle.
                </p>
              </div>

              {/* Discount badge */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-3 bg-gold/10 border border-gold/30 rounded-xl px-5 py-3">
                  <Gift className="w-5 h-5 text-gold shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-text-primary">
                      10% Off Your Order
                    </span>
                    <span className="block text-xs text-text-secondary">
                      Exclusive partner discount
                    </span>
                  </div>
                </div>

                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-display font-semibold text-gold hover:text-text-primary transition-colors duration-200 border-b border-gold/50 hover:border-text-primary pb-0.5"
                >
                  Shop RipClean
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
