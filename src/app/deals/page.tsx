import Link from "next/link";
import DealPage from "@/components/deals/DealPage";
import { fetchProductsApi } from "@/lib/store/productsApi";
import type { Product } from "@/lib/store";

export const metadata = {
  title: "Exclusive Deals - ZeeFood Premium",
  description: "Premium bundles, family feasts and limited-time specials coming soon.",
};

// Original Deals page is preserved for restoring live deals later.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function OriginalDealsPage() {
  let products: Product[] = [];

  try {
    const response = await fetchProductsApi({
      businessId: "5707b450-9723-4794-9ba4-ee03890cf504",
      page: 1,
      limit: 8,
    });
    products = response.data;
  } catch (error) {
    console.error("Deals page fetch failed", error);
  }

  return <DealPage products={products} />;
}

const teaserCards = [
  {
    number: "01",
    title: "Chef-Picked Bundles",
    desc: "Curated combos designed for a complete meal.",
  },
  {
    number: "02",
    title: "Family Feasts",
    desc: "Generous portions planned for sharing at home.",
  },
  {
    number: "03",
    title: "Limited Specials",
    desc: "Seasonal offers prepared with the same ZeeFood flavor.",
  },
];

export default function DealsPage() {
  // return <OriginalDealsPage />;

  return (
    <main className="min-h-screen bg-white pt-24 text-brand-dark sm:pt-28">
      <section className="bg-brand-surface px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] 2xl:max-w-[1600px]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-brand-primary/20 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-brand-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary">
                Exclusive Deals
              </span>
            </div>

            <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
              Fresh offers are
              <span className="block text-brand-primary">coming soon.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-brand-dark/65 sm:text-lg">
              We are preparing premium bundles, family feasts, and limited-time specials.
              The deals page will be live soon with the same clean ZeeFood experience.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-primary px-8 py-4 text-sm font-black uppercase tracking-widest text-white no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(248,114,5,0.28)]"
              >
                View Full Menu
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-brand-dark no-underline transition-all hover:border-brand-primary hover:text-brand-primary"
              >
                Back Home
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_18px_60px_rgba(17,24,39,0.07)] sm:p-6">
            <div className="grid gap-3">
              {teaserCards.map((card) => (
                <article
                  key={card.number}
                  className="group rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:border-brand-primary/25 hover:bg-brand-primary/5"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-primary text-xs font-black text-white">
                      {card.number}
                    </span>
                    <div>
                      <h2 className="text-base font-black uppercase text-brand-dark transition-colors group-hover:text-brand-primary">
                        {card.title}
                      </h2>
                      <p className="mt-2 text-sm font-medium leading-6 text-brand-dark/60">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 rounded-2xl border border-brand-primary/15 bg-brand-primary/5 p-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-brand-primary">
              Stay in the loop
            </p>
            <h2 className="mt-1 text-xl font-black text-brand-dark">
              Deals go live soon. Check back for fresh offers.
            </h2>
          </div>
          <Link
            href="/order"
            className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-brand-dark px-7 py-3.5 text-xs font-black uppercase tracking-widest text-white no-underline transition-all hover:bg-brand-primary"
          >
            Order Now
          </Link>
        </div>
      </section>
    </main>
  );
}
