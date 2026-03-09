"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Fuel, Settings2, ArrowUpRight } from "lucide-react";

interface CarDeal {
    name: string;
    image: string;
    emi: string;
    seats: number;
    fuel: string;
    transmission: string;
    price: string;
}

const deals: CarDeal[] = [
    {
        name: "Skoda Kamiq",
        image: "/cars/hyundai.png",
        emi: "1,46,275/mo",
        seats: 7,
        fuel: "Diesel",
        transmission: "Manual",
        price: "90",
    },
    {
        name: "Nissan Micra",
        image: "/cars/jetour.png",
        emi: "12,789/mo",
        seats: 4,
        fuel: "Petrol",
        transmission: "Automatic",
        price: "40",
    },
    {
        name: "Audi RS 7",
        image: "/cars/porsche-v2.png",
        emi: "1,80,425/mo",
        seats: 4,
        fuel: "Petrol",
        transmission: "Automatic",
        price: "95",
    },
    {
        name: "Tesla Model Y",
        image: "/cars/byd.png",
        emi: "1,20,225/mo",
        seats: 5,
        fuel: "EV",
        transmission: "Automatic",
        price: "120",
    },
];

const brands = ["Honda", "BMW", "Audi", "Ford", "Tesla", "More 20+"];

import { useNotification } from "@/context/NotificationContext";

export default function ExploreTopDeals() {
    const { showNotification } = useNotification();

    const handleAction = (item: string) => {
        showNotification('info', 'Coming Soon', `${item} details will be available soon!`);
    };

    return (
        <section className="py-24 px-8 bg-[#e8f7ff]">
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
                    Get exclusive offers on high-end residences and coveted cars! Our incredible deals will
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
                {deals.map((deal, index) => (
                    <DealCard key={deal.name} deal={deal} index={index} onAction={() => handleAction(deal.name)} />
                ))}
            </div>
        </section>
    );
}

function DealCard({ deal, index, onAction }: { deal: CarDeal; index: number; onAction: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[24px] border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group"
        >
            {/* Image */}
            <div className="relative aspect-[16/10] bg-gray-50/50">
                <Image
                    src={deal.image}
                    alt={deal.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                />
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-[#0a111f] mb-1">{deal.name}</h3>
                <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-4">EMI starts @ {deal.emi}</p>

                {/* Specs */}
                <div className="flex items-center gap-3 text-gray-500 text-[12px] mb-6 border-b border-gray-50 pb-4">
                    <div className="flex items-center gap-1">
                        <Users size={14} className="text-gray-400" />
                        <span>{deal.seats}</span>
                    </div>
                    <div className="h-3 w-px bg-gray-200" />
                    <div className="flex items-center gap-1">
                        <Fuel size={14} className="text-gray-400" />
                        <span>{deal.fuel}</span>
                    </div>
                    <div className="h-3 w-px bg-gray-200" />
                    <div className="flex items-center gap-1">
                        <Users size={14} className="text-gray-400" />
                        <span>{deal.transmission}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-[#0a111f]">${deal.price}</span>
                        <span className="text-gray-400 text-xs">/ Day</span>
                    </div>
                    <button
                        onClick={onAction}
                        className="flex items-center gap-1 text-[#0a111f] font-bold text-xs hover:text-primary transition-colors group/btn"
                    >
                        Show More
                        <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
