import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import MostSearched from "@/components/MostSearched";
import BestService from "@/components/BestService";
import ExploreTopDeals from "@/components/ExploreTopDeals";
import HowItWorks from "@/components/HowItWorks";
import BestCustomerExperience from "@/components/BestCustomerExperience";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <MostSearched />
        <BestService />
        <ExploreTopDeals />
        <HowItWorks />
        <BestCustomerExperience />
        <AboutUs />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
