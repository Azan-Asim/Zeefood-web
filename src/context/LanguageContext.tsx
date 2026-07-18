"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "EN" | "UR";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    brandName: "Zee Food Gallery",
    brandSubtitle: "اماں جی کا ڈھابہ",
    orderNow: "Order Now",
    viewMenu: "View Menu",
    ourStory: "Our Story",
    trackOrder: "Track Order",
    signIn: "Sign In",
    delivery: "Delivery",
    pickup: "Pick-Up",
    selectLocation: "Please select your location",
    selectCity: "Select City / Region",
    selectArea: "Select Area / Sub Region",
    startOrdering: "Start Ordering",
    useCurrentLocation: "Use Current Location",
    orderType: "Order Type",
    yourLocation: "Your Location",
    orderOnline: "ORDER ONLINE",
    familySize: "FAMILY SIZE",
    chefSpecial: "CHEF SPECIAL",
    frozenRange: "FROZEN RANGE",
    cravingSomething: "CRAVING SOMETHING?",
    explore: "EXPLORE",
    shopFrozen: "SHOP FROZEN",
    bookNow: "BOOK NOW",
    orderDelivery: "Order Delivery",
    exclusiveChefMeals: "Exclusive, chef-prepared meals delivered in minutes.",
    yourOrder: "Your Order",
    emptyCart: "Your cart is empty",
    total: "Total",
    checkout: "Checkout",
    subtotal: "Subtotal",
    deliveryFee: "Delivery",
    aboutTitle: "Our Story",
    aboutSubtitle: "The Heart of Authentic Desi Flavors",
    freshFoodTitle: "Always Fresh",
    freshFoodDesc: "We source our ingredients daily from local markets to ensure every bite is bursting with natural flavor.",
    localStaffTitle: "Empowering Locals",
    localStaffDesc: "Our kitchen is powered by talented local chefs and staff, bringing the true taste of home to your table.",
    desiDiningTitle: "Authentic Experience",
    desiDiningDesc: "From the aroma of fresh spices to the sizzle of the karahi, we bring you the ultimate desi dining experience.",
    howItsMade: "How it's made",
    keyIngredients: "Key Ingredients",
    timeLabel: "Time",
    priceLabel: "Price",
    heroTitle1: "HOT FOOD,\nFAST DELIVERY\n(تازہ کھانا، تیز ترین ڈلیوری)",
    heroDesc1: "Fresh from our kitchen to your doorstep in 30 minutes or less.",
    heroTitle2: "BIRYANI\nFEAST\n(بریانی کی دعوت)",
    heroDesc2: "Golden saffron Dum Biryani. Made for the whole family.",
    heroTitle3: "KARAHI\nNIGHT\n(کڑاہی نائٹ)",
    heroDesc3: "Peshawari-style Mutton Karahi. Authentic. Fiery. Unforgettable.",
    heroTitle4: "STOCK UP\nYOUR FREEZER\n(اپنا فریزر بھر لیں)",
    heroDesc4: "Export-quality frozen kebabs, samosas & parathas. Always ready.",
    heroTitle5: "YOUR TABLE\nAWAITS\n(آپ کی میز تیار ہے)",
    heroDesc5: "Experience luxury dining at its best. Book your table for a special evening.",
  },
  UR: {
    brandName: "Zee Food Gallery",
    brandSubtitle: "اماں جی کا ڈھابہ",
    orderNow: "ابھی آرڈر کریں",
    viewMenu: "مینیو دیکھیں",
    ourStory: "ہماری کہانی",
    trackOrder: "آرڈر ٹریک کریں",
    signIn: "سائن ان کریں",
    delivery: "ڈلیوری",
    pickup: "پک اپ",
    selectLocation: "براہ کرم اپنی جگہ منتخب کریں",
    selectCity: "شہر / علاقہ منتخب کریں",
    selectArea: "علاقہ / ذیلی علاقہ منتخب کریں",
    startOrdering: "آرڈر شروع کریں",
    useCurrentLocation: "موجودہ جگہ استعمال کریں",
    orderType: "آرڈر کی قسم",
    yourLocation: "آپ کی جگہ",
    orderOnline: "آن لائن آرڈر",
    familySize: "فیملی پیک",
    chefSpecial: "شیف کی خاص ڈش",
    frozenRange: "منجمد اشیاء",
    cravingSomething: "کچھ خاص کھانا ہے؟",
    explore: "تلاش کریں",
    shopFrozen: "خریداری کریں",
    bookNow: "ٹیبل بک کریں",
    orderDelivery: "آن لائن آرڈر",
    exclusiveChefMeals: "شیف کے تیار کردہ بہترین کھانے، منٹوں میں آپ کے پاس۔",
    yourOrder: "آپ کا آرڈر",
    emptyCart: "آپ کا کارٹ خالی ہے",
    total: "کل رقم",
    checkout: "چیک آؤٹ",
    subtotal: "سب ٹوٹل",
    deliveryFee: "ڈلیوری",
    aboutTitle: "ہماری کہانی",
    aboutSubtitle: "اصلی دیسی ذائقوں کا مرکز",
    freshFoodTitle: "ہمیشہ تازہ",
    freshFoodDesc: "ہم روزانہ مقامی منڈیوں سے تازہ اجزاء حاصل کرتے ہیں تاکہ ہر لقمہ قدرتی ذائقے سے بھرپور ہو۔",
    localStaffTitle: "مقامی لوگوں کا فخر",
    localStaffDesc: "ہمارا باورچی خانہ مقامی ماہر شیف اور عملے سے مزین ہے، جو آپ کی میز تک گھر جیسا ذائقہ پہنچاتے ہیں۔",
    desiDiningTitle: "اصلی دیسی تجربہ",
    desiDiningDesc: "تازہ مصالحوں کی خوشبو سے لے کر کڑاہی کی سنسناہٹ تک، ہم آپ کے لیے بہترین دیسی ماحول فراہم کرتے ہیں۔",
    howItsMade: "یہ کیسے بنتا ہے؟",
    keyIngredients: "اہم اجزاء",
    timeLabel: "وقت",
    priceLabel: "قیمت",
    heroTitle1: "گرم کھانا،\nتیز ترین ڈلیوری",
    heroDesc1: "ہمارے باورچی خانے سے آپ کی دہلیز تک 30 منٹ یا اس سے کم وقت میں۔",
    heroTitle2: "بریانی\nکی دعوت",
    heroDesc2: "سنہری زعفرانی دم بریانی۔ پورے خاندان کے لیے۔",
    heroTitle3: "کڑاہی\nنائٹ",
    heroDesc3: "پشاوری سٹائل مٹن کڑاہی۔ اصلی، تیکھی اور ناقابل فراموش۔",
    heroTitle4: "اپنا فریزر\nبھر لیں",
    heroDesc4: "برآمدی معیار کے منجمد کباب، سموسے اور پراٹھے۔ ہمیشہ تیار۔",
    heroTitle5: "آپ کی میز\nتیار ہے",
    heroDesc5: "بہترین لگژری ڈائننگ کا تجربہ کریں۔ اپنی شام کو خاص بنانے کے لیے میز بک کریں۔",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "EN";

    const savedLang = window.localStorage.getItem("appLanguage") as Language | null;
    return savedLang && translations[savedLang] ? savedLang : "EN";
  });

  useEffect(() => {
    document.documentElement.dir = language === "UR" ? "rtl" : "ltr";
    document.documentElement.lang = language.toLowerCase();
    window.localStorage.setItem("appLanguage", language);
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: string) => {
    const langData = translations[language];
    if (!langData) return key;
    return langData[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
