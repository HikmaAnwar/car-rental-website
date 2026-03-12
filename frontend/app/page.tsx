import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export const dynamic = "force-dynamic";
export const revalidate = 0;
import Categories from "@/components/Categories";
import MostSearched from "@/components/MostSearched";
import BestService from "@/components/BestService";
import ExploreTopDeals from "@/components/ExploreTopDeals";
import HowItWorks from "@/components/HowItWorks";
import BestCustomerExperience from "@/components/BestCustomerExperience";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import client from "@/lib/apollo-client";
import { GET_CARS } from "@/lib/graphql-queries";
import { Car, GetCarsData } from "@/types";

async function getFleet() {
  try {
    const response = await client.query<GetCarsData>({
      query: GET_CARS,
    });
    return response?.data?.cars || [];
  } catch (error) {
    console.error("GraphQL Fetch Error:", error);
    return [];
  }
}

export default async function Home() {
  const cars = await getFleet();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        {/* Pass fetched cars to components that need dynamic data */}
        <MostSearched cars={cars} />
        <BestService />
        <ExploreTopDeals cars={cars} />
        <HowItWorks />
        <BestCustomerExperience />
        <AboutUs />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
