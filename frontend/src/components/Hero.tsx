import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Full-screen background video */}
      <div className="absolute inset-0 z-0">
        <video
          src="/car_foam_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Shadow gradients — darken for legibility and blend into the page */}
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/70 to-canvas/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas/85 via-canvas/40 to-transparent" />
        {/* Warm gold glow accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(58% 50% at 78% 28%, rgba(200,162,76,0.16), transparent 70%), radial-gradient(70% 60% at 12% 92%, rgba(120,140,170,0.10), transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-container mx-auto px-6 py-28 md:py-32">
        <div className="flex flex-col gap-7 items-center text-center">
          {/* Logo */}
          <img
            src="/logo.png"
            alt="Blending with Junior"
            className="w-64 md:w-[360px] lg:w-[440px] drop-shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
          />

          <span className="eyebrow">San Antonio, TX · Mobile &amp; Shop</span>

          <h1 className="chrome text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] -mt-1">
            Where Precision
            <br />
            Meets Perfection
          </h1>

          <p className="text-base md:text-lg text-text-secondary max-w-xl leading-relaxed">
            Interior, exterior, express, and machine-wax detailing finished to a
            showroom standard — brought to your driveway across San Antonio.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <a href="#booking">
              <Button size="lg">Book your appointment</Button>
            </a>
            <a href="#services">
              <Button variant="outline" size="lg">
                View Services
              </Button>
            </a>
          </div>

          {/* Rating line */}
          <div className="flex items-center gap-3 text-sm text-text-secondary mt-2">
            <span className="stars text-lg">★★★★★</span>
            <span>
              <b className="text-text-primary font-semibold">5-star rated</b> ·
              trusted across San Antonio
            </span>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-8 mt-10 pt-8 border-t border-hairline/60">
            <div className="flex flex-col items-center">
              <span className="font-display text-2xl font-bold text-text-primary">
                5.0
              </span>
              <span className="text-xs text-text-muted mt-1 tracking-wide">
                Rating
              </span>
            </div>
            <div className="w-px h-10 bg-hairline" />
            <div className="flex flex-col items-center">
              <span className="font-display text-2xl font-bold text-text-primary">
                4 Tiers
              </span>
              <span className="text-xs text-text-muted mt-1 tracking-wide">
                Of Care
              </span>
            </div>
            <div className="w-px h-10 bg-hairline" />
            <div className="flex flex-col items-center">
              <span className="font-display text-2xl font-bold text-text-primary">
                Mobile
              </span>
              <span className="text-xs text-text-muted mt-1 tracking-wide">
                Service
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute left-1/2 -translate-x-1/2 bottom-6 z-10 flex flex-col items-center gap-2 text-[0.66rem] tracking-[0.3em] uppercase text-text-muted"
      >
        <span className="w-[22px] h-[34px] rounded-xl border border-hairline-strong relative">
          <span className="absolute left-1/2 -translate-x-1/2 top-2 w-[3px] h-[7px] rounded bg-gold animate-bounce" />
        </span>
        Scroll
      </a>
    </section>
  );
}
