"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("DELIVERY");

  return (
    <nav className="w-full bg-brand-dark h-[90px] flex items-center justify-between px-4 lg:px-12 shadow-lg relative z-50 border-b border-white/5">
      {/* Left: Hamburger & Logo */}
      <div className="flex items-center gap-6 lg:gap-10">
        <button className="flex flex-col justify-center gap-1.5 w-7 h-7 hover:opacity-70 transition-opacity">
          <span className="block w-full h-[2px] bg-brand-white rounded-full" />
          <span className="block w-full h-[2px] bg-brand-white rounded-full" />
          <span className="block w-full h-[2px] bg-brand-white rounded-full" />
        </button>
        <Link href="/" className="flex items-center">
          <div className="relative w-20 h-20">
            <Image src="/fiery-wok.png" alt="Fiery Wok Logo" fill className="object-contain drop-shadow-[0_0_15px_rgba(230,57,70,0.5)]" priority />
          </div>
        </Link>
      </div>

      {/* Center: Tabs */}
      <div className="hidden lg:flex items-center bg-brand-surface rounded-full p-1.5 border border-white/5 shadow-inner">
        <button 
          onClick={() => setActiveTab("DELIVERY")}
          className={`px-8 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "DELIVERY" ? "bg-brand-primary text-brand-white shadow-[0_4px_15px_rgba(230,57,70,0.4)]" : "text-brand-white/50 hover:text-brand-white"}`}
        >
          🛵 DELIVERY
        </button>
        <button 
          onClick={() => setActiveTab("PICKUP")}
          className={`px-8 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "PICKUP" ? "bg-brand-primary text-brand-white shadow-[0_4px_15px_rgba(230,57,70,0.4)]" : "text-brand-white/50 hover:text-brand-white"}`}
        >
          🥡 PICKUP
        </button>
      </div>

      {/* Right: Cart & Login */}
      <div className="flex items-center gap-8">
        <button className="relative flex items-center justify-center hover:opacity-70 transition-opacity">
          <svg className="w-7 h-7 text-brand-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-brand-white bg-brand-primary px-1.5 rounded-full leading-none shadow-sm">
            0
          </span>
        </button>
        <Link href="/login" className="bg-gradient-to-r from-brand-secondary to-brand-primary text-brand-white px-8 py-3 rounded-full font-black text-sm hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(244,162,97,0.3)] hover:-translate-y-0.5 tracking-wider uppercase">
          LOGIN
        </Link>
      </div>
    </nav>
  );
}
