"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Fuel, Settings2, ArrowUpRight } from "lucide-react";



import { useNotification } from "@/context/NotificationContext";

import { Car } from "@/types";

interface MostSearchedProps {
    cars: Car[];
}

export default function MostSearched({ cars }: MostSearchedProps) {
    const { showNotification } = useNotification();

    const handleAction = (item: string) => {
        showNotification('info', 'Coming Soon', `${item} details will be available soon!`);
    };

    // Sort by latest or just take first 8 for "most searched"
    const displayCars = cars.slice(0, 8);

    return (
        <section id="most-searched" className="py-24 px-8 bg-white">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-extrabold text-[#0a111f] mb-6"
                >
                    The most searched cars
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed"
                >
                    Explore this year's hottest cars! From sports cars to family SUVs, discover the most searched models and why they are trending.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayCars.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-gray-400 font-medium italic">
                        No cars discovered yet. Stay tuned!
                    </div>
                ) : (
                    displayCars.map((car, index) => (
                        <CarCard key={car.id} car={car} index={index} onAction={() => handleAction(car.name)} />
                    ))
                )}
            </div>
        </section>
    );
}

function CarCard({ car, index, onAction }: { car: Car; index: number; onAction: () => void }) {
    // Deterministic placeholders for extra data
    const seats = (parseInt(car.id) % 2 === 0) ? 5 : 2;
    const fuel = (parseInt(car.id) % 2 === 0) ? "Petrol" : "Diesel";
    const transmission = (parseInt(car.id) % 3 === 0) ? "Manual" : "Automatic";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#f8f9fa] rounded-[32px] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group relative"
        >
            {!car.available && (
                <div className="absolute top-4 right-4 z-10 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                    Reserved
                </div>
            )}

            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-white/50">
                <Image
                    src={car.imageUrl || "/cars/byd.png"}
                    alt={car.name}
                    fill
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                />
            </div>

            {/* Content Container */}
            <div className="p-8">
                <div className="flex flex-col mb-4">
                    <h3 className="text-2xl font-black text-[#0a111f] leading-none mb-1 truncate">{car.name}</h3>
                    <span className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.2em]">{car.brand}</span>
                </div>

                {/* Car Specs */}
                <div className="flex items-center gap-4 text-zinc-500 text-xs mb-8 border-b border-gray-50 pb-6 font-bold">
                    <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                        <Users size={16} className="text-blue-500" />
                        <span>{seats}</span>
                    </div>
                    <div className="h-4 w-px bg-zinc-200" />
                    <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                        <Fuel size={16} className="text-blue-500" />
                        <span>{fuel}</span>
                    </div>
                    <div className="h-4 w-px bg-zinc-200" />
                    <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                        <Settings2 size={16} className="text-blue-500" />
                        <span>{transmission}</span>
                    </div>
                </div>

                {/* Footer / Pricing */}
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-zinc-900 tracking-tighter">${car.pricePerDay}</span>
                        <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">/ day</span>
                    </div>
                    <button
                        onClick={onAction}
                        className="flex items-center gap-2 bg-[#0a111f] text-white px-5 py-3 rounded-2xl font-black text-[10px] hover:bg-primary transition-all group/btn shadow-xl shadow-zinc-200 active:scale-95"
                    >
                        EXPLORE
                        <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
