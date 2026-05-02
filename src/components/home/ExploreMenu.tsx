"use client";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  { id: 1, name: "Daal Chawal", image: "/images/home/menu/daal_chawal.png" },
  { id: 2, name: "Chicken Karahi", image: "/images/home/menu/chicken_karahi.png" },
  { id: 3, name: "Chicken Biryani", image: "/images/home/menu/chicken_biryani.png" },
  { id: 4, name: "Seekh Kebab", image: "/images/home/menu/seekh_kebab.png" },
  { id: 5, name: "Samosa Chaat", image: "/images/home/menu/samosa_chaat.png" },
];

import { useRef } from "react";

export default function ExploreMenu() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-brand-light pb-24 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl lg:text-5xl font-black tracking-tighter uppercase font-sans leading-none text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              Explore Our Menu
            </h2>
            <div className="w-24 h-1.5 bg-brand-primary mt-4 rounded-full" />
          </div>
          <div className="flex flex-col items-end">
            <Link 
              href="/menu" 
              className="text-sm font-bold text-brand-dark uppercase tracking-widest hover:text-brand-primary transition-colors"
            >
              VIEW ALL
            </Link>
            <div className="w-16 h-[2px] bg-brand-primary mt-2 rounded-full" />
          </div>
        </div>

        {/* Carousel / Grid Area */}
        <div className="relative flex items-center">
          
          <button 
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-6 z-10 w-12 h-12 rounded-full bg-brand-white border border-brand-dark/10 text-brand-primary items-center justify-center hover:bg-brand-primary hover:text-brand-white transition-all shadow-lg hover:scale-110 cursor-pointer"
          >
            <svg className="w-6 h-6 ml-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div 
            ref={scrollRef}
            className="w-full flex justify-between gap-6 overflow-x-auto pb-12 pt-6 snap-x no-scrollbar px-4"
          >
            {menuItems.map((item, index) => (
              <div 
                key={item.id} 
                className="flex-none w-[240px] bg-brand-white pt-8 pb-8 px-6 flex flex-col items-center relative group cursor-pointer shadow-sm hover:shadow-[0_20px_40px_rgba(230,57,70,0.1)] hover:-translate-y-3 transition-all duration-300 snap-center shrink-0 border border-brand-dark/5"
                style={{ borderRadius: '30px 100px 30px 100px' }}
              >
                {/* Circular Image Container to crop out the square white background */}
                <div className="w-40 h-40 relative mb-6 rounded-full overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.08)] border-4 border-brand-light">
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-brand-dark font-black text-center text-lg leading-tight uppercase tracking-wide group-hover:text-brand-primary transition-colors">
                  {item.name}
                </h3>
                <div className="w-12 h-[3px] bg-brand-secondary mt-4 rounded-full transition-all duration-300 opacity-100 group-hover:w-20 group-hover:bg-brand-primary" />
                <div className="absolute bottom-6 right-6 w-4 h-4 rounded-full bg-brand-secondary/20 group-hover:bg-brand-primary transition-colors duration-300" />
              </div>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-6 z-10 w-12 h-12 rounded-full bg-brand-primary text-brand-white items-center justify-center hover:bg-[#b0222e] transition-all shadow-lg hover:scale-110 cursor-pointer"
          >
            <svg className="w-6 h-6 ml-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>

        </div>
      </div>
    </section>
  );
}
