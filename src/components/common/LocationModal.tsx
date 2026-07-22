"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, LocateFixed, X } from "lucide-react";

type OrderType = "delivery" | "pickup";

const PICKUP_ADDRESS = "464-Sirhindi Road, Near Gourmet Bakers, First Round About, Samanabad, Lahore";

export default function LocationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [location, setLocation] = useState("");
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => setIsOpen(true), 500);
    return () => clearTimeout(openTimer);
  }, []);

  const handleOrderChoice = (type: OrderType) => {
    setOrderType(type);
    setLocation("");
    setIsSelectorOpen(false);
  };

  const handleUseCurrentLocation = () => {
    setLocation(orderType === "pickup" ? "Zee Food Gallery - Samanabad" : "Samanabad");
    setIsSelectorOpen(false);
  };

  const handleSelect = () => {
    if (!location) return;

    sessionStorage.setItem(
      "userLocation",
      JSON.stringify({
        orderType,
        city: "Lahore",
        area: orderType === "delivery" ? location : "Samanabad",
        branch: orderType === "pickup" ? location : undefined,
        address: orderType === "pickup" ? PICKUP_ADDRESS : undefined,
        timestamp: new Date().toISOString(),
      }),
    );
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const isPickup = orderType === "pickup";
  const options = isPickup ? ["Zee Food Gallery - Samanabad"] : ["Samanabad"];

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
              <p className="text-base font-black text-brand-dark">Please select your {isPickup ? "branch" : "area"}</p>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="mt-3 inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-brand-primary/15 bg-white/90 px-6 text-sm font-bold text-brand-dark shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/35 hover:bg-brand-primary/10"
              >
                <LocateFixed className="h-4 w-4" />
                Use Current Location
              </button>
            </div>

            <div className="mt-4">
              <SelectorField
                label={isPickup ? "Select Branch" : "Select Area / Sub Region"}
                value={location}
                placeholder={isPickup ? "Select Branch" : "Select Area / Sub Region"}
                open={isSelectorOpen}
                options={options}
                onToggle={() => setIsSelectorOpen((open) => !open)}
                onChange={(value) => {
                  setLocation(value);
                  setIsSelectorOpen(false);
                }}
              />
            </div>

            <button
              disabled={!location}
              onClick={handleSelect}
              className={`mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full px-7 text-sm font-black transition-all duration-300 ease-in-out ${
                location
                  ? "bg-brand-primary text-white shadow-[0_16px_32px_rgba(248,114,5,0.24)] hover:-translate-y-0.5 hover:bg-brand-primary/90 hover:shadow-[0_18px_34px_rgba(248,114,5,0.30)]"
                  : "bg-[#cfcfcf] text-brand-dark/35"
              }`}
            >
              {isPickup ? "Confirm Pickup" : "Select"}
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

function SelectorField({
  label,
  value,
  placeholder,
  open,
  options,
  onToggle,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  open: boolean;
  options: string[];
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <div className={`text-center transition-all duration-200 ${open ? "relative z-20" : "relative z-10"}`}>
      <span className="mb-1.5 block text-sm font-black text-brand-dark">{label}</span>
      <div className="relative mx-auto w-full max-w-[330px]">
        <button
          type="button"
          aria-expanded={open}
          onClick={onToggle}
          className={`mx-auto inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full border bg-white/95 px-5 text-center text-sm font-black shadow-sm transition-all duration-300 ${
            open
              ? "border-brand-primary text-brand-primary shadow-[0_14px_26px_rgba(248,114,5,0.14)]"
              : "border-brand-primary/15 text-brand-dark/75 hover:border-brand-primary/35 hover:text-brand-primary"
          }`}
        >
          <span>{value || placeholder}</span>
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="mx-auto mt-2 w-[88%] overflow-hidden rounded-2xl border border-brand-primary/15 bg-white shadow-[0_12px_24px_rgba(17,24,39,0.08)] animate-in fade-in slide-in-from-top-1 duration-150">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange(option)}
                className="relative flex min-h-10 w-full items-center justify-center px-5 text-center text-sm font-bold text-brand-dark transition-colors duration-200 hover:bg-brand-primary/10 hover:text-brand-primary"
              >
                <span>{option}</span>
                {value === option && <Check className="absolute right-5 h-4 w-4 text-brand-primary" strokeWidth={2.4} />}
              </button>
            ))}
          </div>
        )}
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
