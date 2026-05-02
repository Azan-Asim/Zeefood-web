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
    <div className="min-h-screen bg-[#f8f6f4] flex flex-col font-sans">
      {/* App Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-black/5 px-6 lg:px-12 h-[72px] flex items-center justify-between shadow-sm">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12 transition-transform duration-500 group-hover:rotate-[360deg]">
            <Image src="/fiery-wok.png" alt="Fiery Wok Logo" fill className="object-contain" priority />
          </div>
          <span className="font-black text-brand-dark text-2xl tracking-tighter hidden sm:block">
            Zee<span className="text-brand-primary">Food</span>
          </span>
        </Link>

        {/* Search bar placeholder */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-[#a09080]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search premium dishes..." 
            className="w-full bg-[#fdf8f5] border border-[#f0e4dc] rounded-full py-2.5 pl-11 pr-4 text-sm font-medium text-[#1a0a04] focus:outline-none focus:border-[#E63946] focus:bg-white transition-all placeholder:text-[#c0a898]" 
          />
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-sm font-bold text-[#6b5a50] hover:text-[#E63946]">Log In</Link>
          <div className="relative p-2 bg-[#fdf2ec] text-[#E63946] rounded-full cursor-pointer hover:bg-[#fbd5cc] transition-colors md:hidden">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E63946] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-[1600px] mx-auto w-full flex flex-col md:flex-row relative">

        {/* Main Menu Area */}
        <div className="flex-1 px-6 py-8 md:pr-8 md:border-r border-black/5">
          {/* Welcome & Categories */}
          <div className="mb-10">
            <h1 className="text-3xl font-black text-[#1a0a04] tracking-tight mb-2">Order Delivery</h1>
            <p className="text-[#6b5a50] font-medium text-sm">Exclusive, chef-prepared meals delivered in minutes.</p>

            {/* Category Pills */}
            <div className="flex gap-3 mt-8 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                      ? "bg-[#E63946] text-white shadow-md"
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
                {/* Image Placeholder (Emoji for now, could be real image) */}
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
                      className="w-10 h-10 rounded-full bg-[#fdf2ec] text-[#E63946] flex items-center justify-center hover:bg-[#E63946] hover:text-white transition-colors shadow-sm"
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

        {/* Sidebar / Cart (Desktop) */}
        <div className="hidden md:flex w-[380px] lg:w-[420px] flex-col h-[calc(100vh-72px)] sticky top-[72px] bg-[#faf8f5] border-l border-[#ebe3d9] shadow-[-10px_0_40px_rgba(0,0,0,0.03)] z-10">
          <div className="px-8 py-7 border-b border-[#ebe3d9] bg-white/50 backdrop-blur-md">
            <h2 className="text-2xl font-black text-[#1a0a04] tracking-tight flex items-center gap-3">
              <span className="w-8 h-px bg-[#E63946]"></span>
              Your Order
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-5">
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
                  {/* Image/Icon */}
                  <div className="w-16 h-16 bg-white border border-[#ebe3d9] shadow-sm rounded-2xl flex items-center justify-center text-3xl group-hover:scale-105 transition-transform duration-300">
                    {c.item.image}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="font-bold text-[#1a0a04] text-[0.95rem] leading-tight mb-1">{c.item.name}</h4>
                    <span className="text-[#E63946] font-black text-sm">${c.item.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="flex items-center gap-1.5 bg-white border border-[#ebe3d9] rounded-full p-1 shadow-sm">
                    <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#a09080] hover:bg-[#fdf2ec] hover:text-[#E63946] transition-colors" onClick={() => {
                       if(c.quantity > 1) {
                         setCart(cart.map(item => item.item.id === c.item.id ? {...item, quantity: item.quantity - 1} : item));
                       } else {
                         setCart(cart.filter(item => item.item.id !== c.item.id));
                       }
                    }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                    </button>
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
            
            {/* Elegant Divider */}
            <div className="w-full h-px border-t border-dashed border-[#d4a898] mb-5"></div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-[#1a0a04] font-black text-xl">Total</span>
              <span className="text-[#E63946] font-black text-3xl">${cartTotal > 0 ? (cartTotal + 2.99).toFixed(2) : "0.00"}</span>
            </div>
            
            <button 
              disabled={cart.length === 0}
              className="relative w-full py-4 rounded-2xl font-black text-white text-base tracking-wide overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(230,57,70,0.45)] shadow-[0_6px_20px_rgba(230,57,70,0.3)] bg-gradient-to-br from-[#E63946] via-[#d42e3a] to-[#b02030] disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] duration-700 ease-in-out" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Checkout
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
