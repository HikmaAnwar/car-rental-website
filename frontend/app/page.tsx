import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import MostSearched from "@/components/MostSearched";
import BestService from "@/components/BestService";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <MostSearched />
        <BestService />
      </main>

      {/* Basic Footer */}
      <footer className="border-t border-white/5 py-20 px-10 bg-[#070D18]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          <div>
            <h4 className="text-2xl font-black text-white mb-6">Oriental</h4>
            <p className="text-white/40 max-w-xs text-sm leading-relaxed">
              Experience the pinnacle of luxury car rental with our exclusive collection and premium service.
            </p>
          </div>
          <div className="flex gap-20">
            <FooterColumn title="Cars" links={["Sedans", "SUVs", "Luxury", "Electric"]} />
            <FooterColumn title="Company" links={["About Us", "Fleet", "News", "Contact"]} />
          </div>
        </div>
      </footer>
    </div>
  );
}


function FooterColumn({ title, links }: { title: string, links: string[] }) {
  return (
    <div>
      <h5 className="text-white font-bold mb-6">{title}</h5>
      <ul className="space-y-4">
        {links.map(link => (
          <li key={link}><a href="#" className="text-white/40 hover:text-white transition-colors text-sm">{link}</a></li>
        ))}
      </ul>
    </div>
  );
}
