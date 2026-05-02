"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

export default function OrderPage() {
  const { t, language } = useLanguage();
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [activeCategory, setActiveCategory] = useState("Popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<any>(null);

  useEffect(() => {
    const loc = localStorage.getItem("userLocation");
    if (loc) setUserLocation(JSON.parse(loc));
  }, []);

  const categories = ["Popular", "Karahi", "Biryani", "BBQ", "Sides", "Desserts"];

  const menuItems = [
    { 
      id: 1, 
      name: "Special Mutton Karahi", 
      nameUr: "خصوصی مٹن کڑاہی", 
      category: "Karahi", 
      price: "Rs. 2,499", 
      rating: 4.9, 
      prepTime: "45-60 min", 
      image: "/images/home/desi/karahi_transparent.png", 
      popular: true,
      details: {
        recipe: "Our mutton is slow-cooked in a traditional heavy-bottomed karahi with fresh, vine-ripened tomatoes and our secret blend of hand-ground spices.",
        recipeUr: "ہمارا مٹن روایتی بھاری پیندے والی کڑاہی میں ہلکی آنچ پر پکایا جاتا ہے۔",
        ingredients: ["Prime Mutton", "Fresh Tomatoes", "Green Chilies", "Hand-ground Spices", "Pure Ginger & Garlic"],
        ingredientsUr: ["بہترین مٹن", "تازہ ٹماٹر", "ہری مرچیں", "ہاتھ سے پسے مصالحے", "خالص ادرک اور لہسن"]
      }
    },
    { 
      id: 2, 
      name: "Nawabi Chicken Biryani", 
      nameUr: "نوابی چکن بریانی", 
      category: "Biryani", 
      price: "Rs. 1,299", 
      rating: 4.8, 
      prepTime: "40-50 min", 
      image: "/images/home/desi/biryani_transparent.png", 
      popular: true,
      details: {
        recipe: "This biryani is prepared in the 'Dum' style. We marinate the chicken overnight in yogurt and spices, then slow-cook it in a sealed pot.",
        recipeUr: "یہ بریانی 'دم' سٹائل میں تیار کی جاتی ہے۔ ہم چکن کو رات بھر دہی اور مصالحوں میں میرینیٹ کرتے ہیں۔",
        ingredients: ["Long-grain Basmati Rice", "Tender Chicken", "Saffron", "Fresh Mint", "Aromatic Biryani Masala"],
        ingredientsUr: ["طویل باسمتی چاول", "نرم چکن", "زعفران", "تازہ پودینہ", "خوشبودار بریانی مصالحہ"]
      }
    },
    { 
      id: 3, 
      name: "Sizzling Beef Seekh Kebab", 
      nameUr: "سیزلنگ بیف سیخ کباب", 
      category: "BBQ", 
      price: "Rs. 1,899", 
      rating: 5.0, 
      prepTime: "25-30 min", 
      image: "/images/home/desi/kebab_transparent.png", 
      popular: true,
      details: {
        recipe: "We use the finest minced beef with traditional herbs and spices, then manually skewered and grilled over slow-burning charcoal.",
        recipeUr: "ہم بہترین بیف قیمہ استعمال کرتے ہیں جسے ہاتھ سے سیخوں پر چڑھایا جاتا ہے اور سلگتے ہوئے کوئلوں پر گرل کیا جاتا ہے۔",
        ingredients: ["Prime Minced Beef", "Fresh Herbs", "Traditional Spices", "Smoky Charcoal Grill", "Papaya Paste"],
        ingredientsUr: ["اعلیٰ معیار کا بیف قیمہ", "تازہ جڑی بوٹیوں", "روایتی مصالحے", "کوئلے کی گرل", "پپیتے کا پیسٹ"]
      }
    },
    { 
      id: 4, 
      name: "Shahi Nihari", 
      nameUr: "شاہی نہاری", 
      category: "Karahi", 
      price: "Rs. 1,599", 
      rating: 4.7, 
      prepTime: "8-10 hours", 
      image: "/images/home/desi/nihari_transparent.png", 
      popular: false,
      details: {
        recipe: "Our Nihari is slow-cooked for 8-10 hours in a rich, spicy gravy thickened with flour, resulting in incredibly tender meat.",
        recipeUr: "ہماری نہاری کو 8-10 گھنٹے تک ایک بھرپور مصالحے دار گریوی میں ہلکی آنچ پر پکایا جاتا ہے۔",
        ingredients: ["Beef Shank", "Bone Marrow", "Special Nihari Spices", "Pure Ghee", "Fresh Ginger & Lemon"],
        ingredientsUr: ["بیف بونگ", "نلی مخ", "خصوصی نہاری مصالحے", "خالص گھی", "تازہ ادرک اور لیموں"]
      }
    },
    { id: 5, name: "Daal Chawal", nameUr: "دال چاول", category: "Sides", price: "Rs. 450", rating: 4.6, prepTime: "20-25 min", image: "🥣", popular: false },
    { id: 6, name: "Samosa Chaat", nameUr: "سموسہ چاٹ", category: "Sides", price: "Rs. 250", rating: 4.9, prepTime: "10-15 min", image: "🥟", popular: true },
  ];

  const filteredItems = menuItems.filter(i => {
    const matchesCategory = activeCategory === "Popular" ? i.popular : i.category === activeCategory;
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (i.nameUr && i.nameUr.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  const deliveryFee = cartTotal > 0 ? 150 : 0;
  const totalAmount = cartTotal + deliveryFee;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const locationData = userLocation || { area: "Not specified", city: "Not specified", orderType: "delivery" };
    let message = `*NEW ORDER - HAMARI JAGA DHABA*\n\n`;
    message += `*Order Type:* ${locationData.orderType === 'delivery' ? '🚀 Delivery' : '🛍️ Pick-Up'}\n`;
    message += `*Location:* ${locationData.area}, ${locationData.city}\n\n`;
    message += `*ITEMS:*\n`;
    cart.forEach(c => {
      message += `- ${language === "UR" && c.item.nameUr ? c.item.nameUr : c.item.name} (x${c.quantity}) - ${c.item.price}\n`;
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
    <div className="h-[calc(100vh-90px)] bg-[#f8f6f4] flex flex-col font-sans overflow-hidden mt-[90px]">
      <div className="flex-1 max-w-[1600px] mx-auto w-full flex flex-col md:flex-row relative overflow-hidden">

        {/* Main Menu Area */}
        <div className="flex-1 px-6 pt-10 pb-32 md:pb-8 md:pr-8 md:border-r border-black/5 overflow-y-auto no-scrollbar">
          <div className="mb-10">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} onClick={() => item.details && setSelectedItem(item)} className="group cursor-pointer bg-white rounded-[24px] p-4 border border-[#f0e4dc] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(230,57,70,0.08)] transition-all duration-300 flex flex-col">
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#fdf8f5] to-[#fef2ec] rounded-[16px] mb-4 flex items-center justify-center text-7xl relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                  {typeof item.image === 'string' && item.image.startsWith('/') ? (
                    <Image src={item.image} alt={item.name} fill className="object-contain" unoptimized />
                  ) : (
                    <span>{item.image}</span>
                  )}
                  {item.popular && (
                    <div className="absolute top-3 left-3 bg-[#E63946] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      Best Seller
                    </div>
                  )}
                </div>

                <div className={`flex-1 flex flex-col ${language === "UR" ? "text-right" : ""}`}>
                  <h3 className="font-black text-[#1a0a04] text-lg leading-tight group-hover:text-[#E63946] transition-colors">
                    {language === "UR" ? item.nameUr : item.name}
                  </h3>
                  <p className="text-xs font-bold text-[#a09080] uppercase tracking-widest mb-3">{item.category}</p>

                  <div className={`flex items-center gap-3 text-xs font-semibold text-[#6b5a50] mb-4 ${language === "UR" ? "flex-row-reverse" : ""}`}>
                    <span className="flex items-center gap-1"><span className="text-[#F4A261]">★</span> {item.rating}</span>
                    <span className="w-1 h-1 bg-[#d8c8be] rounded-full"></span>
                    <span>{item.prepTime}</span>
                  </div>

                  <div className={`mt-auto flex items-center justify-between ${language === "UR" ? "flex-row-reverse" : ""}`}>
                    <span className="text-lg font-black text-[#1a0a04]">{item.price}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                      className="w-10 h-10 rounded-full bg-[#fdf2ec] text-[#E63946] flex items-center justify-center hover:bg-[#E63946] hover:text-white transition-all shadow-sm active:scale-90"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar / Cart (Desktop) */}
        <div className="hidden md:flex w-[380px] lg:w-[420px] flex-col h-full bg-[#faf8f5] border-l border-[#ebe3d9] shadow-[-10px_0_40px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="px-8 py-5 border-b border-[#ebe3d9] bg-white/50 backdrop-blur-md">
            <h2 className={`text-xl font-black text-[#1a0a04] tracking-tight flex items-center gap-3 ${language === "UR" ? "flex-row-reverse" : ""}`}>
              <span className="w-8 h-px bg-[#E63946]"></span>
              {t("yourOrder")}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-5 no-scrollbar">
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
                    {typeof c.item.image === 'string' && c.item.image.startsWith('/') ? (
                      <Image src={c.item.image} alt={c.item.name} fill className="object-cover" unoptimized />
                    ) : (
                      <span className="text-3xl">{c.item.image || "🥘"}</span>
                    )}
                  </div>
                  <div className={`flex-1 min-w-0 ${language === "UR" ? "text-right" : ""}`}>
                    <h4 className="font-bold text-[#1a0a04] text-sm leading-tight mb-1 truncate">
                      {language === "UR" ? c.item.nameUr : c.item.name}
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

          <div className="px-8 py-7 bg-white border-t border-[#ebe3d9]">
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
              onClick={handleCheckout}
              className="w-full py-4 rounded-2xl font-black text-white text-base bg-[#E63946] shadow-xl shadow-brand-primary/20 disabled:opacity-50"
            >
              {t("checkout")}
            </button>
          </div>
        </div>
      </div>

      {/* Item Detail Modal - Perfected Compact Design with MAX Z-INDEX */}
      {selectedItem && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 lg:p-10 animate-fade-in overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedItem(null)} />

          <div className="relative bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl animate-fade-in-up flex flex-col md:flex-row min-h-[400px] my-auto">

            {/* Left Side: Image */}
            <div className="md:w-[42%] p-8 flex flex-col items-center justify-center relative bg-gradient-to-br from-[#fdfcf0] to-[#fff9f5]">
              <div className="relative w-full aspect-square max-w-[220px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500">
                {typeof selectedItem.image === 'string' && selectedItem.image.startsWith('/') ? (
                  <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-contain" unoptimized />
                ) : (
                  <span className="text-8xl">{selectedItem.image}</span>
                )}
              </div>
              
              <div className="mt-10 flex gap-3 w-full max-w-[280px]">
                <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm text-center">
                  <span className="block text-[9px] font-black text-[#a09080] uppercase tracking-[0.15em] mb-1">Time</span>
                  <span className="text-xs font-black text-[#1a0a04]">{language === "UR" ? selectedItem.details?.prepTimeUr : selectedItem.details?.prepTime || selectedItem.prepTime}</span>
                </div>
                <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm text-center">
                  <span className="block text-[9px] font-black text-[#a09080] uppercase tracking-[0.15em] mb-1">Price</span>
                  <span className="text-xs font-black text-[#1a0a04]">{selectedItem.price}</span>
                </div>
              </div>
            </div>

            {/* Right Side: Details */}
            <div className={`md:w-[58%] p-8 lg:p-10 flex flex-col ${language === "UR" ? "text-right" : "text-left"}`}>
              <button onClick={() => setSelectedItem(null)} className={`absolute top-6 ${language === "UR" ? "left-6" : "right-6"} w-9 h-9 bg-gray-50 text-gray-500 rounded-full flex items-center justify-center hover:bg-[#E63946] hover:text-white transition-all z-20 shadow-sm`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-black text-[#1a0a04] uppercase tracking-tight mb-3">
                  {language === "UR" ? selectedItem.nameUr : selectedItem.name}
                </h2>
                <p className="text-[#6b5a50] font-medium leading-relaxed text-sm mb-6 opacity-90">
                  {language === "UR" ? selectedItem.descriptionUr : selectedItem.description || "Fresh and authentic desi flavors crafted with passion."}
                </p>

                <div className="space-y-6">
                  {selectedItem.details && (
                    <>
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
                    </>
                  )}
                </div>
              </div>

              <button onClick={() => { addToCart(selectedItem); setSelectedItem(null); }} className="w-full mt-8 py-4 bg-[#E63946] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-[#E63946]/30 hover:-translate-y-1 active:scale-95 transition-all">
                {t("addToCart")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
