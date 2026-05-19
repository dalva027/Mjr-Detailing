import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Book Now", href: "#booking" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-canvas/95 backdrop-blur-md border-b border-hairline"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 text-text-primary no-underline"
        >
          <div className="w-9 h-9 bg-primary flex items-center justify-center">
            <span className="text-white font-light text-lg">J</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm tracking-widest uppercase font-medium leading-tight">
              Blending with
            </span>
            <span className="text-xs text-text-secondary tracking-wide leading-tight">
              Junior
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+12109921268"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-text-secondary hover:text-primary transition-colors duration-200"
          >
            <Phone className="w-3.5 h-3.5" />
            (210) 992-1268
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-primary p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-canvas border-b border-hairline">
          <div className="px-6 py-6 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+12109921268"
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              <Phone className="w-4 h-4" />
              (210) 992-1268
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
