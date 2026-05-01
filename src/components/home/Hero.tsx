"use client";

export default function Hero() {
  return (
    <section className="relative w-full h-[calc(100vh-90px)] min-h-[500px] bg-gradient-to-br from-[#4a0808] via-[#150202] to-[#080000] overflow-hidden flex items-center justify-between px-6 lg:px-20">
      
      {/* Abstract Glowing Orbs for Premium Vibe */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-primary/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-secondary/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Repeating Text Background (Subtle) */}
      <div className="absolute inset-0 flex flex-col justify-center gap-4 opacity-[0.04] pointer-events-none overflow-hidden -rotate-6 scale-125 z-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="text-[8rem] font-black italic whitespace-nowrap text-stroke-secondary uppercase tracking-[0.1em] leading-none">
            ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD ZEEFOOD
          </div>
        ))}
      </div>

      {/* Main Content (Left) */}
      <div className="relative z-20 max-w-3xl flex flex-col gap-6 lg:pl-10">
        <h1 className="text-brand-white font-black flex flex-col drop-shadow-2xl">
          <span className="text-5xl lg:text-7xl tracking-tighter leading-[0.9] text-brand-secondary italic mb-2">IGNITE</span>
          <span className="text-6xl lg:text-[6rem] tracking-tight leading-[0.9] text-brand-white">YOUR SENSES</span>
        </h1>
        <p className="text-brand-light/70 text-lg lg:text-xl max-w-xl font-light tracking-wide leading-relaxed">
          Experience the boldest, most authentic fiery wok creations. Crafted with passion, delivered with heat.
        </p>
      </div>

      {/* Right Side (Minimalist accents, no image as requested) */}
      <div className="relative z-20 hidden lg:flex flex-col items-end gap-8 pr-10">
        <div className="w-[2px] h-32 bg-gradient-to-b from-brand-secondary to-transparent opacity-50" />
        <h2 className="text-brand-light/30 font-black italic text-2xl lg:text-4xl leading-tight tracking-[0.2em]" style={{ writingMode: 'vertical-rl' }}>
          FEEL THE HEAT
        </h2>
      </div>

    </section>
  );
}
