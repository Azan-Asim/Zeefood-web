"use client";

interface PremiumContentPageProps {
  label: string;
  title1: string;
  title2: string;
  description: string;
  children: React.ReactNode;
}

export default function PremiumContentPage({ label, title1, title2, description, children }: PremiumContentPageProps) {
  return (
    <div className="min-h-screen bg-[#fbf7f2] flex flex-col relative overflow-hidden font-sans text-brand-dark">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-orange-50/80 via-[#fbf7f2] to-[#fbf7f2] pointer-events-none" />

      <main className="site-container relative z-20 flex-1 pb-10 pt-24 sm:pb-12 sm:pt-28 lg:pb-16 lg:pt-[7.5rem]">
        <div className="mb-7 text-center sm:mb-9 lg:mb-10">
          <div className="inline-flex items-center gap-3 bg-[#fffdf8]/90 border border-brand-primary/15 text-brand-primary px-4 sm:px-5 py-2 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest mb-4 sm:mb-5 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-primary"></span>
            </span>
            {label}
          </div>
          
          <h1 className="text-[clamp(2.15rem,8vw,4.2rem)] font-black text-brand-dark tracking-tight mb-4 leading-[0.98]">
            {title1} <br className="hidden lg:block" />
            {title2 && <span className="text-brand-primary">{title2}</span>}
          </h1>
          
          <div className="w-20 sm:w-24 h-1.5 bg-brand-primary mx-auto mb-4 sm:mb-5 rounded-full" />
          
          <p className="text-brand-dark/70 text-base sm:text-lg lg:text-xl font-semibold max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="bg-[#fffdf8]/92 backdrop-blur-md rounded-2xl sm:rounded-[28px] p-4 sm:p-6 lg:p-8 shadow-[0_24px_70px_rgba(17,24,39,0.06)] border border-brand-primary/10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary" />
          <div className="relative z-10 text-brand-dark space-y-6">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
