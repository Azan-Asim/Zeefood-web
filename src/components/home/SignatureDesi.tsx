"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { allMenuItems } from "@/data/menuData";

export default function SignatureDesi() {
  const { t, language } = useLanguage();

  // Filter items for Signature Desi (slugs 6 to 9)
  const desiItems = allMenuItems.filter(item => typeof item.id === 'number' && item.id >= 6 && item.id <= 9);

  return (
    <section className="bg-brand-white pt-24 pb-12 w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tighter uppercase font-sans leading-none text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
            Signature Desi
          </h2>
          <div className="w-24 h-1.5 bg-brand-primary mt-4 rounded-full mb-6" />
          <p className="text-brand-dark/70 font-medium max-w-2xl text-lg">
            Experience the rich, authentic flavors of our heritage with perfectly crafted traditional recipes.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-16">
          {desiItems.map((item, index) => {
            const bgThemes = [
              "bg-[#fecaca]", // Visible Light Red (red-200)
              "bg-[#ffdec1]", // Visible Light Orange (orange-200 variant)
              "bg-[#bbf7d0]", // Visible Light Emerald (emerald-200)
              "bg-[#fef08a]", // Visible Light Amber/Yellow (amber-200)
            ];
            const borderColors = [
              "border-red-300",
              "border-orange-300",
              "border-emerald-300",
              "border-amber-300",
            ];
            
            return (
              <Link
                key={item.id}
                href={`/product/${item.slug}`}
                className={`relative mt-16 lg:mt-20 flex flex-col items-center text-center p-6 lg:p-7 rounded-[35px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-2 ${borderColors[index % 4]} transition-all duration-500 hover:-translate-y-4 group cursor-pointer ${bgThemes[index % 4]}`}
              >
                <div className="absolute -top-16 lg:-top-20 w-[160px] h-[160px] lg:w-[200px] lg:h-[200px] transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2 drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)]">
                  <div className="w-full h-full relative z-10 border-4 border-white shadow-inner rounded-full bg-white group-hover:border-brand-primary/20 transition-colors duration-500 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700" unoptimized />
                  </div>
                </div>
                <div className="h-[100px] lg:h-[110px] w-full" />
                <h3 className="text-xl font-black text-brand-dark uppercase tracking-wide mb-3 group-hover:text-brand-primary transition-colors flex flex-col items-center">
                  <span>{item.name}</span>
                  <span className="text-sm font-bold opacity-80">({item.nameUr})</span>
                </h3>
                <p className="text-brand-dark/70 text-sm font-bold mb-6 line-clamp-3">
                  {language === "UR" ? item.descriptionUr : item.description}
                </p>
                <div className="mt-auto flex flex-col items-center w-full">
                  <span className="text-3xl font-black mb-4 drop-shadow-sm" style={{ color: '#F87205' }}>{item.price}</span>
                  <div className="w-full py-4 px-6 bg-white text-brand-dark font-black text-xs uppercase tracking-widest rounded-full shadow-md group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 border border-gray-100 group-hover:border-transparent">
                    {t("orderNow")}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/menu" className="px-10 py-4 bg-transparent border-2 border-brand-primary text-brand-primary font-black uppercase tracking-widest rounded-full hover:bg-brand-primary hover:text-brand-white transition-all duration-300 shadow-lg hover:shadow-[0_15px_30px_rgba(230,57,70,0.3)] hover:-translate-y-1">
            {t("viewMenu")}
          </Link>
        </div>
      </div>
    </section>
  );
}
