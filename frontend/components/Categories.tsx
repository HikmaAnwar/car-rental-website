"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
    { name: "Compact", image: "/cars/jetour.png" }, // Reusing existing local assets
    { name: "Sedan", image: "/cars/mercedes.png" },
    { name: "SUV", image: "/cars/porsche-v2.png" },
    { name: "Pickup Truck", image: "/cars/mercedes.png" }, // Placeholder for truck
    { name: "Luxury", image: "/cars/porsche-v2.png" }, // Placeholder for luxury
];

import { useNotification } from "@/context/NotificationContext";

export default function Categories() {
    const { showNotification } = useNotification();

    const handleCategoryClick = (name: string) => {
        showNotification('info', 'Filter Active', `Showing all ${name} vehicles.`);
    };

    return (
        <section className="py-24 px-8 bg-[#e8f7ff]">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-extrabold text-[#0a111f] mb-6"
                >
                    Categories
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed"
                >
                    Explore our range of compact cars, luxury sedans, rugged SUVs, & reliable trucks to find your ideal vehicle today.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap justify-center gap-8">
                {categories.map((category, index) => (
                    <CategoryCard
                        key={category.name}
                        name={category.name}
                        image={category.image}
                        index={index}
                        onClick={() => handleCategoryClick(category.name)}
                    />
                ))}
            </div>
        </section>
    );
}

function CategoryCard({ name, image, index, onClick }: { name: string, image: string, index: number, onClick: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            onClick={onClick}
            className="w-[140px] md:w-[170px] bg-white rounded-[20px] border border-gray-100 p-5 flex flex-col items-center shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
        >
            <div className="relative w-full aspect-[4/3] mb-4">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <h3 className="text-[#0a111f] font-bold text-base md:text-lg group-hover:text-primary transition-colors">
                {name}
            </h3>
        </motion.div>
    );
}
