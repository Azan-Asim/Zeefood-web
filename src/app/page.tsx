import Navbar from "@/components/common/Navbar";
import Hero from "@/components/home/Hero";
import ExploreMenu from "@/components/home/ExploreMenu";
import SignatureDesi from "@/components/home/SignatureDesi";
import TopDeals from "@/components/home/TopDeals";
import PromoBanners from "@/components/home/PromoBanners";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdfcfb] relative overflow-x-hidden pt-[90px]">
      <Navbar />
      <Hero />
      <ExploreMenu />
      <SignatureDesi />
      <TopDeals />
      <PromoBanners />
    </main>
  );
}
