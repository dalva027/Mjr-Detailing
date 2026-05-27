import { Shield, Gift, ArrowRight } from "lucide-react";

const AFFILIATE_LINK =
  "https://ripclean.com/?sca_ref=10473013.pqweH2gGj1&sca_source=https%253A%252F%252Fwww.instagram.com%252Fjuni0r_blendz00%253Figsh%253DbDhoajZhZm9pZWdu&utm_source=qr&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnwkrNUIGWBtmWr9sagRaCiodOIh0oKunhr6XRFJZhG8_J1q5Zc8kzg-_n9kU_aem_Pqzt3xK7UuC2U83OJEwU6Q";

export function RipCleanPartner() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-container mx-auto px-6">
        <div className="bg-canvas-elevated border border-hairline overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image side */}
            <div className="relative flex items-center justify-center p-6 md:p-16 bg-[#0f0f0f]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <img
                src="/partner_off.webp"
                alt="Blending with Junior — Official RipClean Partner"
                className="relative w-full max-w-sm object-contain drop-shadow-lg"
              />
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-center p-10 md:p-16 gap-8">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-xs tracking-[0.2em] uppercase font-medium text-primary">
                    Official Partner
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-text-primary">
                  Powered by{" "}
                  <span className="text-primary"> RIPCLEAN</span>
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-text-secondary max-w-md">
                  As an official <span className="font-bold">RIPCLEAN</span> partner, we use their professional-grade
                  paint correction and detailing products to deliver showroom-quality
                  results on every vehicle.
                </p>
              </div>

              {/* Discount badge */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-3 bg-primary/10 border border-primary/30 px-5 py-3">
                  <Gift className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-text-primary">
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
                  className="
                    inline-flex items-center gap-2
                    text-sm tracking-widest uppercase
                    text-primary hover:text-text-primary
                    transition-colors duration-200
                    border-b border-primary/50 hover:border-text-primary
                    pb-0.5
                  "
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
