"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function SignatureDesi() {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleAddToCart = (item: any) => {
    addToCart(item);
    router.push("/order");
  };

  const desiItems = [
    {
      id: 1,
      name: "Special Mutton Karahi",
      nameUr: "خصوصی مٹن کڑاہی",
      description: "Authentic Peshawari style mutton karahi cooked with fresh tomatoes and green chilies.",
      descriptionUr: "اصلی پشاوری سٹائل مٹن کڑاہی جو تازہ ٹماٹروں اور ہری مرچوں کے ساتھ تیار کی جاتی ہے۔",
      price: "Rs. 2,499",
      image: "/images/home/desi/karahi_transparent.png",
      bgClass: "bg-gradient-to-br from-[#fdfcf0] to-[#fff9f5]",
      details: {
        recipe: "Our mutton is slow-cooked in a traditional heavy-bottomed karahi with fresh, vine-ripened tomatoes and our secret blend of hand-ground spices.",
        recipeUr: "ہمارا مٹن روایتی بھاری پیندے والی کڑاہی میں ہلکی آنچ پر پکایا جاتا ہے۔",
        ingredients: ["Prime Mutton", "Fresh Tomatoes", "Green Chilies", "Hand-ground Spices", "Pure Ginger & Garlic"],
        ingredientsUr: ["بہترین مٹن", "تازہ ٹماٹر", "ہری مرچیں", "ہاتھ سے پسے مصالحے", "خالص ادرک اور لہسن"],
        prepTime: "45-60 mins",
        prepTimeUr: "45-60 منٹ"
      }
    },
    {
      id: 2,
      name: "Nawabi Chicken Biryani",
      nameUr: "نوابی چکن بریانی",
      description: "Aromatic basmati rice layered with tender chicken, infused with saffron.",
      descriptionUr: "خوشبودار باسمتی چاول اور نرم چکن کی تہیں، زعفران کی مہک کے ساتھ۔",
      price: "Rs. 1,299",
      image: "/images/home/desi/biryani_transparent.png",
      bgClass: "bg-gradient-to-br from-[#fdfcf0] to-[#fff9f5]",
      details: {
        recipe: "This biryani is prepared in the 'Dum' style. We marinate the chicken overnight in yogurt and spices, then slow-cook it in a sealed pot.",
        recipeUr: "یہ بریانی 'دم' سٹائل میں تیار کی جاتی ہے۔ ہم چکن کو رات بھر دہی اور مصالحوں میں میرینیٹ کرتے ہیں۔",
        ingredients: ["Long-grain Basmati Rice", "Tender Chicken", "Saffron", "Fresh Mint", "Aromatic Biryani Masala"],
        ingredientsUr: ["طویل باسمتی چاول", "نرم چکن", "زعفران", "تازہ پودینہ", "خوشبودار بریانی مصالحہ"],
        prepTime: "40-50 mins",
        prepTimeUr: "40-50 منٹ"
      }
    },
    {
      id: 3,
      name: "Sizzling Beef Seekh Kebab",
      nameUr: "سیزلنگ بیف سیخ کباب",
      description: "Juicy minced beef marinated with traditional herbs and grilled over charcoal.",
      descriptionUr: "روایتی جڑی بوٹیوں میں میرینیٹ شدہ رسیلا قیمہ، کوئلوں پر گرل کیا ہوا۔",
      price: "Rs. 1,899",
      image: "/images/home/desi/kebab_transparent.png",
      bgClass: "bg-gradient-to-br from-[#fdfcf0] to-[#fff9f5]",
      details: {
        recipe: "We use the finest minced beef with traditional herbs and spices, then manually skewered and grilled over slow-burning charcoal.",
        recipeUr: "ہم بہترین بیف قیمہ استعمال کرتے ہیں جسے ہاتھ سے سیخوں پر چڑھایا جاتا ہے اور سلگتے ہوئے کوئلوں پر گرل کیا جاتا ہے۔",
        ingredients: ["Prime Minced Beef", "Fresh Herbs", "Traditional Spices", "Smoky Charcoal Grill", "Papaya Paste"],
        ingredientsUr: ["اعلیٰ معیار کا بیف قیمہ", "تازہ جڑی بوٹیوں", "روایتی مصالحے", "کوئلے کی گرل", "پپیتے کا پیسٹ"],
        prepTime: "25-30 mins",
        prepTimeUr: "25-30 منٹ"
      }
    },
    {
      id: 4,
      name: "Shahi Nihari",
      nameUr: "شاہی نہاری",
      description: "Slow-cooked beef shank in a rich, spicy bone marrow gravy.",
      descriptionUr: "ہلکی آنچ پر پکی ہوئی بیف نہاری، گاڑھی اور مصالحے دار گریوی کے ساتھ۔",
      price: "Rs. 1,599",
      image: "/images/home/desi/nihari_transparent.png",
      bgClass: "bg-gradient-to-br from-[#fdfcf0] to-[#fff9f5]",
      details: {
        recipe: "Our Nihari is slow-cooked for 8-10 hours in a rich, spicy gravy thickened with flour, resulting in incredibly tender meat.",
        recipeUr: "ہماری نہاری کو 8-10 گھنٹے تک ایک بھرپور مصالحے دار گریوی میں ہلکی آنچ پر پکایا جاتا ہے۔",
        ingredients: ["Beef Shank", "Bone Marrow", "Special Nihari Spices", "Pure Ghee", "Fresh Ginger & Lemon"],
        ingredientsUr: ["بیف بونگ", "نلی مخ", "خصوصی نہاری مصالحے", "خالص گھی", "تازہ ادرک اور لیموں"],
        prepTime: "8-10 hours",
        prepTimeUr: "8-10 گھنٹے"
      }
    },
  ];

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
          {desiItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="relative mt-16 lg:mt-20 flex flex-col items-center text-center p-6 lg:p-7 rounded-[35px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(230,57,70,0.15)] transition-all duration-500 hover:-translate-y-4 group cursor-pointer bg-gradient-to-br from-orange-50 to-white"
            >
              <div className="absolute -top-16 lg:-top-20 w-[160px] h-[160px] lg:w-[200px] lg:h-[200px] transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2 drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]">
                <div className="w-full h-full relative z-10 border-4 border-white shadow-inner rounded-full bg-white group-hover:border-brand-primary/20 transition-colors duration-500 overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700" unoptimized />
                </div>
              </div>
              <div className="h-[100px] lg:h-[110px] w-full" />
              <h3 className="text-xl font-black text-brand-dark uppercase tracking-wide mb-3 group-hover:text-brand-primary transition-colors">
                {language === "UR" ? item.nameUr : item.name}
              </h3>
              <p className="text-brand-dark/60 text-sm font-medium mb-6 line-clamp-3">
                {language === "UR" ? item.descriptionUr : item.description}
              </p>
              <div className="mt-auto flex flex-col items-center w-full">
                <span className="text-2xl font-black mb-4" style={{ color: '#F87205' }}>{item.price}</span>
                <button onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }} className="w-full py-3 px-6 bg-brand-white text-brand-dark font-bold text-sm uppercase tracking-widest rounded-full shadow-md group-hover:bg-brand-primary group-hover:text-brand-white transition-all duration-300">
                  {t("addToCart")}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/menu" className="px-10 py-4 bg-transparent border-2 border-brand-primary text-brand-primary font-black uppercase tracking-widest rounded-full hover:bg-brand-primary hover:text-brand-white transition-all duration-300 shadow-lg hover:shadow-[0_15px_30px_rgba(230,57,70,0.3)] hover:-translate-y-1">
            {t("viewMenu")}
          </Link>
        </div>
      </div>

      {/* Item Detail Modal - Compact Design to avoid scroll */}
      {selectedItem && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 lg:p-10 animate-fade-in overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedItem(null)} />

          <div className="relative bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl animate-fade-in-up flex flex-col md:flex-row min-h-[400px] my-auto">

            {/* Left Side: Image (Compact Background) */}
            <div className="md:w-[42%] p-8 flex flex-col items-center justify-center relative bg-gradient-to-br from-[#fdfcf0] to-[#fff9f5]">
              <div className="relative w-full aspect-square max-w-[220px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500">
                <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-contain" unoptimized />
              </div>
              
              <div className="mt-10 flex gap-3 w-full max-w-[280px]">
                <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm text-center">
                  <span className="block text-[9px] font-black text-[#a09080] uppercase tracking-[0.15em] mb-1">Time</span>
                  <span className="text-xs font-black text-[#1a0a04]">{language === "UR" ? selectedItem.details.prepTimeUr : selectedItem.details.prepTime}</span>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm text-center">
                  <span className="block text-[9px] font-black text-[#a09080] uppercase tracking-[0.15em] mb-1">Price</span>
                  <span className="text-xs font-black text-[#1a0a04]">{selectedItem.price}</span>
                </div>
              </div>
            </div>

            {/* Right Side: Details (Pure White) */}
            <div className={`md:w-[58%] p-8 lg:p-10 flex flex-col ${language === "UR" ? "text-right" : "text-left"}`}>
              <button onClick={() => setSelectedItem(null)} className={`absolute top-6 ${language === "UR" ? "left-6" : "right-6"} w-9 h-9 bg-gray-50 text-gray-500 rounded-full flex items-center justify-center hover:bg-[#E63946] hover:text-white transition-all z-20 shadow-sm`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-black text-[#1a0a04] uppercase tracking-tight mb-3">
                  {language === "UR" ? selectedItem.nameUr : selectedItem.name}
                </h2>
                <p className="text-[#6b5a50] font-medium leading-relaxed text-sm mb-6 opacity-90">
                  {language === "UR" ? selectedItem.descriptionUr : selectedItem.description}
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className={`flex items-center gap-2.5 text-[10px] font-black text-[#E63946] uppercase tracking-[0.2em] mb-3 ${language === "UR" ? "flex-row-reverse" : ""}`}>
                      <span className="w-8 h-[2px] bg-[#E63946]" />{t("howItsMade")}
                    </h4>
                    <p className="text-xs font-medium text-[#6b5a50] leading-relaxed italic opacity-80 line-clamp-3">
                      "{language === "UR" ? selectedItem.details.recipeUr : selectedItem.details.recipe}"
                    </p>
                  </div>

                  <div>
                    <h4 className={`flex items-center gap-2.5 text-[10px] font-black text-[#E63946] uppercase tracking-[0.2em] mb-3 ${language === "UR" ? "flex-row-reverse" : ""}`}>
                      <span className="w-8 h-[2px] bg-[#E63946]" />{t("keyIngredients")}
                    </h4>
                    <div className={`flex flex-wrap gap-2 ${language === "UR" ? "justify-end" : "justify-start"}`}>
                      {(language === "UR" ? selectedItem.details.ingredientsUr : selectedItem.details.ingredients).map((ing: string, i: number) => (
                        <span key={i} className="px-4 py-2 bg-gray-50 rounded-full text-[10px] font-bold text-[#6b5a50] border border-gray-100 shadow-sm">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={() => handleAddToCart(selectedItem)} className="w-full mt-8 py-4 bg-[#E63946] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-[#E63946]/30 hover:-translate-y-1 active:scale-95 transition-all">
                {t("addToCart")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
