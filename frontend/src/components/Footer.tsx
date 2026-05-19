import { Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-hairline py-16">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <span className="text-white font-light text-base">J</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs tracking-widest uppercase text-text-secondary leading-tight">
                Blending with
              </span>
              <span className="text-xs text-text-muted leading-tight">
                Junior
              </span>
            </div>
          </div>

          {/* Contact */}
          <a
            href="tel:+12109921268"
            className="
              flex items-center gap-2 text-sm text-text-secondary
              hover:text-primary transition-colors duration-200
            "
          >
            <Phone className="w-4 h-4" />
            (210) 992-1268
          </a>

          {/* Copyright */}
          <p className="text-xs text-text-muted">
            {new Date().getFullYear()} Blending with Junior. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}