import { Phone, Mail, Instagram, Youtube, DollarSign, Banknote } from "lucide-react";

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

          {/* Social & Payment Icons */}
          <div className="flex items-center gap-6">
            <a
              href="tel:+12109921268"
              className="text-text-secondary hover:text-primary transition-colors duration-200"
              aria-label="Phone"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="mailto:junior.blendz00@gmail.com"
              className="text-text-secondary hover:text-primary transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/juni0r_blendz00/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/@blendingwithjunior"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors duration-200"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <div className="flex flex-col items-center gap-0.5">
              <a
                href="tel:+12109921268"
                className="text-text-secondary hover:text-primary transition-colors duration-200"
                aria-label="Zelle"
              >
                <DollarSign className="w-5 h-5" />
              </a>
              <span className="text-[10px] text-text-muted leading-none">
                Zelle
              </span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <a
                href="https://cash.app/$JuniorBlendz00"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors duration-200"
                aria-label="Cash App"
              >
                <Banknote className="w-5 h-5" />
              </a>
              <span className="text-[10px] text-text-muted leading-none">
                Cashapp
              </span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-text-muted">
            {new Date().getFullYear()} Blending with Junior. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
