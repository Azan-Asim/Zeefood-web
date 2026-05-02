"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`
      w-full h-[90px] flex items-center justify-between px-4 lg:px-12 fixed top-0 z-[100] transition-all duration-500
      ${isScrolled 
        ? "bg-white/40 backdrop-blur-2xl border-b border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)]" 
        : "bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)]"}
    `}>
      {/* Left: Logo & Rebranding */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-16 h-16 transition-transform duration-500 group-hover:rotate-[360deg]">
            <Image src="/fiery-wok.png" alt="Hamari Jaga Dhaba" fill className="object-contain" priority />
          </div>
          <span className="font-black text-brand-dark text-xl lg:text-2xl tracking-tighter hidden sm:block whitespace-nowrap">
            {t("brandName")}
          </span>
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden lg:flex items-center gap-12">
        <Link href="/menu" className="text-sm font-black text-brand-dark/80 hover:text-brand-primary transition-all tracking-[0.2em] uppercase hover:scale-105">{t("viewMenu")}</Link>
        <Link href="/about" className="text-sm font-black text-brand-dark/80 hover:text-brand-primary transition-all tracking-[0.2em] uppercase hover:scale-105">{t("ourStory")}</Link>
        <Link href="/track" className="text-sm font-black text-brand-dark/80 hover:text-brand-primary transition-all tracking-[0.2em] uppercase hover:scale-105">{t("trackOrder")}</Link>
      </div>

      {/* Right: Language Toggle & Sign In */}
      <div className="flex items-center gap-6">
        {/* Language Switcher */}
        <div className="flex bg-gray-100 p-1 rounded-full border border-gray-200">
          <button 
            onClick={() => setLanguage("EN")}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${language === "EN" ? "bg-white text-brand-primary shadow-sm" : "text-brand-dark/30 hover:text-brand-dark/60"}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage("UR")}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${language === "UR" ? "bg-white text-brand-primary shadow-sm" : "text-brand-dark/30 hover:text-brand-dark/60"}`}
          >
            اردو
          </button>
        </div>

        {/* Premium Sign In Button (Commented out as per previous request) */}
        {/* <div className="flex items-center">
          <Link 
            href="/login" 
            className="group relative px-10 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full overflow-hidden shadow-[0_10px_25px_rgba(230,57,70,0.3)] hover:shadow-[0_20px_40px_rgba(230,57,70,0.45)] transition-all duration-500 hover:-translate-y-1 active:scale-95"
          >
            <div className="absolute inset-0 bg-brand-dark translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            
            <span className="relative z-10 text-sm font-black tracking-[0.2em] uppercase text-white transition-colors duration-300">
              Sign In
            </span>
            
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]" />
          </Link>
        </div> */}
      </div>
    </nav>
  );
}
