import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchByType from "@/components/SearchByType";
import NewArrivals from "@/components/NewArrivals";
import BrandSearch from "@/components/BrandSearch";
import Features from "@/components/Features";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      <Hero />
      <SearchByType />
      <NewArrivals />
      <BrandSearch />
      <Features />
      <WhyUs />
      <Footer />
    </main>
  );
}
