import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="Blending with Junior - Professional Auto Detailing"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/60 to-canvas/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-container mx-auto px-6 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col gap-8 items-center">
          {/* Logo - large and centered */}
          <div className="flex justify-center">
            <img
              src="/logo.png"
              alt="Blending with Junior"
              className="w-72 md:w-[380px] lg:w-[480px]"
            />
          </div>

          <span className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-6 block">
            Professional Auto Detailing
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.05] text-text-primary mb-6">
            Where Precision
            <br />
            Meets Perfection
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-lg leading-relaxed mb-10 text-center">
            Blending with Junior delivers showroom-quality detailing
            that transforms your vehicle. From ceramic coating to
            mobile service, we bring the craft to you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#booking">
              <Button size="lg">Book Appointment</Button>
            </a>
            <a href="#services">
              <Button variant="outline" size="lg">View Services</Button>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-8 mt-16 pt-8 border-t border-hairline/50">
            <div className="flex flex-col">
              <span className="text-2xl font-light text-text-primary">5.0</span>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-primary fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-text-muted mt-1">Rating</span>
            </div>
            <div className="w-px h-10 bg-hairline" />
            <div className="flex flex-col">
              <span className="text-2xl font-light text-text-primary">All-Round</span>
              <span className="text-xs text-text-muted mt-1">Services</span>
            </div>
            <div className="w-px h-10 bg-hairline" />
            <div className="flex flex-col">
              <span className="text-2xl font-light text-text-primary">Mobile</span>
              <span className="text-xs text-text-muted mt-1">Service</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
