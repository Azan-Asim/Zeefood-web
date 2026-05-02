import Navbar from "@/components/common/Navbar";
import HeroSlider from "@/components/home/HeroSlider";
import ExploreMenu from "@/components/home/ExploreMenu";
import SignatureDesi from "@/components/home/SignatureDesi";
import TopDeals from "@/components/home/TopDeals";
// import PromoBanners from "@/components/home/PromoBanners";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdfcfb] relative overflow-x-hidden">
      <HeroSlider />
      <ExploreMenu />
      <SignatureDesi />
      <TopDeals />
      {/* <PromoBanners /> */}
    </main>
  );
}
