"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Car, Plane, Wrench, Headphones } from "lucide-react";

interface ServiceItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    index: number;
}

const services = [
    {
        icon: <Car size={28} className="text-primary" />,
        title: "Car For Rent",
        description: "Rent a car for flexible travel and the freedom to explore at your own pace."
    },
    {
        icon: <Plane size={28} className="text-primary" />,
        title: "Pickup & Drop",
        description: "Get hassle free airport pickup & drop service at your convenience."
    },
    {
        icon: <Wrench size={28} className="text-primary" />,
        title: "Maintenance",
        description: "Rent a well maintained car from us & travel at your own pace without worry."
    },
    {
        icon: <Headphones size={28} className="text-primary" />,
        title: "Support 24/7",
        description: "Get 24/7 client support for all your rental needs and inquiries."
    }
];

export default function BestService() {
    return (
        <section className="py-24 px-8 bg-background relative overflow-hidden">
            {/* Title Section */}
            <div className="max-w-7xl mx-auto text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-extrabold text-white mb-6"
                >
                    Best Service
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-white/40 max-w-3xl mx-auto text-lg leading-relaxed"
                >
                    Enjoy outstanding service by utilising our best-rated products. Take advantage of rapid,
                    courteous help and exceptional, customised solutions.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Side: Large Car Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative w-full aspect-video scale-110"
                >
                    <Image
                        src="/cars/porsche-v2.png"
                        alt="Best Service Car"
                        fill
                        className="object-contain drop-shadow-[0_20px_50px_rgba(0,102,255,0.2)]"
                    />
                </motion.div>

                {/* Right Side: Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {services.map((service, index) => (
                        <ServiceItem
                            key={service.title}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceItem({ icon, title, description, index }: ServiceItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-start gap-4 group"
        >
            {/* Icon Box */}
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                {icon}
            </div>

            {/* Content */}
            <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-[240px]">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
