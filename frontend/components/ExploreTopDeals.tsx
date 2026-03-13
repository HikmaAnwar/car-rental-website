"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Fuel, Settings2, ArrowUpRight } from "lucide-react";


const brands = ["Honda", "BMW", "Audi", "Ford", "Tesla", "More 20+"];

import { useNotification } from "@/context/NotificationContext";

import { Car } from "@/types";

interface ExploreTopDealsProps {
    cars: Car[];
}

import { useRouter } from "next/navigation";

export default function ExploreTopDeals({ cars }: ExploreTopDealsProps) {
    const router = useRouter();
    const { showNotification } = useNotification();

    const handleAction = (item: string) => {
        if (item.includes("More")) {
            router.push('/cars');
        } else {
            router.push(`/cars?brand=${item}`);
        }
    };

    // Use ONLY available cars for the landing deals, and limit to 4
    const displayCars = cars.filter(c => c.available).slice(0, 4);

    return (
        <section id="deals" className="py-24 px-8 bg-[#e8f7ff]">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-extrabold text-[#0a111f] mb-6"
                >
                    Explore Our Top Deals
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed"
                >
                    Get exclusive offers on high-end cars! Our incredible deals will
                    help you save a tonne of money and improve your lifestyle.
                </motion.p>
            </div>

            {/* Brand Filters */}
            <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4 mb-16">
                {brands.map((brand, index) => (
                    <motion.button
                        key={brand}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleAction(brand)}
                        className="bg-white px-8 py-3 rounded-xl shadow-sm hover:shadow-md border border-gray-100 font-bold text-[#0a111f] transition-all hover:border-primary/30 flex items-center justify-center min-w-[140px]"
                    >
                        {brand}
                    </motion.button>
                ))}
            </div>

            {/* Deal Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayCars.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-gray-400 font-medium">
                        No deals available at the moment. Check back soon!
                    </div>
                ) : (
                    displayCars.map((car, index) => (
                        <DealCard key={car.id} car={car} index={index} onAction={() => handleAction(car.name)} />
                    ))
                )}
            </div>
        </section>
    );
}

import Link from "next/link";

function DealCard({ car, index, onAction }: { car: Car; index: number; onAction: () => void }) {
    // Generate some deterministic placeholder data for fields not in backend
    const seats = (parseInt(car.id) % 2 === 0) ? 5 : 4;
    const fuel = (parseInt(car.id) % 3 === 0) ? "Diesel" : (parseInt(car.id) % 3 === 1) ? "Petrol" : "EV";
    const transmission = (parseInt(car.id) % 2 === 1) ? "Manual" : "Automatic";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[24px] border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group relative cursor-pointer"
        >
            <Link href={`/cars/${car.id}`}>
                {/* Image */}
                <div className="relative aspect-[16/10] bg-gray-50/50">
                    <Image
                        src={car.imageUrl || "/cars/hyundai.png"}
                        alt={car.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                    />
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-bold text-[#0a111f] truncate">{car.name}</h3>
                    </div>
                    <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-wider mb-4">{car.brand}</p>

                    {/* Specs */}
                    <div className="flex items-center gap-3 text-gray-500 text-[12px] mb-6 border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-1">
                            <Users size={14} className="text-blue-400" />
                            <span className="font-medium">{seats} Seats</span>
                        </div>
                        <div className="h-3 w-px bg-gray-200" />
                        <div className="flex items-center gap-1">
                            <Fuel size={14} className="text-blue-400" />
                            <span className="font-medium">{fuel}</span>
                        </div>
                        <div className="h-3 w-px bg-gray-200" />
                        <div className="flex items-center gap-1">
                            <Settings2 size={14} className="text-blue-400" />
                            <span className="font-medium">{transmission}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-[#0a111f] italic tracking-tighter">${car.pricePerDay}</span>
                            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">/ Day</span>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 bg-zinc-900 text-white rounded-xl group-hover:bg-primary transition-all shadow-md">
                            <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
