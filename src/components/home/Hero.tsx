"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-[#FCFBFA]">
      
      {/* --- PREMIUM BACKGROUND AESTHETICS --- */}

      {/* Diagonal Marquee Text Background (High Density) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col items-center justify-center opacity-[0.035] rotate-[-15deg] scale-150 select-none">
        {[...Array(30)].map((_, i) => (
          <div key={i} className={`flex whitespace-nowrap animate-marquee ${i % 2 === 0 ? '' : 'direction-reverse'}`} style={{ animationDuration: `${60 + i * 2}s` }}>
            <span className="text-[5rem] lg:text-[8rem] font-black uppercase tracking-[0.6em] px-10 text-brand-dark font-urdu">
              ZEE FOOD GALLERY • اماں جی کا ڈابہ • ZEE FOOD GALLERY • اماں جی کا ڈابہ
            </span>
            <span className="text-[5rem] lg:text-[8rem] font-black uppercase tracking-[0.6em] px-10 text-brand-dark font-urdu">
              ZEE FOOD GALLERY • اماں جی کا ڈابہ • ZEE FOOD GALLERY • اماں جی کا ڈابہ
            </span>
          </div>
        ))}
      </div>

      {/* Soft Mesh Gradient Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#F87205]/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#500001]/5 rounded-full blur-[100px] animate-bounce-slow" />
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* --- LEFT SIDE: THE COPY --- */}
        <div className="flex flex-col items-start gap-8 animate-fade-in-up">
          
          {/* Main Headline */}
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl lg:text-7xl font-black text-brand-dark leading-[1.1] tracking-tighter">
              Savor the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-[#b0222e] to-brand-secondary">Art</span> <br />
              of Modern Dining.
            </h1>
            <p className="text-lg lg:text-xl text-brand-dark/60 font-medium max-w-xl leading-relaxed">
              Experience the pinnacle of culinary excellence. Crafted by master chefs, delivered to your doorstep with absolute precision and care.
            </p>
          </div>

          {/* Premium CTAs */}
          <div className="flex flex-wrap items-center gap-6 mt-6">
            <Link 
              href="/menu" 
              className="group relative px-12 py-5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl font-black uppercase tracking-[0.2em] text-xs text-white shadow-[0_20px_50px_rgba(230,57,70,0.3)] hover:shadow-[0_30px_60px_rgba(230,57,70,0.5)] transition-all duration-500 hover:-translate-y-1.5 active:scale-95 flex items-center gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <span className="relative z-10">Order Now</span>
              <svg className="w-5 h-5 relative z-10 transition-transform duration-500 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <Link 
              href="/about" 
              className="group relative px-12 py-5 bg-white border border-gray-100 text-brand-dark rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-sm hover:shadow-2xl hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-1.5 active:scale-95 flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">Our Story</span>
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary relative z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Social Proof / Trust Strip */}
          <div className="flex items-center gap-6 mt-8 pt-8 border-t border-gray-100 w-full">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs overflow-hidden relative">
                   <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="User" fill className="object-cover" unoptimized />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-brand-dark">15k+ Happy Diners</span>
              <span className="text-xs font-bold text-brand-dark/40 italic">"Best food in Pakistan" — Foodies Inc.</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: PREMIUM VISUAL STACK --- */}
        <div className="relative h-[450px] lg:h-[550px] flex items-center justify-center">
          
          {/* Main Visual: Glassmorphic Container */}
          <div className="relative w-[85%] h-[70%] bg-white/40 backdrop-blur-3xl rounded-[40px] border border-white/50 shadow-[0_40px_80px_rgba(0,0,0,0.05)] flex items-center justify-center animate-float">
            
            {/* The "Centerpiece" (Existing Logo or stylized food icon) */}
            <div className="relative w-64 h-64 lg:w-80 lg:h-80 drop-shadow-[0_20px_50px_rgba(230,57,70,0.2)]">
              <Image src="/fiery-wok.png" alt="ZeeFood Premium" fill className="object-contain" priority />
            </div>

            {/* Floating Card 1: Live Status */}
            <div className="absolute top-10 -right-8 bg-white/90 backdrop-blur-xl p-5 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-white/20 animate-float-slow w-48">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-600">On the Way</span>
              </div>
              <p className="text-sm font-black text-brand-dark">Delivery: 12 Mins</p>
            </div>

            {/* Floating Card 2: Rating */}
            <div className="absolute bottom-20 -left-12 bg-white/95 backdrop-blur-xl p-5 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-white/20 animate-float-delayed w-56">
               <div className="flex items-center gap-1 mb-2 text-[#F4A261]">
                  {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
               </div>
               <p className="text-sm font-black text-brand-dark">"Unmatched Quality"</p>
               <span className="text-[10px] font-bold text-brand-dark/40 tracking-wider">— Chef Arshad</span>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-secondary/10 rounded-full blur-3xl" />
          </div>

          {/* Secondary Floating Elements */}
          <div className="absolute top-1/4 -left-5 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl animate-bounce-slow border border-gray-100">🔥</div>
          <div className="absolute bottom-1/4 -right-5 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-3xl animate-float border border-gray-100">🍱</div>
        </div>
      </div>
    </section>
  );
}
