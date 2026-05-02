"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-90px)] min-h-[500px] bg-[#fdfcfb] overflow-hidden flex items-center px-6 lg:px-24 select-none">
      
      {/* --- PREMIUM TEXTURE LAYER --- */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />

      {/* --- FLOATING AMBIENT ORBS --- */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-brand-secondary/10 rounded-full blur-[80px] animate-bounce-slow pointer-events-none" />
      
      {/* --- FUTURISTIC BACKGROUND LAYER --- */}
      
      {/* Mesh Gradients */}
      <div 
        className="absolute top-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(230,57,70,0.05)_0%,transparent_70%)] rounded-full blur-[100px] pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
      />
      
      {/* --- CINEMATIC DIAGONAL MARQUEE --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.08] select-none flex flex-col justify-center gap-12 rotate-[-25deg] scale-150">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex whitespace-nowrap animate-marquee">
            <span className="text-4xl lg:text-6xl font-black uppercase tracking-[0.5em] px-4">
              ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD
            </span>
            <span className="text-4xl lg:text-6xl font-black uppercase tracking-[0.5em] px-4">
              ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD
            </span>
          </div>
        ))}
      </div>

      {/* --- CONTENT LAYER --- */}
      
      <div className="relative z-20 w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 scale-[0.85] lg:scale-100 origin-center lg:origin-left">
        
        {/* Left Side: Cinematic Copy */}
        <div 
          className="flex-[1.2] flex flex-col items-start gap-6 lg:max-w-2xl text-left transition-transform duration-500 ease-out"
          style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
        >
          
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/80 backdrop-blur-md border border-brand-primary/10 shadow-[0_10px_30px_rgba(230,57,70,0.05)] animate-bounce-slow">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-primary" />
            </span>
            <span className="text-brand-dark/70 text-[9px] font-black uppercase tracking-[0.3em]">The Future of Desi Dining</span>
          </div>

          <h1 className="flex flex-col text-left">
            <span className="text-4xl md:text-5xl lg:text-[4.5rem] font-black tracking-tighter leading-[0.85] text-brand-dark">
              CRAFTING THE
            </span>
            <span className="text-5xl md:text-6xl lg:text-[6.5rem] font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary italic drop-shadow-sm">
              ULTIMATE
            </span>
            <span className="text-4xl md:text-5xl lg:text-[4.5rem] font-black tracking-tighter leading-[0.85] text-brand-dark flex items-center gap-4">
              FLAVOR <div className="h-1.5 flex-1 bg-gradient-to-r from-brand-primary/30 to-transparent rounded-full hidden md:block" />
            </span>
          </h1>

          <p className="text-brand-dark/60 text-base lg:text-lg font-medium max-w-lg leading-relaxed border-l-4 border-brand-primary/10 pl-6">
            Breaking boundaries between tradition and innovation. Reimagined luxury Desi cuisine for the modern digital age.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-2">
            <Link 
              href="/menu" 
              className="px-8 py-4 bg-brand-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-brand-primary transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(230,57,70,0.3)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              <span className="relative z-10">Explore Menu</span>
            </Link>
            <Link 
              href="/track" 
              className="px-8 py-4 bg-white border border-gray-200 text-brand-dark rounded-2xl font-black text-xs uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary transition-all duration-500 shadow-xl hover:-translate-y-1"
            >
              Track Order
            </Link>
          </div>
        </div>

        {/* Right Side: Futuristic Data Accents */}
        <div 
          className="flex-1 w-full max-w-md relative transition-transform duration-500 ease-out"
          style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}
        >
          <div className="grid grid-cols-2 gap-4 lg:gap-6 relative z-10">
            
            {/* Stat Card 1 */}
            <div className="p-6 lg:p-8 bg-white/90 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] lg:rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_80px_rgba(230,57,70,0.12)] transition-all duration-700 hover:-translate-y-3 group">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brand-primary/10 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-brand-primary transition-colors duration-500">
                <span className="text-xl lg:text-2xl group-hover:scale-125 transition-transform">🔥</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-brand-dark mb-1">500+</h3>
              <p className="text-brand-dark/40 text-[9px] font-extrabold uppercase tracking-widest">Sizzling Daily Orders</p>
            </div>

            {/* Stat Card 2 */}
            <div className="p-6 lg:p-8 bg-white/90 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] lg:rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)] mt-6 lg:mt-8 hover:shadow-[0_30px_80px_rgba(244,162,97,0.12)] transition-all duration-700 hover:-translate-y-3 group">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brand-secondary/10 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-brand-secondary transition-colors duration-500">
                <span className="text-xl lg:text-2xl group-hover:scale-125 transition-transform">⭐</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-brand-dark mb-1">4.9/5</h3>
              <p className="text-brand-dark/40 text-[9px] font-extrabold uppercase tracking-widest">Customer Satisfaction</p>
            </div>

            {/* Stat Card 3 */}
            <div className="p-6 lg:p-8 bg-brand-dark rounded-[2.5rem] lg:rounded-[3.5rem] shadow-2xl -mt-4 hover:scale-105 transition-transform duration-700 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6 relative z-10">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-lg lg:text-xl">📍</span>
                </div>
                <div className="h-[2px] flex-1 bg-white/10" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-1 uppercase tracking-tight">Lahore</h3>
              <p className="text-white/40 text-[8px] lg:text-[9px] font-extrabold uppercase tracking-[0.3em]">Flagship Digital Hub</p>
            </div>

            {/* Stat Card 4 */}
            <div className="p-6 lg:p-8 bg-white/90 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] lg:rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)] mt-4 hover:shadow-[0_30px_80px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-3 group">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brand-primary/10 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-brand-primary transition-colors duration-500">
                <span className="text-xl lg:text-2xl group-hover:scale-125 transition-transform">⚡</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-brand-dark mb-1">30m</h3>
              <p className="text-brand-dark/40 text-[9px] font-extrabold uppercase tracking-widest">Ultra-Rapid Delivery</p>
            </div>
          </div>

          {/* Abstract floating circles */}
          <div className="absolute -top-12 -right-12 w-32 h-32 border-2 border-brand-primary/5 rounded-full animate-float opacity-40" />
          <div className="absolute bottom-12 -left-12 w-24 h-24 border border-brand-secondary/10 rounded-full animate-float-slow opacity-30" />
        </div>
      </div>

    </section>
  );
}
