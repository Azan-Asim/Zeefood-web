"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { allMenuItems } from "@/data/menuData";

export default function OrderPage() {
  const { t, language } = useLanguage();
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [activeCategory, setActiveCategory] = useState("Popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState<any>(null);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  useEffect(() => {
    const loc = sessionStorage.getItem("userLocation");
    if (loc) setUserLocation(JSON.parse(loc));
  }, []);

  const categories = ["Popular", "Karahi", "Biryani", "BBQ", "Sides", "Deals"];

  const filteredItems = allMenuItems.filter(i => {
    const matchesCategory = activeCategory === "Popular" ? (i.popular || i.category === "Deals") : i.category === activeCategory;
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (i.nameUr && i.nameUr.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  const deliveryFee = cartTotal > 0 ? 150 : 0;
  const totalAmount = cartTotal + deliveryFee;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const locationData = userLocation || { area: "Not specified", city: "Not specified", orderType: "delivery" };
    let message = `*NEW ORDER - ZEE FOOD GALLERY*\n\n`;
    message += `*Order Type:* ${locationData.orderType === 'delivery' ? '🚀 Delivery' : '🛍️ Pick-Up'}\n`;
    message += `*Location:* ${locationData.area}, ${locationData.city}\n\n`;
    message += `*ITEMS:*\n`;
    cart.forEach(c => {
      message += `- ${c.item.name} (${c.item.nameUr}) (x${c.quantity}) - ${c.item.price}\n`;
    });
    message += `\n*Subtotal:* Rs. ${cartTotal.toLocaleString()}\n`;
    message += `*Delivery:* Rs. ${deliveryFee}\n`;
    message += `*Total Amount:* Rs. ${totalAmount.toLocaleString()}\n`;
    message += `\n--------------------------\n`;
    message += `Please confirm my order. Thank you!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/923136933988?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="h-[calc(100vh-90px)] bg-white flex flex-col font-sans overflow-hidden mt-[90px]">
      <div className="flex-1 max-w-[1600px] mx-auto w-full flex flex-col md:flex-row relative overflow-hidden">

        {/* Main Menu Area */}
        <div className="flex-1 px-4 sm:px-6 pt-10 pb-32 md:pb-8 md:pr-8 md:border-r border-black/5 overflow-y-auto no-scrollbar">
          <div className="mb-14">
            <h1 className={`text-2xl lg:text-3xl font-black text-[#1a0a04] tracking-tight mb-2 ${language === "UR" ? "text-right" : ""}`}>
              {t("orderDelivery")}
            </h1>
            <p className={`text-[#6b5a50] font-medium text-xs lg:text-sm ${language === "UR" ? "text-right" : ""}`}>
              {t("exclusiveChefMeals")}
            </p>

            <div className={`flex gap-3 mt-8 overflow-x-auto pb-4 no-scrollbar ${language === "UR" ? "flex-row-reverse" : ""}`}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                    ? "bg-[#E63946] text-white shadow-md scale-105"
                    : "bg-white text-[#6b5a50] border border-[#f0e4dc] hover:border-[#d4a898] hover:bg-[#fdfcfb]"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-8 pt-10">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="group relative flex flex-col items-center text-center p-7 pt-0 rounded-[35px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-4 bg-[#fef3c7] border-2 border-[#fde68a]"
              >
                <Link href={`/product/${item.slug}`} className="absolute -top-16 w-44 h-44 transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2 drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]">
                  <div className="w-full h-full relative z-10 border-4 border-white shadow-inner rounded-full bg-white group-hover:border-brand-primary/20 transition-colors duration-500 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700 mix-blend-multiply" unoptimized />
                  </div>
                  {item.popular && (
                    <div className="absolute top-4 right-0 z-20 bg-[#E63946] text-white text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full shadow-lg">
                      Best Seller
                    </div>
                  )}
                </Link>

                <div className="h-28 w-full" />
                
                <Link href={`/product/${item.slug}`} className="flex-1 flex flex-col">
                  <h3 className="font-black text-[#1a0a04] text-lg leading-tight group-hover:text-[#E63946] transition-colors flex flex-col items-center mb-2">
                    <span>{item.name}</span>
                    <span className="text-sm font-bold opacity-70">({item.nameUr})</span>
                  </h3>
                  <p className="text-[10px] font-bold text-[#a09080] uppercase tracking-widest mb-4">{item.category}</p>

                  <div className={`flex items-center justify-center gap-3 text-xs font-semibold text-[#6b5a50] mb-5 ${language === "UR" ? "flex-row-reverse" : ""}`}>
                    <span className="flex items-center gap-1"><span className="text-[#F4A261]">★</span> 4.9</span>
                    <span className="w-1 h-1 bg-[#d8c8be] rounded-full"></span>
                    <span>{language === "UR" ? item.details.prepTimeUr : item.details.prepTime}</span>
                  </div>
                </Link>

                <div className="mt-auto flex flex-col items-center w-full">
                  <span className="text-2xl font-black text-[#1a0a04] mb-5">{item.price}</span>
                  <button
                    onClick={() => {
                      addToCart(item);
                      // Auto open cart on mobile if it's the first item
                      if (cart.length === 0) setIsMobileCartOpen(true);
                    }}
                    className="w-full py-4 px-6 bg-white text-brand-dark font-black text-[11px] uppercase tracking-[0.15em] rounded-full shadow-sm hover:bg-[#E63946] hover:text-white transition-all duration-300 border border-[#fde68a] group-hover:border-transparent"
                  >
                    {t("orderNow")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Sidebar / Cart */}
        <div className="hidden md:flex w-[380px] lg:w-[420px] flex-col h-full bg-[#faf8f5] border-l border-[#ebe3d9] shadow-[-10px_0_40px_rgba(0,0,0,0.03)] overflow-hidden">
          <CartContent />
        </div>

        {/* Mobile Cart Button / Summary Bar */}
        {cart.length > 0 && !isMobileCartOpen && (
          <div className="md:hidden fixed bottom-6 left-4 right-4 z-[90] animate-in fade-in slide-in-from-bottom-10">
            <button 
              onClick={() => setIsMobileCartOpen(true)}
              className="w-full bg-[#E63946] text-white p-4 rounded-[20px] shadow-2xl flex items-center justify-between font-black uppercase tracking-widest text-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xs">{cart.reduce((acc, c) => acc + c.quantity, 0)}</span>
                </div>
                <span>View Your Order</span>
              </div>
              <span>Rs. {totalAmount.toLocaleString()}</span>
            </button>
          </div>
        )}

        {/* Mobile Cart Drawer */}
        <div className={`md:hidden fixed inset-0 z-[200] transition-transform duration-500 ${isMobileCartOpen ? "translate-y-0" : "translate-y-full"}`}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileCartOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-[40px] flex flex-col overflow-hidden shadow-2xl">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2" onClick={() => setIsMobileCartOpen(false)} />
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
              <h2 className="text-xl font-black text-brand-dark uppercase tracking-tight">{t("yourOrder")}</h2>
              <button onClick={() => setIsMobileCartOpen(false)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col">
              <CartContent onCheckout={() => setIsMobileCartOpen(false)} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  function CartContent({ onCheckout }: { onCheckout?: () => void }) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <div className="hidden md:flex px-8 py-5 border-b border-[#ebe3d9] bg-white/50 backdrop-blur-md">
          <h2 className={`text-xl font-black text-[#1a0a04] tracking-tight flex items-center gap-3 ${language === "UR" ? "flex-row-reverse" : ""}`}>
            <span className="w-8 h-px bg-[#E63946]"></span>
            {t("yourOrder")}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 flex flex-col gap-5 no-scrollbar">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#a09080] opacity-70">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-5">
                <svg className="w-8 h-8 text-[#d4a898]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <p className="font-bold text-lg text-[#3d2414] mb-1">{t("emptyCart")}</p>
              <p className="text-sm font-medium">Start adding items to your meal.</p>
            </div>
          ) : (
            cart.map((c, i) => (
              <div key={i} className={`flex gap-4 items-center group ${language === "UR" ? "flex-row-reverse" : ""}`}>
                <div className="w-16 h-16 bg-white border border-[#ebe3d9] shadow-sm rounded-2xl flex items-center justify-center relative overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Image src={c.item.image} alt={c.item.name} fill className="object-cover mix-blend-multiply" unoptimized />
                </div>
                <div className={`flex-1 min-w-0 ${language === "UR" ? "text-right" : ""}`}>
                  <h4 className="font-bold text-[#1a0a04] text-sm leading-tight mb-1 truncate flex flex-col">
                    <span>{c.item.name}</span>
                    <span className="text-[10px] opacity-70">({c.item.nameUr})</span>
                  </h4>
                  <span className="text-[#E63946] font-black text-xs">{c.item.price}</span>
                </div>
                <div className={`flex items-center gap-1.5 bg-white border border-[#ebe3d9] rounded-full p-1 shrink-0 ${language === "UR" ? "flex-row-reverse" : ""}`}>
                  <button onClick={() => updateQuantity(c.item.id, -1)} className="w-6 h-6 rounded-full flex items-center justify-center text-[#a09080] hover:bg-[#fdf2ec] hover:text-[#E63946]">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                  </button>
                  <span className="text-sm font-black text-[#1a0a04] w-4 text-center">{c.quantity}</span>
                  <button onClick={() => updateQuantity(c.item.id, 1)} className="w-6 h-6 rounded-full flex items-center justify-center text-[#a09080] hover:bg-[#fdf2ec] hover:text-[#E63946]">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-6 md:px-8 py-7 bg-white border-t border-[#ebe3d9]">
          <div className={`flex justify-between items-center mb-3 ${language === "UR" ? "flex-row-reverse" : ""}`}>
            <span className="text-[#6b5a50] font-medium text-xs tracking-wide uppercase">{t("subtotal")}</span>
            <span className="text-[#1a0a04] font-black">Rs. {cartTotal.toLocaleString()}</span>
          </div>
          <div className={`flex justify-between items-center mb-6 ${language === "UR" ? "flex-row-reverse" : ""}`}>
            <span className="text-[#6b5a50] font-medium text-xs tracking-wide uppercase">{t("deliveryFee")}</span>
            <span className="text-[#1a0a04] font-black">Rs. {deliveryFee}</span>
          </div>
          <div className="w-full h-px border-t border-dashed border-[#d4a898] mb-5"></div>
          <div className={`flex justify-between items-center mb-8 ${language === "UR" ? "flex-row-reverse" : ""}`}>
            <span className="text-[#1a0a04] font-black text-xl">{t("total")}</span>
            <span className="text-[#E63946] font-black text-3xl">Rs. {totalAmount.toLocaleString()}</span>
          </div>
          <button
            disabled={cart.length === 0}
            onClick={() => {
              handleCheckout();
              if (onCheckout) onCheckout();
            }}
            className="w-full py-4 rounded-2xl font-black text-white text-base bg-[#E63946] shadow-xl shadow-brand-primary/20 disabled:opacity-50 active:scale-95 transition-transform"
          >
            {t("checkout")}
          </button>
        </div>
      </div>
    );
  }
}
