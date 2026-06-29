import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled || mobileOpen
          ? "bg-[rgba(8,8,9,0.82)] backdrop-blur-[14px] border-hairline"
          : "bg-transparent border-transparent"
      }`}>
      <div className="max-w-container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="no-underline flex flex-col leading-none shrink-0">
          <span className="chrome font-display font-extrabold tracking-[0.04em] text-sm md:text-base">
            BLENDING WITH JUNIOR
          </span>
          <span className="text-[0.5rem] md:text-[0.55rem] font-medium tracking-[0.3em] text-text-muted mt-1.5">
            PROFESSIONAL AUTO DETAILING
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-display text-[0.82rem] font-medium tracking-[0.08em] text-text-secondary hover:text-text-primary transition-colors duration-200">
              {link.label}
            </a>
          ))}
          <a
            href="tel:+12109921268"
            className="font-display inline-flex items-center gap-2 text-[0.9rem] font-semibold text-text-primary hover:text-gold transition-colors duration-200">
            <Phone className="w-4 h-4" />
            (210) 992-1268
          </a>
          <a href="#booking" className="btn btn-gold !text-[0.88rem] !py-2.5 !px-5">
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-primary p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[rgba(8,8,9,0.95)] border-b border-hairline">
          <div className="px-6 py-6 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-display text-sm font-medium tracking-[0.08em] text-text-secondary hover:text-text-primary transition-colors duration-200"
                onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
            <a
              href="tel:+12109921268"
              className="font-display inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-gold transition-colors duration-200"
              onClick={() => setMobileOpen(false)}>
              <Phone className="w-4 h-4" />
              (210) 992-1268
            </a>
            <a
              href="#booking"
              className="btn btn-gold self-start"
              onClick={() => setMobileOpen(false)}>
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
