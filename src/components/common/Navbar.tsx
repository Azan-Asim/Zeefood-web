"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
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
      {/* Left: Logo only (Hamburger removed) */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-16 h-16 transition-transform duration-500 group-hover:rotate-[360deg]">
            <Image src="/fiery-wok.png" alt="Fiery Wok Logo" fill className="object-contain" priority />
          </div>
          <span className="font-black text-brand-dark text-3xl tracking-tighter hidden sm:block">
            Zee<span className="text-brand-primary">Food</span>
          </span>
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden lg:flex items-center gap-12">
        <Link href="/menu" className="text-sm font-black text-brand-dark/80 hover:text-brand-primary transition-all tracking-[0.2em] uppercase hover:scale-105">Menu</Link>
        <Link href="/about" className="text-sm font-black text-brand-dark/80 hover:text-brand-primary transition-all tracking-[0.2em] uppercase hover:scale-105">Our Story</Link>
        <Link href="/track" className="text-sm font-black text-brand-dark/80 hover:text-brand-primary transition-all tracking-[0.2em] uppercase hover:scale-105">Track Order</Link>
      </div>

      {/* Right: Premium Sign In Button (Cart removed) */}
      <div className="flex items-center">
        <Link 
          href="/login" 
          className="group relative px-10 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full overflow-hidden shadow-[0_10px_25px_rgba(230,57,70,0.3)] hover:shadow-[0_20px_40px_rgba(230,57,70,0.45)] transition-all duration-500 hover:-translate-y-1 active:scale-95"
        >
          {/* Animated background layer */}
          <div className="absolute inset-0 bg-brand-dark translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          
          {/* Text layer */}
          <span className="relative z-10 text-sm font-black tracking-[0.2em] uppercase text-white transition-colors duration-300">
            Sign In
          </span>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]" />
        </Link>
      </div>
    </nav>
  );
}
