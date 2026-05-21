"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();
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
    { name: "HOME", href: "/" },
    { name: "VIEW MENU", href: "/menu" },
    { name: "OUR STORY", href: "/about" },
  ];

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300
        ${isScrolled ? "h-20 shadow-md bg-gray-50/90" : "h-24 bg-gray-50/80"}
      `}>
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-6 lg:px-12">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4">
            <div className="relative w-60 h-40">
              <Image
                src="/logo.svg"
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
                className=" hover:text-[#e63946] transition-colors tracking-[0.1em]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/order"
              className=" bg-brand-primary hover:bg-brand-primary text-white text-white font-medium py-3 px-8 rounded-md"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-brand-dark"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
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
          absolute right-0 top-0 bottom-0 w-[80%] bg-white p-10 flex flex-col transition-transform duration-500 rounded-l-[3.5rem]
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}>
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-16">
            <span className="text-[14px] font-black text-[#e63946] tracking-[0.2em] uppercase">MENU</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl text-gray-500 hover:text-[#e63946] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-black text-black hover:text-[#e63946] transition-all tracking-[0.1em]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-gray-50/50">
            <Link
              href="/order"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-5 bg-brand-primary text-white text-center text-white font-medium py-3 px-8 rounded-md"
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
