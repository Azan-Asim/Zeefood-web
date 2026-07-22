"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Deals", href: "/deals" },
  { name: "View Menu", href: "/menu" },
  { name: "Our Story", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hideOrderButton = pathname === "/menu" || pathname === "/order";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-[100] w-full overflow-hidden transition-all duration-300 ${
          isScrolled
            ? "h-16 border-b border-brand-primary/10 bg-white/90 shadow-sm backdrop-blur-md"
            : "h-20 border-b border-brand-primary/10 bg-gradient-to-r from-white via-orange-50/80 to-white"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(248,114,5,0.16),transparent_42%),linear-gradient(125deg,rgba(248,114,5,0.06),transparent_36%,rgba(248,114,5,0.05))]" />
        <div className="relative mx-auto flex h-full max-w-[1320px] items-center px-3 sm:px-6 lg:px-10 2xl:max-w-[1500px]">
          <BrandMark />

          <div className="ml-auto hidden items-center gap-8 lg:flex xl:gap-10">
            {navLinks.map((link) => (
              <NavLink key={link.name} href={link.href} active={pathname === link.href}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {!hideOrderButton && (
            <Link
              href="/order"
              className="ml-auto hidden min-h-11 items-center justify-center rounded-2xl bg-brand-primary px-7 text-sm font-bold text-white no-underline shadow-[0_10px_22px_rgba(248,114,5,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary/90 hover:shadow-[0_14px_28px_rgba(248,114,5,0.28)] lg:inline-flex"
            >
              Order Now
            </Link>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="ml-auto flex h-11 w-11 items-center justify-center rounded-2xl text-brand-dark transition-all duration-300 hover:bg-brand-primary/10 focus:outline-none lg:hidden"
          >
            <span className="flex w-6 flex-col gap-1.5" aria-hidden="true">
              <span className={`h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-full rounded-full bg-current transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[110] transition-all duration-300 lg:hidden ${isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div
          className={`absolute bottom-0 right-0 top-0 flex w-[min(84%,24rem)] flex-col rounded-l-[30px] bg-gradient-to-br from-white via-orange-50/70 to-brand-surface p-6 shadow-[-18px_0_50px_rgba(18,18,18,0.12)] transition-transform duration-500 sm:p-8 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-10 flex items-center justify-between">
            <BrandMark mobile />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/85 text-gray-500 shadow-sm transition-all duration-300 hover:bg-brand-primary/10 hover:text-brand-primary"
            >
              <span className="relative h-5 w-5" aria-hidden="true">
                <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rotate-45 rounded-full bg-current" />
                <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 -rotate-45 rounded-full bg-current" />
              </span>
            </button>
          </div>

          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`rounded-2xl px-4 py-3 text-lg font-semibold tracking-wide no-underline outline-none transition-all duration-300 hover:bg-brand-primary/10 hover:text-brand-primary ${
                  pathname === link.href ? "bg-brand-primary/10 text-brand-primary" : "text-brand-dark"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t border-brand-primary/10 pt-10">
            {!hideOrderButton && (
              <Link
                href="/order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex min-h-11 w-full items-center justify-center rounded-2xl bg-brand-primary px-7 text-center text-sm font-bold text-white no-underline shadow-[0_10px_22px_rgba(248,114,5,0.22)] transition-all duration-300 hover:bg-brand-primary/90 hover:shadow-[0_14px_28px_rgba(248,114,5,0.28)]"
              >
                Order Now
              </Link>
            )}
            <div className="mt-8 flex flex-col items-center gap-3">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Handcrafted By</span>
              <a
                href="https://www.devsinntechnologies.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-8 w-32 transition-transform hover:scale-105"
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

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`relative py-2 text-base font-semibold tracking-wide no-underline outline-none transition-colors duration-300 hover:text-brand-primary hover:no-underline active:no-underline focus:outline-none focus-visible:outline-none ${
        active ? "text-brand-primary" : "text-brand-dark/75"
      }`}
    >
      {children}
      <span className={`absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-brand-primary transition-all duration-300 ${active ? "w-6" : "w-0"}`} />
    </Link>
  );
}

function BrandMark({ mobile = false }: { mobile?: boolean }) {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-3 no-underline outline-none transition-opacity duration-300 hover:opacity-90 focus:outline-none focus-visible:outline-none">
      <div className="relative h-14 w-14 shrink-0 sm:h-[72px] sm:w-[72px]">
        <Image src="/fiery-wok.png" alt="Ama G Ka Dhaba" fill className="object-contain object-center" priority={!mobile} unoptimized />
      </div>
      <div className="min-w-0">
        <span className="block text-[7px] font-black uppercase tracking-[0.22em] text-brand-dark/45 sm:text-[9px] sm:tracking-[0.28em]">Zee Food Gallery</span>
        <span lang="ur" dir="rtl" className="font-ama-dhaba block whitespace-nowrap text-[20px] font-black leading-none text-brand-primary sm:text-[28px]">
          اماں جی کا ڈھابہ
        </span>
      </div>
    </Link>
  );
}
