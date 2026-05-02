"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ExploreMenu() {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = (item: any) => {
    addToCart(item);
    router.push("/order");
  };

  const menuItems = [
    {
      id: 1,
      name: "Daal Chawal",
      nameUr: "دال چاول",
      description: "Comfort food at its best. Slow-cooked yellow lentils served with aromatic steamed basmati rice.",
      descriptionUr: "بہترین آرام دہ کھانا۔ خوشبودار باسمتی چاولوں کے ساتھ پیش کی جانے والی ہلکی آنچ پر پکی ہوئی پیلی دال۔",
      price: "Rs. 450",
      image: "/images/home/menu/daal_chawal.png",
      bgClass: "bg-gradient-to-br from-yellow-50 to-orange-50",
      details: {
        recipe: "Our Daal is a blend of Moong and Masoor lentils, slow-cooked for hours with turmeric, salt, and garlic. The 'Tarka' is the secret—sizzling oil with cumin, whole red chilies, and crispy garlic poured over the lentils just before serving.",
        recipeUr: "ہماری دال مونگ اور مسور کا آمیزہ ہے، جسے ہلدی، نمک اور لہسن کے ساتھ گھنٹوں پکایا جاتا ہے۔ اس کا اصل راز 'تڑکہ' ہے—زیرہ، گول لال مرچ اور کڑک لہسن کا گرم تڑکہ جو پیش کرنے سے پہلے دال پر ڈالا جاتا ہے۔",
        ingredients: ["Yellow Lentils", "Basmati Rice", "Garlic Tarka", "Cumin Seeds", "Pure Ghee"],
        ingredientsUr: ["پیلی دال", "باسمتی چاول", "لہسن کا تڑکہ", "زیرہ", "خالص گھی"],
        prepTime: "20-25 mins",
        prepTimeUr: "20-25 منٹ"
      }
    },
    {
      id: 2,
      name: "Chicken Karahi",
      nameUr: "چکن کڑاہی",
      description: "Traditional street-style chicken karahi with a perfect balance of spices and ginger.",
      descriptionUr: "روایتی سٹریٹ سٹائل چکن کڑاہی، مصالحوں اور ادرک کے بہترین توازن کے ساتھ۔",
      price: "Rs. 1,450",
      image: "/images/home/menu/chicken_karahi.png",
      bgClass: "bg-gradient-to-br from-red-50 to-orange-50",
      details: {
        recipe: "Fresh chicken pieces stir-fried on high flame in a wok with tomatoes, ginger julienne, and crushed black pepper. No onions are used, ensuring an authentic 'Shinwari' style flavor that is both spicy and tangy.",
        recipeUr: "تازہ چکن کے ٹکڑوں کو ٹماٹر، باریک کٹی ادرک اور کٹی کالی مرچ کے ساتھ تیز آنچ پر کڑاہی میں بھونا جاتا ہے۔ پیاز کا استعمال نہیں کیا جاتا، جس سے ایک اصلی 'شنواری' ذائقہ ملتا ہے۔",
        ingredients: ["Fresh Chicken", "Vine Tomatoes", "Ginger Julienne", "Black Pepper", "Green Chilies"],
        ingredientsUr: ["تازہ چکن", "ٹماٹر", "باریک کٹی ادرک", "کالی مرچ", "ہری مرچیں"],
        prepTime: "30-35 mins",
        prepTimeUr: "30-35 منٹ"
      }
    },
    {
      id: 3,
      name: "Chicken Biryani",
      nameUr: "چکن بریانی",
      description: "The king of desi food. Fragrant rice and spiced chicken cooked to perfection.",
      descriptionUr: "دیسی کھانے کا بادشاہ۔ خوشبودار چاول اور مصالحے دار چکن جو کمال مہارت سے پکایا گیا ہے۔",
      price: "Rs. 650",
      image: "/images/home/menu/chicken_biryani.png",
      bgClass: "bg-gradient-to-br from-amber-50 to-yellow-50",
      details: {
        recipe: "Our Karachi-style biryani uses the finest spices. We create a rich 'Korma' first, then layer it with parboiled rice and steam it (Dum) with fresh mint and lemon slices for that signature aroma.",
        recipeUr: "ہماری کراچی سٹائل بریانی میں بہترین مصالحے استعمال ہوتے ہیں۔ پہلے ایک بھرپور 'قورمہ' تیار کیا جاتا ہے، پھر اسے چاولوں کے ساتھ تہوں میں لگا کر پودینے اور لیموں کے ساتھ دم دیا جاتا ہے۔",
        ingredients: ["Basmati Rice", "Chicken Korma", "Biryani Spices", "Fresh Mint", "Zarda Color"],
        ingredientsUr: ["باسمتی چاول", "چکن قورمہ", "بریانی مصالحہ", "تازہ پودینہ", "زردہ رنگ"],
        prepTime: "25-30 mins",
        prepTimeUr: "25-30 منٹ"
      }
    },
    {
      id: 4,
      name: "Seekh Kebab",
      nameUr: "سیخ کباب",
      description: "Flame-grilled chicken seekh kebabs, tender and packed with herbs.",
      descriptionUr: "آگ پر گرل کیے ہوئے چکن سیخ کباب، نرم اور جڑی بوٹیوں سے بھرپور۔",
      price: "Rs. 850",
      image: "/images/home/menu/seekh_kebab.png",
      bgClass: "bg-gradient-to-br from-orange-50 to-red-50",
      details: {
        recipe: "Finely minced chicken mixed with green chilies, coriander, and our house-made kebab masala. Skewered and grilled over open flames until golden brown and succulent.",
        recipeUr: "باریک چکن قیمہ جسے ہری مرچوں، دھنیا اور ہمارے گھر کے بنے کباب مصالحے کے ساتھ ملایا جاتا ہے۔ پھر سیخوں پر لگا کر آگ پر سنہرا ہونے تک پکایا جاتا ہے۔",
        ingredients: ["Minced Chicken", "Green Chilies", "Coriander", "House Masala", "Butter"],
        ingredientsUr: ["چکن قیمہ", "ہری مرچیں", "دھنیا", "گھریلو مصالحہ", "مکھن"],
        prepTime: "15-20 mins",
        prepTimeUr: "15-20 منٹ"
      }
    },
    {
      id: 5,
      name: "Samosa Chaat",
      nameUr: "سموسہ چاٹ",
      description: "Crispy potato samosas topped with tangy chickpeas, yogurt, and chutneys.",
      descriptionUr: "کرسپی آلو کے سموسے جن پر چٹ پٹے چھولے، دہی اور چٹنیاں ڈالی جاتی ہیں۔",
      price: "Rs. 250",
      image: "/images/home/menu/samosa_chaat.png",
      bgClass: "bg-gradient-to-br from-green-50 to-yellow-50",
      details: {
        recipe: "Two crispy vegetable samosas crushed and topped with warm, spiced chickpea curry. Drizzled with sweet imli chutney, spicy green chutney, and a dollop of fresh yogurt.",
        recipeUr: "دو کرسپی سبزیوں والے سموسے توڑ کر ان پر گرم، مصالحے دار چھولے ڈالے جاتے ہیں۔ پھر املی کی میٹھی چٹنی، ہری چٹنی اور تازہ دہی کے ساتھ پیش کیا جاتا ہے۔",
        ingredients: ["Crispy Samosas", "Spiced Chickpeas", "Imli Chutney", "Yogurt", "Fresh Onions"],
        ingredientsUr: ["کرسپی سموسے", "مصالحے دار چھولے", "املی کی چٹنی", "دہی", "تازہ پیاز"],
        prepTime: "10-15 mins",
        prepTimeUr: "10-15 منٹ"
      }
    },
  ];

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
              {t("viewMenu")}
            </h2>
            <div className="w-24 h-1.5 bg-brand-primary mt-4 rounded-full" />
          </div>
          <div className="flex flex-col items-end">
            <Link
              href="/menu"
              className="text-sm font-bold text-brand-dark uppercase tracking-widest hover:text-brand-primary transition-colors"
            >
              {language === "UR" ? "تمام مینو" : "VIEW ALL"}
            </Link>
            <div className="w-16 h-[2px] bg-brand-primary mt-2 rounded-full" />
          </div>
        </div>

        {/* Carousel Area */}
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
            {menuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="flex-none w-[210px] bg-brand-white pt-6 pb-6 px-5 flex flex-col items-center relative group cursor-pointer shadow-sm hover:shadow-[0_20px_40px_rgba(230,57,70,0.1)] hover:-translate-y-3 transition-all duration-300 snap-center shrink-0 border border-brand-dark/5"
                style={{ borderRadius: '25px 80px 25px 80px' }}
              >
                <div className="w-32 h-32 relative mb-5 rounded-full overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.08)] border-4 border-brand-light">
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                </div>
                <h3 className="text-brand-dark font-black text-center text-base leading-tight uppercase tracking-wide group-hover:text-brand-primary transition-colors">
                  {language === "UR" ? item.nameUr : item.name}
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

      {/* Item Detail Modal - Perfected Compact Design */}
      {selectedItem && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 lg:p-10 animate-fade-in overflow-y-auto">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedItem(null)} />

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
