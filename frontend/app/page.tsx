import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* Additional Sections could go here (Categories, Top Deals, etc.) */}
        <section className="bg-background py-32 px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h3 className="text-white/40 font-bold uppercase tracking-widest text-xs mb-2">Exclusive Deals</h3>
                <h2 className="text-5xl font-extrabold text-white">Explore Our Top Deals</h2>
              </div>
              <button className="text-primary font-bold hover:underline">View All Cars</button>
            </div>

            {/* Car Grid Prototype */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <CarCard
                name="Mercedes AMG G63"
                image="/cars/mercedes.png"
                price="$899"
                specs={["Petrol", "Auto", "5 Seats"]}
              />
              {/* Add more cards here as needed */}
            </div>
          </div>
        </section>
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

function CarCard({ name, image, price, specs }: { name: string, image: string, price: string, specs: string[] }) {
  return (
    <div className="group rounded-[32px] overflow-hidden glass border-white/5 p-6 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
      <div className="relative aspect-video mb-6">
        <Image src={image} alt={name} fill className="object-contain group-hover:scale-110 transition-transform duration-700" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-white/40 text-sm mb-4 font-medium">{specs.join(" · ")}</p>
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <p className="text-white font-bold">{price}<span className="text-white/40 font-normal">/day</span></p>
          <button className="bg-white/5 hover:bg-primary hover:text-white text-white/80 p-3 rounded-full transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" ><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
          </button>
        </div>
      </div>
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
