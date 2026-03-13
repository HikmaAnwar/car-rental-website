'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, SlidersHorizontal, Users, Fuel, Settings2, ArrowUpRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types';

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('latest');

  const fetchCars = async () => {
    setLoading(true);
    try {
      const q = searchParams.get('q') || '';
      const brand = searchParams.get('brand') || '';
      const response = await fetch(`http://localhost:8088/api/cars?search=${q}&brand=${brand}`);
      const data = await response.json();
      setCars(data || []);
    } catch (err) {
      console.error("Fetch search error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/cars?q=${searchTerm}`);
  };

  const sortedCars = [...cars].sort((a, b) => {
    if (sortBy === 'price-low') return a.pricePerDay - b.pricePerDay;
    if (sortBy === 'price-high') return b.pricePerDay - a.pricePerDay;
    return 0; // default (latest/id)
  });

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
                <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter italic">
                    CHOOSE YOUR <span className="text-zinc-300">RIDE</span>
                </h1>
                <p className="text-zinc-400 font-bold text-sm mt-2 uppercase tracking-widest">
                    Showing {cars.length} vehicles matching your criteria
                </p>
            </div>

            <div className="flex flex-wrap gap-4">
                <form onSubmit={handleSearch} className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search brand or model..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white border border-zinc-200 pl-12 pr-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold w-full md:w-[300px] shadow-sm"
                    />
                </form>

                <div className="flex items-center gap-2 bg-white border border-zinc-200 p-2 rounded-2xl shadow-sm">
                    <SlidersHorizontal size={18} className="ml-2 text-zinc-400" />
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent font-bold text-sm outline-none pr-4"
                    >
                        <option value="latest">Sort by Latest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>
        </div>

        {/* Results Grid */}
        <AnimatePresence mode='wait'>
          {loading ? (
            <motion.div 
               key="loader"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="py-40 flex items-center justify-center w-full"
            >
                <Loader2 className="w-10 h-10 animate-spin text-zinc-300" />
            </motion.div>
          ) : sortedCars.length === 0 ? (
            <motion.div 
               key="empty"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="py-40 text-center"
            >
                <div className="text-6xl mb-6 opacity-20 text-zinc-400 mt-2">🚗💨</div>
                <h3 className="text-2xl font-black text-zinc-900">No vehicles found</h3>
                <p className="text-zinc-400 font-medium mt-2">Try adjusting your search terms or filters.</p>
                <button 
                  onClick={() => { setSearchTerm(''); router.push('/cars') }}
                  className="mt-8 text-blue-500 font-black text-sm uppercase tracking-widest hover:underline"
                >
                    Clear All Filters
                </button>
            </motion.div>
          ) : (
            <motion.div 
               key="grid"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {sortedCars.map((car, index) => (
                <CarItem key={car.id} car={car} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function CarItem({ car, index }: { car: Car, index: number }) {
  const seats = (parseInt(car.id) % 2 === 0) ? 5 : 2;
  const fuel = (parseInt(car.id) % 2 === 0) ? "Petrol" : "Diesel";
  const transmission = (parseInt(car.id) % 3 === 0) ? "Manual" : "Automatic";

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white rounded-[32px] border border-zinc-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group relative flex flex-col"
    >
        <Link href={`/cars/${car.id}`} className="flex-1 flex flex-col">
            {!car.available && (
                <div className="absolute top-4 right-4 z-10 bg-zinc-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                    Rented
                </div>
            )}
            
            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-50/50">
                <Image
                    src={car.imageUrl || "/cars/byd.png"}
                    alt={car.name}
                    fill
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                />
            </div>

            <div className="p-8 flex-1 flex flex-col">
                <div className="mb-6">
                    <h3 className="text-2xl font-black text-[#0a111f] leading-none mb-1 truncate">{car.brand}</h3>
                    <span className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.2em]">{car.name}</span>
                </div>

                <div className="flex items-center gap-4 text-zinc-400 text-[10px] mb-8 border-b border-zinc-50 pb-6 font-black uppercase tracking-widest">
                    <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                        <Users size={14} className="text-blue-500" />
                        <span>{seats} Seats</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                        <Fuel size={14} className="text-blue-500" />
                        <span>{fuel}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-zinc-900 tracking-tighter italic">${car.pricePerDay}</span>
                        <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">/ d</span>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-zinc-50 text-zinc-900 rounded-2xl group-hover:bg-zinc-900 group-hover:text-white transition-all shadow-sm">
                        <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
                    </div>
                </div>
            </div>
        </Link>
    </motion.div>
  );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
            <SearchResults />
        </Suspense>
    );
}
