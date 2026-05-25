"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function LocationModal() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [orderType, setOrderType] = useState("delivery");
  const [city, setCity] = useState("Lahore");
  const [area, setArea] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const lahoreAreas = [
    "Allama Iqbal Town",
    "Samnabad",
    "Chauburji",
    "Gulshan E Ravi",

  ].sort();

  const filteredAreas = lahoreAreas.filter(loc => 
    loc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setMounted(true);
    const savedLocation = sessionStorage.getItem("userLocation");
    if (!savedLocation) {
      setTimeout(() => setIsOpen(true), 500);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = () => {
    if (orderType === "pickup") {
      sessionStorage.setItem("userLocation", JSON.stringify({ orderType, city: null, area: null, timestamp: new Date().toISOString() }));
      setIsOpen(false);
      return;
    }

    if (city && area) {
      sessionStorage.setItem("userLocation", JSON.stringify({ orderType, city, area, timestamp: new Date().toISOString() }));
      setIsOpen(false);
    }
  };

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-[12px] animate-in fade-in duration-500" onClick={() => setIsDropdownOpen(false)} />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-[460px] rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] border border-white/20 overflow-visible animate-in zoom-in-95 slide-in-from-bottom-10 duration-700">
        
        {/* Top accent bar */}
        {/* <div className="h-2 w-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary" /> */}

        <div className="p-8 lg:p-10 flex flex-col items-center">
          
          {/* Logo & Title */}
          <div className="w-full flex items-center gap-6 mb-8 bg-gray-50 p-5 rounded-[2rem] border border-gray-100">
            <div className="relative w-16 h-16 shrink-0">
              <Image src="/fiery-wok.png" alt="ZeeFood" fill className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl text-black font-bold">
               Order Type
              </h2>
              <p className="text-[11px] text-black mt-2">Where should we send your food?</p>
            </div>
          </div>

          {/* Order Type Toggle */}
          <div className="flex bg-gray-100 p-1.5 rounded-full mb-8 w-full shadow-inner border border-gray-200">
            <button onClick={() => setOrderType("delivery")} className={`flex-1 py-3 px-6 rounded-full text-[11px] font-black transition-all duration-500 uppercase tracking-widest ${orderType === "delivery" ? "bg-brand-primary text-white shadow-lg" : "text-brand-dark/40"}`}>{t("delivery")}</button>
            <button onClick={() => setOrderType("pickup")} className={`flex-1 py-3 px-6 rounded-full text-[11px] font-black transition-all duration-500 uppercase tracking-widest ${orderType === "pickup" ? "bg-brand-primary text-white shadow-lg" : "text-brand-dark/40"}`}>{t("pickup")}</button>
          </div>

          {/* Location Section (only for delivery) */}
          {orderType === "delivery" && (
            <div className="w-full">
            <div className="flex items-center gap-4 mb-6">
               <span className="h-px flex-1 bg-gray-200" />
               <span className="text-[11px] font-medium text-black ">{t("yourLocation")}</span>
               <span className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="space-y-4">
              <div className="w-full py-4 px-6 bg-gray-50 border-2 border-gray-100 rounded-2xl text-sm font-medium text-black flex items-center justify-between shadow-sm">
                <span>Lahore</span>
                <div className="flex items-center gap-2 text-brand-primary">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Active City</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>

              {/* Custom Area Selection with SEARCH */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full py-4 px-6 bg-white border-2 border-gray-100 rounded-2xl text-sm font-medium text-black flex items-center justify-between hover:border-brand-primary/40 transition-all shadow-sm"
                >
                  <span>{area || t("selectArea")}</span>
                  <svg className={`w-4 h-4 text-brand-dark/20 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col">
                    {/* Search Input inside dropdown */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                      <div className="relative">
                        <input 
                          autoFocus
                          type="text"
                          placeholder="Search your area..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full py-2 pl-9 pr-4 bg-white border border-gray-200 rounded-xl text-xs font-medium text-black focus:outline-none focus:border-brand-primary/40 transition-all"
                        />
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      </div>
                    </div>
                    
                    <div className="max-h-[180px] overflow-y-auto no-scrollbar py-2" style={{ WebkitOverflowScrolling: "touch" }}>
                      {filteredAreas.length > 0 ? (
                        filteredAreas.map((loc) => (
                          <button
                            key={loc}
                            onClick={() => { setArea(loc); setIsDropdownOpen(false); setSearchQuery(""); }}
                            className={`w-full text-left px-6 py-3 text-[10px] font-medium text-black transition-colors ${area === loc ? "bg-brand-primary text-white" : "text-brand-dark/70 hover:bg-gray-50"}`}
                          >
                            {loc}
                          </button>
                        ))
                      ) : (
                        <div className="px-6 py-4 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">No area found</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>
          )}

          <button 
            disabled={orderType === "delivery" ? !area : false} 
            onClick={handleSelect}
            className={`w-full mt-10 py-5 rounded-2xl font-medium text-md transition-all duration-500 ${orderType === "delivery" ? (area ? "bg-brand-primary text-white shadow-xl hover:-translate-y-1" : "bg-gray-100 text-gray-300") : "bg-brand-primary text-white shadow-xl hover:-translate-y-1"}`}
          >
            {t("startOrdering")}
          </button>
          <p className="mt-8 text-[10px]  text-black">Zee Food Gallery Premium</p>
        </div>
      </div>
    </div>
  );
}
