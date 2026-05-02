"use client";
import Image from "next/image";
import Link from "next/link";

// Using a transparent 1x1 SVG data URI as a fallback so Next.js Image doesn't break,
// allowing our custom placeholder text underneath to be visible until the real image is added.
const transparentPlaceholder = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjwvc3ZnPg==";

const desiItems = [
  {
    id: 1,
    name: "Special Mutton Karahi",
    description: "Authentic Peshawari style mutton karahi cooked with fresh tomatoes and green chilies.",
    price: "Rs. 2,499",
    image: "/images/home/desi/karahi_transparent.png",
    bgClass: "bg-gradient-to-br from-orange-100 to-orange-50",
  },
  {
    id: 2,
    name: "Nawabi Chicken Biryani",
    description: "Aromatic basmati rice layered with tender chicken, infused with saffron.",
    price: "Rs. 1,299",
    image: "/images/home/desi/biryani_transparent.png",
    bgClass: "bg-gradient-to-br from-yellow-100 to-yellow-50",
  },
  {
    id: 3,
    name: "Sizzling Beef Seekh Kebab",
    description: "Juicy minced beef marinated with traditional herbs and grilled over charcoal.",
    price: "Rs. 1,899",
    image: "/images/home/desi/kebab_transparent.png",
    bgClass: "bg-gradient-to-br from-red-100 to-red-50",
  },
  {
    id: 4,
    name: "Shahi Nihari",
    description: "Slow-cooked beef shank in a rich, spicy bone marrow gravy.",
    price: "Rs. 1,599",
    image: "/images/home/desi/nihari_transparent.png",
    bgClass: "bg-gradient-to-br from-amber-100 to-amber-50",
  },
];

export default function SignatureDesi() {
  return (
    <section className="bg-brand-white pt-24 pb-12 w-full relative z-10">
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
              className={`relative mt-16 lg:mt-20 flex flex-col items-center text-center p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(230,57,70,0.15)] transition-all duration-500 hover:-translate-y-4 group ${item.bgClass}`}
            >
              {/* Pop-out Image Container */}
              <div className="absolute -top-20 lg:-top-24 w-[200px] h-[200px] lg:w-[240px] lg:h-[240px] transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2 drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]">
                {/* Circular Mask Container */}
                <div className="w-full h-full relative z-10 border-4 border-white shadow-inner rounded-full bg-white group-hover:border-brand-primary/20 transition-colors duration-500 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                </div>
              </div>

              {/* Card Content Spacer */}
              <div className="h-[120px] lg:h-[140px] w-full" />

              {/* Content */}
              <h3 className="text-xl font-black text-brand-dark uppercase tracking-wide mb-3 group-hover:text-brand-primary transition-colors">
                {item.name}
              </h3>

              <p className="text-brand-dark/60 text-sm font-medium mb-6 line-clamp-3">
                {item.description}
              </p>

              <div className="mt-auto flex flex-col items-center w-full">
                <span className="text-2xl font-black mb-4" style={{ color: '#F87205' }}>
                  {item.price}
                </span>

                <button className="w-full py-3 px-6 bg-brand-white text-brand-dark font-bold text-sm uppercase tracking-widest rounded-full shadow-md group-hover:bg-brand-primary group-hover:text-brand-white transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/menu"
            className="px-10 py-4 bg-transparent border-2 border-brand-primary text-brand-primary font-black uppercase tracking-widest rounded-full hover:bg-brand-primary hover:text-brand-white transition-all duration-300 shadow-lg hover:shadow-[0_15px_30px_rgba(230,57,70,0.3)] hover:-translate-y-1"
          >
            View Full Desi Menu
          </Link>
        </div>

      </div>
    </section>
  );
}
