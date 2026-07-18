"use client";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function TopDeals() {
  const { language } = useLanguage();

  return (
    <section className="relative z-10 w-full overflow-hidden bg-white py-20 sm:py-24 lg:py-28 2xl:py-36">

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-[1600px] 2xl:px-10">

        {/* Header */}
        <div className="mb-18 flex flex-col items-center py-4 text-center sm:mb-20 sm:py-6 2xl:mb-24 2xl:py-8">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase font-sans leading-[0.95] text-brand-primary">
            {language === "UR" ? "طریقۂ پکانے" : "Way of Cooking"}
          </h2>
          <h3 className="text-2xl lg:text-3xl font-bold text-black mt-2">
            {language === "UR" ? "دیسی کھانوں کی تاریخ" : "The Story of Desi Food"}
          </h3>
          <div className="w-24 h-1.5 bg-brand-primary mt-6 rounded-full" />
        </div>

        {/* Content Grid: Image + Text */}
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 2xl:gap-16">
          <div className="flex items-center justify-center">
         
              <Image
                src="/images/home/desi/biryani_transparent.png"
                alt={language === "UR" ? "دیسی پکوان" : "Desi Cooking"}
                width={800}
                height={560}
                className="h-auto w-full max-w-[760px] object-contain"
                unoptimized
              />
       
          </div>

          <div className="mx-auto flex max-w-3xl flex-col gap-5 lg:mx-0 2xl:gap-7">
            <div>
              <h4 className="text-xl font-black text-brand-dark mb-3">{language === "UR" ? "روایتی انداز" : "Traditional Techniques"}</h4>
              <p className={`text-brand-dark/70 leading-relaxed ${language === "UR" ? "font-urdu" : ""}`}>
                {language === "UR" ?
                  "دیسی پکوان صدیوں پر محیط تجربے اور مختلف خطّوں کے ملاپ کا نتیجہ ہیں۔ کھانے کو خوش ذائقہ بنانے کے لیے دھیمی آنچ، دم پر پکانا، اور مسالوں کا احتیاط سے استعمال روایتی طریقوں میں شامل ہیں۔"
                  :
                  "Desi cuisine is the result of centuries of culinary evolution across regions. Techniques like slow cooking over low heat, ‘dum’ (steam) cooking, and careful layering of spices define the authentic way of preparing these dishes."
                }
              </p>
            </div>

            <div>
              <h4 className="text-xl font-black text-brand-dark mb-3">{language === "UR" ? "مقامی اجزاء" : "Local Ingredients"}</h4>
              <p className={`text-brand-dark/70 leading-relaxed ${language === "UR" ? "font-urdu" : ""}`}>
                {language === "UR" ?
                  "زردہ باسمتی چاول، تازه دھنیا، لیمن، ہلدی، اور تِل جیسے اجزاء دیسی پکوان کو منفرد ذائقہ دیتے ہیں۔ ہر علاقے کے مزاج کے مطابق مصالحوں کا امتزاج بدلتا ہے۔"
                  :
                  "Ingredients such as fragrant Basmati rice, fresh coriander, lemon, turmeric and roasted spices give desi dishes their distinctive flavors. Regional variations arise from local produce and spice blends."
                }
              </p>
            </div>

            <div>
              <h4 className="text-xl font-black text-brand-dark mb-3">{language === "UR" ? "ثقافتی اثرات" : "Cultural Influences"}</h4>
              <p className={`text-brand-dark/70 leading-relaxed ${language === "UR" ? "font-urdu" : ""}`}>
                {language === "UR" ?
                  "دیسی کھانے میں وسطِ ایشیا، وسطِ مشرق اور مقامی ذائقوں کا ملاپ ملتا ہے۔ تہذیبوں کی آمد و رفت نے نئے طریقے اور مصالحوں کو متعارف کروایا، جس سے مزیدار اور متنوع کھانے وجود میں آئے۔"
                  :
                  "Desi food reflects a blend of Central Asian, Middle Eastern and local culinary traditions. Historical trade and migration introduced new techniques and spices, resulting in the rich, diverse dishes enjoyed today."
                }
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
