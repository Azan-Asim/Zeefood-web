"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Navigation, X, Check, Loader2, LocateFixed } from "lucide-react";

type OrderType = "delivery" | "pickup";

const PICKUP_ADDRESS = "464-Sirhindi Road, Near Gourmet Bakers, First Round About, Samanabad, Lahore";

export default function LocationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  
  // Geolocation states
  const [locStatus, setLocStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [locationName, setLocationName] = useState<string>("");
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const openTimer = setTimeout(() => setIsOpen(true), 500);
    return () => clearTimeout(openTimer);
  }, []);

  const handleFetchLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocStatus("error");
      setLocationName("Geolocation not supported");
      return;
    }

    setLocStatus("loading");
    setLocationName("Detecting location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        setLocStatus("success");
        setLocationName(`GPS Location Detected`);
      },
      (error) => {
        console.warn("Location permission issue:", error.message);
        setLocStatus("error");
        setLocationName("Location access denied or failed");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleOrderChoice = (type: OrderType) => {
    setOrderType(type);
  };

  const handleSelect = () => {
    if (orderType === "delivery" && locStatus !== "success") return;

    sessionStorage.setItem(
      "userLocation",
      JSON.stringify({
        orderType,
        city: "Lahore",
        deliveryZone: "Samanabad",
        branch: "Zee Food Gallery - Samanabad",
        address: orderType === "pickup" ? PICKUP_ADDRESS : locationName,
        coordinates: userCoords,
        timestamp: new Date().toISOString(),
      }),
    );
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const isPickup = orderType === "pickup";
  const isDeliveryLocationReady = !isPickup && locStatus === "success"; 
  const isButtonDisabled = !isPickup && locStatus !== "success"; 

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-brand-dark/70 p-4 backdrop-blur-[8px] animate-in fade-in duration-300 ease-in-out">
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-white/80 bg-gradient-to-br from-white via-orange-50/80 to-brand-surface px-5 py-5 shadow-[0_30px_100px_rgba(0,0,0,0.20),0_8px_28px_rgba(248,114,5,0.10)] animate-in zoom-in-95 duration-300 ease-in-out sm:px-7">
        <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(248,114,5,0.12),rgba(255,255,255,0.72)_44%,rgba(248,114,5,0.08)),radial-gradient(circle_at_80%_35%,rgba(248,114,5,0.16),transparent_34%),radial-gradient(circle_at_10%_18%,rgba(17,24,39,0.06),transparent_28%)]" />

        <button
          type="button"
          aria-label="Close order modal"
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full text-brand-dark/65 transition-all duration-300 hover:bg-brand-primary/10 hover:text-brand-primary"
        >
          <X className="h-5 w-5" strokeWidth={2.1} />
        </button>

        <div className="relative z-10">
          <header className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-brand-primary/20 bg-white/95 shadow-[inset_0_0_0_7px_rgba(248,114,5,0.08),0_14px_28px_rgba(248,114,5,0.16)]">
                <div className="relative h-12 w-12">
                  <Image src="/fiery-wok.png" alt="Ama G Ka Dhaba logo" fill className="object-contain" priority />
                </div>
              </div>
              <div className="min-w-0 text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/45">Zee Food Gallery</p>
                <h2 lang="ur" dir="rtl" className="font-ama-dhaba text-[30px] font-bold leading-tight text-brand-primary">
                  اماں جی کا ڈھابہ
                </h2>
              </div>
            </div>
          </header>

          <section className="mt-5">
            <div className="flex justify-center">
              <div className="inline-grid grid-cols-2 gap-1.5 rounded-full border border-brand-primary/15 bg-white/90 p-1 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">
                <OrderPill active={orderType === "delivery"} onClick={() => handleOrderChoice("delivery")}>
                  Delivery
                </OrderPill>
                <OrderPill active={orderType === "pickup"} onClick={() => handleOrderChoice("pickup")}>
                  Pick-Up
                </OrderPill>
              </div>
            </div>

            <div className="mt-5 text-center">
              <p className="text-base font-black text-brand-dark">Your Location</p>
            </div>

            {!isPickup ? (
              <div className="mt-3 space-y-3.5">
                <div className="mx-auto w-full max-w-[330px]">
                  
                  {/* IDLE STATE */}
                  {locStatus === "idle" && (
                    <button
                      type="button"
                      onClick={handleFetchLocation}
                      className="group flex min-h-11 w-full items-center justify-center gap-2.5 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-bold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-300 hover:bg-gray-100"
                    >
                      <LocateFixed className="h-4 w-4 text-gray-600 transition-transform group-hover:scale-110" />
                      Use Current Location
                    </button>
                  )}

                  {/* LOADING & SUCCESS STATE */}
                  {(locStatus === "loading" || locStatus === "success") && (
                    <button
                      type="button"
                      disabled={locStatus === "loading"}
                      className="flex min-h-11 w-full items-center justify-between gap-2.5 rounded-full border border-brand-primary/20 bg-white/95 px-4.5 py-2 text-left shadow-sm transition-all duration-300"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                          {locStatus === "loading" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Navigation className="h-3.5 w-3.5 fill-current" />
                          )}
                        </div>
                        <span className="truncate text-xs font-bold text-brand-dark/80">
                          {locationName}
                        </span>
                      </div>
                      {locStatus === "success" && (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  )}

                  {/* PERFECTLY MATCHED ERROR STATE (Based on your image) */}
                  {locStatus === "error" && (
                    <button
                      type="button"
                      onClick={handleFetchLocation}
                      className="flex min-h-[52px] w-full items-center justify-between rounded-full border border-red-200/80 bg-[#fff3f3] p-1.5 pr-2 shadow-sm transition-all duration-300 hover:border-red-300 hover:bg-[#ffeaea]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ffdfdf] text-[#ea333e]">
                          <Navigation className="h-4 w-4 fill-current" />
                        </div>
                        <span className="truncate text-[13px] font-bold text-[#ea333e]">
                          {locationName}
                        </span>
                      </div>
                      <span className="shrink-0 rounded-full bg-[#ffdfdf] px-4 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#ea333e]">
                        Retry
                      </span>
                    </button>
                  )}
                </div>

                {/* Delivery Zone (Shows ONLY AFTER successful fetch) */}
                {isDeliveryLocationReady && (
                  <div className="text-center relative z-10 animate-in slide-in-from-top-2 fade-in duration-300">
                    <span className="mb-1 block text-xs font-black uppercase tracking-wider text-brand-dark/50">
                      Delivery Zone
                    </span>
                    <div className="relative mx-auto w-full max-w-[330px]">
                      <div className="mx-auto inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-brand-primary/15 bg-white/95 px-5 text-center text-sm font-black text-brand-dark shadow-sm">
                        <MapPin className="h-4 w-4 text-brand-primary" />
                        <span>Samanabad</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-3 text-center">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Zee Food Gallery, " + PICKUP_ADDRESS)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand-primary/15 bg-white/90 px-6 text-sm font-bold text-brand-dark shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/35 hover:bg-brand-primary/10"
                >
                  <MapPin className="h-4 w-4 text-brand-primary" />
                  Open in Google Maps
                </a>
              </div>
            )}

            <button
              onClick={handleSelect}
              disabled={isButtonDisabled}
              className={`mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full px-7 text-sm font-black transition-all duration-300 ease-in-out ${
                isButtonDisabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-brand-primary text-white shadow-[0_16px_32px_rgba(248,114,5,0.24)] hover:-translate-y-0.5 hover:bg-brand-primary/90 hover:shadow-[0_18px_34px_rgba(248,114,5,0.30)]"
              }`}
            >
              (Only in Samanabad)
            </button>
          </section>

          <footer className="mt-5 flex items-center justify-center gap-2 rounded-full border border-brand-primary/15 bg-white/90 px-4 py-2 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-brand-dark/45">Powered by</span>
            <span className="relative h-5 w-20">
              <Image src="/devsinnlogo0.svg" alt="Devsinn Technologies" fill className="object-contain" />
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}

function OrderPill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-10 min-w-28 rounded-full border px-6 text-sm font-bold transition-all duration-300 ${
        active
          ? "border-brand-primary bg-brand-primary text-white shadow-[0_10px_22px_rgba(248,114,5,0.24)]"
          : "border-transparent bg-transparent text-brand-dark/70 hover:bg-brand-primary/10 hover:text-brand-primary"
      }`}
    >
      {children}
    </button>
  );
}