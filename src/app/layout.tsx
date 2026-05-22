import type { Metadata } from "next";
import { Poppins, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const notoUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-noto-urdu",
});

export const metadata: Metadata = {
  title: "ZeeFood Premium",
  description: "Premium food delivery experience.",
};


import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LocationModal from "@/components/common/LocationModal";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import ReduxProvider from "@/components/common/ReduxProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoUrdu.variable} ${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`${poppins.className} min-h-full flex flex-col font-sans`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <LanguageProvider>
            <CartProvider>
              <LocationModal />
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </CartProvider>
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
