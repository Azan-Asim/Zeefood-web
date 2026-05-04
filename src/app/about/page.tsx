import AboutSection from "@/components/home/AboutSection";
import type { Metadata } from "next";

export const metadata: Metadata = { 
  title: "Our Story — Zee Food Gallery",
  description: "Learn about our journey, local heritage, and commitment to authentic desi flavors."
};

export default function AboutPage() {
  return (
    <div className="pt-[90px]">
      <AboutSection />
    </div>
  );
}
