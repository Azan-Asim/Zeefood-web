"use client";

import Link from "next/link";
import Image from "next/image";

interface PremiumContentPageProps {
  label: string;
  title1: string;
  title2: string;
  description: string;
  children: React.ReactNode;
}

export default function PremiumContentPage({ label, title1, title2, description, children }: PremiumContentPageProps) {
  return (
    <div className="min-h-screen bg-[#fdfcfb] flex flex-col relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[700px] bg-gradient-to-b from-[#fef2eb] via-[#fff5f0] to-transparent pointer-events-none" />
      
      {/* Modern Glassmorphic Orbs */}
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(230,57,70,0.12)_0%,transparent_70%)] rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(244,162,97,0.1)_0%,transparent_70%)] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(230,57,70,0.05)_0%,transparent_70%)] rounded-full blur-[150px] pointer-events-none" />

      {/* Floating Particles Decoration */}
      <div className="absolute top-20 right-[15%] w-2 h-2 bg-brand-primary/20 rounded-full blur-sm animate-float" />
      <div className="absolute top-40 left-[10%] w-3 h-3 bg-brand-secondary/20 rounded-full blur-sm animate-float-particle" />


      {/* Main Content Area */}
      <main className="relative z-20 flex-1 w-full max-w-5xl mx-auto px-6 py-20 lg:py-32">
        {/* Cinematic Title Section */}
        <div className="mb-24 text-center">
          <div className="inline-flex items-center gap-3 bg-white border border-brand-primary/10 text-[#E63946] px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E63946] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E63946]"></span>
            </span>
            {label}
          </div>
          
          <h1 className="text-5xl lg:text-8xl font-black text-[#1a0a04] tracking-tight mb-8 leading-[0.95]">
            {title1} <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">{title2}</span>
          </h1>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto mb-10 rounded-full" />
          
          <p className="text-brand-dark/70 text-xl lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Content Container with Advanced Glassmorphism */}
        <div className="bg-white/90 backdrop-blur-md rounded-[40px] p-8 lg:p-20 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-white relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary" />
          <div className="relative z-10 text-brand-dark space-y-6">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
