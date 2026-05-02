"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Placeholder data for the menu
const categories = ["Popular", "Burgers", "Pizza", "Sushi", "Drinks", "Desserts"];

const menuItems = [
  { id: 1, name: "Premium Truffle Burger", category: "Burgers", price: 18.99, rating: 4.9, prepTime: "15-20 min", image: "🍔", popular: true },
  { id: 2, name: "Spicy Volcano Sushi Roll", category: "Sushi", price: 22.50, rating: 4.8, prepTime: "20-25 min", image: "🍣", popular: true },
  { id: 3, name: "Wood-Fired Margherita", category: "Pizza", price: 16.00, rating: 4.7, prepTime: "25-30 min", image: "🍕", popular: false },
  { id: 4, name: "Wagyu Beef Sliders", category: "Burgers", price: 24.99, rating: 5.0, prepTime: "15-20 min", image: "🍔", popular: true },
  { id: 5, name: "Artisan Matcha Latte", category: "Drinks", price: 6.50, rating: 4.6, prepTime: "5-10 min", image: "🍵", popular: false },
  { id: 6, name: "Decadent Lava Cake", category: "Desserts", price: 12.00, rating: 4.9, prepTime: "10-15 min", image: "🍰", popular: true },
];

export default function OrderPage() {
  const [activeCategory, setActiveCategory] = useState("Popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ item: any, quantity: number }[]>([]);
  const [showMobileCart, setShowMobileCart] = useState(false);

  const filteredItems = menuItems.filter(i => {
    const matchesCategory = activeCategory === "Popular" ? i.popular : i.category === activeCategory;
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item: any) => {
    const existing = cart.find(c => c.item.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { item, quantity: 1 }]);
    }
  };

  const cartTotal = cart.reduce((total, c) => total + (c.item.price * c.quantity), 0);

  return (
    <div className="h-[calc(100vh-90px)] bg-[#f8f6f4] flex flex-col font-sans overflow-hidden mt-[90px]">
      
      <div className="flex-1 max-w-[1600px] mx-auto w-full flex flex-col md:flex-row relative overflow-hidden">

        {/* Main Menu Area (Scrollable) */}
        <div className="flex-1 px-6 pt-10 pb-32 md:pb-8 md:pr-8 md:border-r border-black/5 overflow-y-auto no-scrollbar">
          {/* Welcome & Categories */}
          <div className="mb-10">
            <h1 className="text-2xl lg:text-3xl font-black text-[#1a0a04] tracking-tight mb-2">Order Delivery</h1>
            <p className="text-[#6b5a50] font-medium text-xs lg:text-sm">Exclusive, chef-prepared meals delivered in minutes.</p>

            {/* Category Pills */}
            <div className="flex gap-3 mt-8 overflow-x-auto pb-4 no-scrollbar">
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

          {/* Food Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="group bg-white rounded-[24px] p-4 border border-[#f0e4dc] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(230,57,70,0.08)] hover:border-[#fbd5cc] transition-all duration-300 flex flex-col">
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#fdf8f5] to-[#fef2ec] rounded-[16px] mb-4 flex items-center justify-center text-7xl relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                  {item.image}
                  {item.popular && (
                    <div className="absolute top-3 left-3 bg-[#E63946] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      Best Seller
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-black text-[#1a0a04] text-lg leading-tight group-hover:text-[#E63946] transition-colors">{item.name}</h3>
                  </div>
                  <p className="text-xs font-bold text-[#a09080] uppercase tracking-widest mb-3">{item.category}</p>

                  <div className="flex items-center gap-3 text-xs font-semibold text-[#6b5a50] mb-4">
                    <span className="flex items-center gap-1"><span className="text-[#F4A261]">★</span> {item.rating}</span>
                    <span className="w-1 h-1 bg-[#d8c8be] rounded-full"></span>
                    <span>{item.prepTime}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-black text-[#1a0a04]">${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-10 h-10 rounded-full bg-[#fdf2ec] text-[#E63946] flex items-center justify-center hover:bg-[#E63946] hover:text-white transition-all shadow-sm active:scale-90"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- CART DRAWER (MOBILE) --- */}
        <div 
          className={`fixed inset-0 z-[100] transition-transform duration-500 md:hidden ${showMobileCart ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowMobileCart(false)} />
          <div className="absolute bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-[40px] flex flex-col shadow-2xl overflow-hidden">
            <div className="w-12 h-1.5 bg-[#ebe3d9] rounded-full mx-auto mt-4 mb-6" />
            
            <div className="px-8 pb-4 flex justify-between items-center border-b border-[#f0e4dc]">
              <h2 className="text-2xl font-black text-[#1a0a04] tracking-tight">Your Order</h2>
              <button 
                onClick={() => setShowMobileCart(false)}
                className="p-2 bg-gray-50 rounded-full text-[#6b5a50]"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-[#a09080] opacity-70">
                  <p className="font-bold text-lg text-[#3d2414]">Empty Cart</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cart.map((c, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className="w-14 h-14 bg-[#fdf8f5] rounded-xl flex items-center justify-center text-2xl border border-[#f0e4dc]">{c.item.image}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#1a0a04] text-sm leading-tight">{c.item.name}</h4>
                        <span className="text-[#E63946] font-black text-sm">${c.item.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-[#fdf2ec] rounded-full p-1 border border-[#f0e4dc]">
                        <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#E63946]" onClick={() => {
                           if(c.quantity > 1) setCart(cart.map(item => item.item.id === c.item.id ? {...item, quantity: item.quantity - 1} : item));
                           else setCart(cart.filter(item => item.item.id !== c.item.id));
                        }}><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg></button>
                        <span className="text-xs font-black text-[#1a0a04] w-4 text-center">{c.quantity}</span>
                        <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#E63946]" onClick={() => addToCart(c.item)}><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-8 py-8 bg-[#faf8f5] border-t border-[#f0e4dc]">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#1a0a04] font-black text-xl">Total</span>
                <span className="text-[#E63946] font-black text-3xl">${cartTotal > 0 ? (cartTotal + 2.99).toFixed(2) : "0.00"}</span>
              </div>
              <button className="w-full py-4 bg-[#E63946] text-white rounded-2xl font-black text-lg shadow-xl shadow-brand-primary/20">Checkout</button>
            </div>
          </div>
        </div>

        {/* --- MOBILE STICKY BOTTOM BAR --- */}
        {cart.length > 0 && !showMobileCart && (
          <div className="fixed bottom-6 left-6 right-6 z-[90] md:hidden">
            <button 
              onClick={() => setShowMobileCart(true)}
              className="w-full bg-[#1a0a04] text-white p-4 rounded-[2rem] flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.03)] animate-fade-in"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center font-black">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </div>
                <span className="font-black text-sm uppercase tracking-widest">View Your Order</span>
              </div>
              <span className="text-xl font-black">${(cartTotal + 2.99).toFixed(2)}</span>
            </button>
          </div>
        )}

        {/* Sidebar / Cart (Desktop - Fixed) */}
        <div className="hidden md:flex w-[380px] lg:w-[420px] flex-col h-full bg-[#faf8f5] border-l border-[#ebe3d9] shadow-[-10px_0_40px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="px-8 py-5 border-b border-[#ebe3d9] bg-white/50 backdrop-blur-md">
            <h2 className="text-xl font-black text-[#1a0a04] tracking-tight flex items-center gap-3">
              <span className="w-8 h-px bg-[#E63946]"></span>
              Your Order
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-5 no-scrollbar">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-[#a09080] opacity-70">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-5">
                  <svg className="w-8 h-8 text-[#d4a898]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="font-bold text-lg text-[#3d2414] mb-1">Your cart is empty</p>
                <p className="text-sm font-medium">Add premium dishes to get started.</p>
              </div>
            ) : (
              cart.map((c, i) => (
                <div key={i} className="flex gap-4 items-center group">
                  <div className="w-16 h-16 bg-white border border-[#ebe3d9] shadow-sm rounded-2xl flex items-center justify-center text-3xl group-hover:scale-105 transition-transform duration-300">
                    {c.item.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#1a0a04] text-[0.95rem] leading-tight mb-1">{c.item.name}</h4>
                    <span className="text-[#E63946] font-black text-sm">${c.item.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white border border-[#ebe3d9] rounded-full p-1 shadow-sm">
                    <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#a09080] hover:bg-[#fdf2ec] hover:text-[#E63946] transition-colors" onClick={() => {
                       if(c.quantity > 1) setCart(cart.map(item => item.item.id === c.item.id ? {...item, quantity: item.quantity - 1} : item));
                       else setCart(cart.filter(item => item.item.id !== c.item.id));
                    }}><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg></button>
                    <span className="text-sm font-black text-[#1a0a04] w-4 text-center">{c.quantity}</span>
                    <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#a09080] hover:bg-[#fdf2ec] hover:text-[#E63946] transition-colors" onClick={() => addToCart(c.item)}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="px-8 py-7 bg-white border-t border-[#ebe3d9] shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#6b5a50] font-medium text-sm tracking-wide uppercase">Subtotal</span>
              <span className="text-[#1a0a04] font-black">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-[#6b5a50] font-medium text-sm tracking-wide uppercase">Delivery</span>
              <span className="text-[#1a0a04] font-black">{cartTotal > 0 ? "$2.99" : "$0.00"}</span>
            </div>
            <div className="w-full h-px border-t border-dashed border-[#d4a898] mb-5"></div>
            <div className="flex justify-between items-center mb-8">
              <span className="text-[#1a0a04] font-black text-xl">Total</span>
              <span className="text-[#E63946] font-black text-3xl">${cartTotal > 0 ? (cartTotal + 2.99).toFixed(2) : "0.00"}</span>
            </div>
            <button disabled={cart.length === 0} className="relative w-full py-4 rounded-2xl font-black text-white text-base tracking-wide overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(230,57,70,0.45)] shadow-[0_6px_20px_rgba(230,57,70,0.3)] bg-gradient-to-br from-[#E63946] via-[#d42e3a] to-[#b02030] disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none">
              <span className="relative z-10 flex items-center justify-center gap-2">Checkout <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
