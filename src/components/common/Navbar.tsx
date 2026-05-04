"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
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
    { name: t("viewMenu"), href: "/menu" },
    { name: t("ourStory"), href: "/about" },
  ];

  return (
    <>
      <nav className={`
        w-full h-[100px] lg:h-[110px] flex items-center justify-between px-6 lg:px-12 fixed top-0 z-[100] transition-all duration-500
        ${isScrolled 
          ? "bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)]" 
          : "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)]"}
      `}>
        {/* Left: Logo & Rebranding - Adjusted for no cutting */}
        <div className="flex items-center py-2">
          <Link href="/" className="flex items-center gap-3 lg:gap-5 group">
            <div className="relative w-14 h-14 lg:w-20 lg:h-20 transition-transform duration-500 group-hover:rotate-[360deg]">
              <Image src="/fiery-wok.png" alt="Zee Food Gallery" fill className="object-contain p-1" priority unoptimized />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] lg:text-[11px] font-black text-brand-primary whitespace-nowrap mb-1 italic uppercase tracking-[0.2em]">
                {t("brandName")}
              </span>
              <span className="font-black text-brand-dark text-[1.4rem] lg:text-[2.2rem] tracking-tighter whitespace-nowrap leading-tight">
                {t("brandSubtitle")}
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-black text-brand-dark/80 hover:text-brand-primary transition-all tracking-[0.2em] uppercase hover:scale-105"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Mobile Menu Toggle & Actions */}
        <div className="flex items-center gap-4">
          
          {/* Mobile Menu Button - Styled as a premium card */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-brand-primary/5 border border-brand-primary/10 rounded-2xl transition-all active:scale-90 hover:bg-brand-primary/10 shadow-sm"
            aria-label="Toggle Menu"
          >
            <div className={`w-6 h-[2.5px] bg-brand-primary rounded-full transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-6 h-[2.5px] bg-brand-primary rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-[2.5px] bg-brand-primary rounded-full transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

          {/* Desktop Call to Action */}
          <Link 
            href="/order" 
            className="hidden sm:flex px-10 py-4 bg-brand-primary text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_10px_30px_rgba(230,57,70,0.25)] hover:bg-brand-dark transition-all hover:-translate-y-1 active:scale-95"
          >
            Order Now
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 z-[110] lg:hidden transition-all duration-500 ease-in-out
        ${isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"}
      `}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-brand-dark/60 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`
          absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-[0_0_100px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-out p-12 flex flex-col rounded-l-[3rem]
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}>
          {/* Mobile Menu Header - Perfect spacing for logo */}
          <div className="mb-16 flex items-center justify-between border-b border-gray-50 pb-8">
             <div className="flex flex-col">
                <div className="relative w-14 h-14 mb-2">
                   <Image src="/fiery-wok.png" alt="ZeeFood" fill className="object-contain" />
                </div>
                <h2 className="text-xl font-black text-brand-dark uppercase tracking-tighter">ZeeFood</h2>
             </div>
             <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-400 hover:text-brand-primary transition-colors"
             >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
             </button>
          </div>

          <div className="flex flex-col gap-10">
            {navLinks.map((link, i) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-black text-brand-dark/30 hover:text-brand-primary transition-all uppercase tracking-widest flex items-center justify-between group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {link.name}
                <svg className="w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-6 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-gray-50">
             <Link 
              href="/order" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-6 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-center rounded-[2.5rem] font-black uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(230,57,70,0.3)] hover:shadow-[0_20px_50px_rgba(230,57,70,0.4)] transition-all active:scale-95"
             >
               Order Online
             </Link>
             <div className="mt-10 flex flex-col items-center gap-2">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em]">
                  Handcrafted by
                </p>
                <div className="relative w-24 h-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                   <Image src="/devsinn.png" alt="Devsinn" fill className="object-contain" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
