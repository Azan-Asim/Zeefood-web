"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function LocationModal() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [orderType, setOrderType] = useState("delivery");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLocation = localStorage.getItem("userLocation");
    if (!savedLocation) {
      setIsOpen(true);
    }
  }, []);

  const handleSelect = () => {
    if (city && area) {
      const locationData = {
        orderType,
        city,
        area,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("userLocation", JSON.stringify(locationData));
      setIsOpen(false);
    }
  };

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-6">
      {/* Backdrop with sophisticated blur */}
      <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[8px] animate-fade-in" />

      {/* Modal Content - More Compact & Premium */}
      <div className="relative bg-white/95 backdrop-blur-xl w-full max-w-[440px] rounded-[2rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] border border-white/50 overflow-hidden animate-fade-in-up">
        
        {/* Subtle top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary" />

        <div className="p-6 lg:p-8 flex flex-col items-center">
          
          {/* Header Row: Logo & Title Side-by-Side to save height */}
          <div className="w-full flex items-center gap-5 mb-6 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
            <div className="relative w-14 h-14 shrink-0 drop-shadow-md">
              <Image src="/fiery-wok.png" alt="ZeeFood" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-black text-brand-dark leading-none tracking-tight uppercase">
                {t("orderType")}
              </h2>
              <p className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest mt-1">Select how you want your food</p>
            </div>
          </div>

          {/* Order Type Toggle - More Compact */}
          <div className="flex bg-gray-100/80 p-1 rounded-full mb-6 w-full shadow-inner">
            <button
              onClick={() => setOrderType("delivery")}
              className={`flex-1 py-2.5 px-6 rounded-full text-xs font-black transition-all duration-500 ${
                orderType === "delivery" 
                ? "bg-brand-primary text-white shadow-md scale-105" 
                : "text-brand-dark/40 hover:text-brand-dark/60"
              }`}
            >
              {t("delivery")}
            </button>
            <button
              onClick={() => setOrderType("pickup")}
              className={`flex-1 py-2.5 px-6 rounded-full text-xs font-black transition-all duration-500 ${
                orderType === "pickup" 
                ? "bg-brand-primary text-white shadow-md scale-105" 
                : "text-brand-dark/40 hover:text-brand-dark/60"
              }`}
            >
              {t("pickup")}
            </button>
          </div>

          {/* Location Section - Tighter Spacing */}
          <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
               <span className="h-px flex-1 bg-gray-100" />
               <span className="text-[10px] font-black text-brand-dark/30 uppercase tracking-[0.2em]">{t("yourLocation")}</span>
               <span className="h-px flex-1 bg-gray-100" />
            </div>

            <div className="space-y-3">
              {/* Use Current Location Button */}
              <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-100 rounded-xl text-xs font-black text-brand-dark/70 hover:border-brand-primary/40 hover:text-brand-primary transition-all group shadow-sm hover:shadow-md">
                <svg className="w-4 h-4 text-brand-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {t("useCurrentLocation")}
              </button>

              {/* Selection Grid */}
              <div className="grid grid-cols-1 gap-3">
                <div className="relative group">
                  <select 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full appearance-none py-3.5 px-5 bg-gray-50/50 border border-gray-100 rounded-xl text-xs font-bold text-brand-dark/80 focus:outline-none focus:border-brand-primary/40 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="" disabled>{t("selectCity")}</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-dark/20 group-hover:text-brand-primary transition-colors">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>

                <div className="relative group">
                  <select 
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full appearance-none py-3.5 px-5 bg-gray-50/50 border border-gray-100 rounded-xl text-xs font-bold text-brand-dark/80 focus:outline-none focus:border-brand-primary/40 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="" disabled>{t("selectArea")}</option>
                    <option value="Gulshan-e-Iqbal">Gulshan-e-Iqbal</option>
                    <option value="DHA Phase 6">DHA Phase 6</option>
                    <option value="Johar Town">Johar Town</option>
                    <option value="F-7 Markaz">F-7 Markaz</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-dark/20 group-hover:text-brand-primary transition-colors">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Action Button */}
          <button 
            disabled={!city || !area}
            onClick={handleSelect}
            className={`w-full mt-8 py-4 rounded-xl font-black uppercase tracking-[0.25em] text-[10px] transition-all duration-500 ${
              city && area 
              ? "bg-brand-primary text-white shadow-[0_15px_30px_rgba(230,57,70,0.3)] hover:shadow-[0_20px_40px_rgba(230,57,70,0.4)] hover:-translate-y-0.5 active:scale-95" 
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
          >
            {t("startOrdering")}
          </button>

          <p className="mt-6 text-[9px] font-bold text-brand-dark/20 uppercase tracking-[0.3em]">Premium Dining Experience Guaranteed</p>

        </div>
      </div>
    </div>
  );
}
