"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Deals", href: "/deals" },
    { name: "View Menu", href: "/menu" },
    { name: "Our Story", href: "/about" },
  ];

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300
        ${isScrolled ? "h-16 shadow-md bg-gray-50/90" : "h-20 bg-white"}
      `}>
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-12">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4">
            <div className="relative h-16 w-48 sm:w-56">
              <Image
                src="/logo.png"
                alt="Zee Food"
                fill
                className="object-contain h-full w-full object-center"
                priority
                unoptimized
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`border-0 outline-none ring-0 no-underline before:hidden after:hidden hover:no-underline focus:border-0 focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 ${pathname === link.href ? "text-brand-primary font-semibold" : "font-medium text-brand-dark"} hover:text-brand-primary transition-colors duration-300 tracking-[0.1em]`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/order"
              className="inline-flex items-center justify-center rounded-[18px] bg-brand-primary px-8 py-3 text-white font-medium no-underline hover:no-underline transition-all duration-300 hover:bg-brand-primary/90 hover:shadow-[0_10px_25px_rgba(248,114,5,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-[18px] text-brand-dark transition-all duration-300 hover:bg-brand-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
          >
            <span className="flex w-6 flex-col gap-1.5" aria-hidden="true">
              <span className={`h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-full rounded-full bg-current transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`
        fixed inset-0 z-[110] lg:hidden transition-all duration-300
        ${isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"}
      `}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`
          absolute right-0 top-0 bottom-0 flex w-[min(84%,24rem)] flex-col rounded-l-[30px] bg-white p-6 shadow-[-18px_0_50px_rgba(18,18,18,0.12)] transition-transform duration-500 sm:p-8
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}>
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-10">
            <span className="text-[25px] font-black text-[#e63946] tracking-[0.2em] uppercase">MENU</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-[18px] bg-gray-100 text-gray-500 transition-all duration-300 hover:bg-brand-primary/10 hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
            >
              <span className="relative h-5 w-5" aria-hidden="true">
                <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rotate-45 rounded-full bg-current" />
                <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 -rotate-45 rounded-full bg-current" />
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-xl border-0 outline-none ring-0 no-underline before:hidden after:hidden hover:no-underline focus:border-0 focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 ${pathname === link.href ? "font-black text-brand-primary" : "font-medium text-brand-dark"} transition-colors duration-300 tracking-[0.1em] hover:text-brand-primary`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-gray-50/50">
            <Link
              href="/order"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-[18px] bg-brand-primary px-8 py-3 text-center text-white font-medium no-underline hover:no-underline transition-all duration-300 hover:bg-brand-primary/90 hover:shadow-[0_10px_25px_rgba(248,114,5,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2"
            >
              Order Now
            </Link>

            <div className="mt-8 flex flex-col items-center gap-3">
              <span className="text-[9px] font-black text-gray-400 tracking-[0.4em] uppercase">Handcrafted By</span>
              <a
                href="https://www.devsinntechnologies.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-32 h-8 hover:scale-105 transition-transform"
              >
                <Image src="/devsinn.png" alt="Dev's Inn" fill className="object-contain" unoptimized />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
