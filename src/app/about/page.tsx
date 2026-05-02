import PremiumContentPage from "@/components/common/PremiumContentPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Us — ZeeFood Premium" };

export default function AboutPage() {
  return (
    <PremiumContentPage 
      label="Company" 
      title1="About" 
      title2="ZeeFood" 
      description="Discover the passion, heritage, and culinary excellence behind Pakistan's most loved premium food delivery brand."
    >
      <div className="space-y-16">
        <section>
          <h2 className="text-3xl lg:text-4xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Our Heritage</span>
          </h2>
          <p className="text-xl leading-relaxed text-brand-dark/80">
            Founded with a passion for authentic flavors and modern convenience, ZeeFood brings the rich culinary traditions of Pakistan straight to your door. We believe that fast food shouldn't mean compromising on quality or taste.
          </p>
        </section>

        <section>
          <h2 className="text-3xl lg:text-4xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Premium Ingredients, Always</span>
          </h2>
          <p className="text-xl leading-relaxed text-brand-dark/80">
            Every dish is crafted by expert chefs using hand-picked, export-grade spices, fresh produce, and premium meats. Whether it's our slow-cooked Nihari or our sizzling Karahi, excellence is our standard.
          </p>
        </section>

        <div className="mt-12 p-10 bg-[#fdf8f5] rounded-[40px] border border-brand-primary/10 text-center">
          <h3 className="text-2xl font-black text-brand-primary mb-4">Experience the Best</h3>
          <p className="text-xl text-brand-dark/70 max-w-2xl mx-auto leading-relaxed">
            We are constantly innovating and expanding. Experience the true taste of luxury dining from the comfort of your home.
          </p>
        </div>
      </div>
    </PremiumContentPage>
  );
}
