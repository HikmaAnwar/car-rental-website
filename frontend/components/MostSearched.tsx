"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Fuel, Settings2, ArrowUpRight } from "lucide-react";

interface Car {
    name: string;
    image: string;
    emi: string;
    seats: number;
    fuel: string;
    transmission: string;
    price: string;
}

const cars: Car[] = [
    {
        name: "Toyota Corolla",
        image: "/cars/byd.png", // Using existing as placeholder
        emi: "1,20,225/mo",
        seats: 5,
        fuel: "Petrol",
        transmission: "Automatic",
        price: "55",
    },
    {
        name: "Ford Mustang",
        image: "/cars/porsche-v2.png",
        emi: "1,54,646/mo",
        seats: 2,
        fuel: "Petrol",
        transmission: "Automatic",
        price: "180",
    },
    {
        name: "Kia Sportage",
        image: "/cars/jetour.png",
        emi: "1,20,225/mo",
        seats: 5,
        fuel: "Petrol",
        transmission: "Manual",
        price: "60",
    },
    {
        name: "Mercedes EQA",
        image: "/cars/byd.png",
        emi: "1,23,43/mo",
        seats: 5,
        fuel: "EV",
        transmission: "Automatic",
        price: "90",
    },
    {
        name: "Skoda Kamiq",
        image: "/cars/hyundai.png",
        emi: "1,15,225/mo",
        seats: 5,
        fuel: "Petrol",
        transmission: "Automatic",
        price: "45",
    },
    {
        name: "Nissan Micra",
        image: "/cars/jetour.png",
        emi: "90,225/mo",
        seats: 5,
        fuel: "Petrol",
        transmission: "Manual",
        price: "35",
    },
    {
        name: "Audi RS 7",
        image: "/cars/porsche-v2.png",
        emi: "2,20,225/mo",
        seats: 4,
        fuel: "Petrol",
        transmission: "Automatic",
        price: "250",
    },
    {
        name: "Tesla Model Y",
        image: "/cars/byd.png",
        emi: "1,40,225/mo",
        seats: 5,
        fuel: "EV",
        transmission: "Automatic",
        price: "120",
    },
];

import { useNotification } from "@/context/NotificationContext";

export default function MostSearched() {
    const { showNotification } = useNotification();

    const handleAction = (item: string) => {
        showNotification('info', 'Coming Soon', `${item} details will be available soon!`);
    };

    return (
        <section className="py-24 px-8 bg-white">
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
                    Explore this year's hottest cars! From sports car to family SUVs, discover the most searched models and why they are trending.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {cars.map((car, index) => (
                    <CarCard key={car.name} car={car} index={index} onAction={() => handleAction(car.name)} />
                ))}
            </div>
        </section>
    );
}

function CarCard({ car, index, onAction }: { car: Car; index: number; onAction: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#d5d2d2] rounded-[24px] border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 group"
        >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-transparent">
                <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                />
            </div>

            {/* Content Container */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-[#0a111f] mb-1">{car.name}</h3>
                <p className="text-gray-400 text-xs mb-4 uppercase tracking-wider">EMI starts @ {car.emi}</p>

                {/* Car Specs */}
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-6 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-1.5">
                        <Users size={16} className="text-gray-400" />
                        <span>{car.seats}</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200" />
                    <div className="flex items-center gap-1.5">
                        <Fuel size={16} className="text-gray-400" />
                        <span>{car.fuel}</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200" />
                    <div className="flex items-center gap-1.5">
                        <Settings2 size={16} className="text-gray-400" />
                        <span>{car.transmission}</span>
                    </div>
                </div>

                {/* Footer / Pricing */}
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-[#0a111f]">${car.price}</span>
                        <span className="text-gray-400 text-sm">/ Day</span>
                    </div>
                    <button
                        onClick={onAction}
                        className="flex items-center gap-1 text-[#0a111f] font-bold text-sm hover:text-primary transition-colors group/btn"
                    >
                        Show More
                        <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
