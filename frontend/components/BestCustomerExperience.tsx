"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    MapPin, ShieldCheck, PhoneCall,
    Wrench, DollarSign, Plane,
    Activity, Fuel, Share2,
    User, Mountain, Gauge, Car
} from "lucide-react";

const sideFeatures = {
    left: [
        { icon: <MapPin size={24} />, title: "Easy car rental\nin more than\n30 countries" },
        { icon: <ShieldCheck size={24} />, title: "Certified cars" },
        { icon: <PhoneCall size={24} />, title: "24/7 Customer\nsupport" },
    ],
    right: [
        { icon: <Wrench size={24} />, title: "Well maintained\n& serviced cars" },
        { icon: <DollarSign size={24} />, title: "Budget friendly\ncars" },
        { icon: <Plane size={24} />, title: "Airport pickup\n& drop service" },
    ]
};

const bottomSpecs = [
    { icon: <Activity size={24} />, title: "Engine", desc: "799cc - 7999cc" },
    { icon: <DollarSign size={24} />, title: "Prices", desc: "$30 - $150 Day" },
    { icon: <Fuel size={24} />, title: "Fuel", desc: "Petrol, Diesel & EV" },
    { icon: <Share2 size={24} />, title: "Transmission", desc: "Automatic, Manual" },
    { icon: <User size={24} />, title: "Capacity", desc: "2 - 7 Person" },
    { icon: <Mountain size={24} />, title: "Terrain", desc: "All terrain" },
    { icon: <Gauge size={24} />, title: "Kilometer", desc: "Less driven cars" },
    { icon: <Car size={24} />, title: "Car Type", desc: "Micro, Sedan, SUV" },
];

export default function BestCustomerExperience() {
    return (
        <section className="py-24 px-8 bg-background relative overflow-hidden border-t border-white/5">
            {/* Title Section */}
            <div className="max-w-7xl mx-auto text-center mb-24 relative z-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-extrabold text-white mb-4"
                >
                    Best Customer Experience
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-white/40 max-w-2xl mx-auto text-sm md:text-base"
                >
                    Discover why our customers trust us to make their car buying journey smooth and enjoyable
                </motion.p>
            </div>

            {/* Central Layout */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 mb-32 relative">

                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border-t border-b border-[#0066ff]/20 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#0066ff]/30 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#0066ff]/20 rounded-full blur-[80px] pointer-events-none" />

                {/* Left Features */}
                <div className="flex flex-col gap-16 items-center md:items-end text-center md:text-right z-10 flex-1 w-full">
                    {sideFeatures.left.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative flex flex-col items-center md:items-end gap-4 group w-full md:w-auto"
                        >
                            {/* Connector Line */}
                            <div className="hidden md:block absolute top-7 -right-[80px] w-[80px] h-px bg-[#0066ff]/40 group-hover:bg-[#0066ff] transition-colors" />
                            <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-[#0066ff] group-hover:bg-[#0066ff]/20 group-hover:scale-110 transition-all relative z-10">
                                {item.icon}
                            </div>
                            <p className="text-white/80 text-sm whitespace-pre-line leading-relaxed relative z-10">{item.title}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Center Car Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative w-full max-w-[280px] md:max-w-[320px] aspect-[1/2] z-10 shrink-0"
                >
                    <Image
                        src="/cars/best-top-down-car.png"
                        alt="Featured View"
                        fill
                        className="object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] scale-110"
                    />
                </motion.div>

                {/* Right Features */}
                <div className="flex flex-col gap-16 items-center md:items-start text-center md:text-left z-10 flex-1 w-full relative">
                    {sideFeatures.right.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative flex flex-col items-center md:items-start gap-4 group w-full md:w-auto"
                        >
                            {/* Connector Line */}
                            <div className="hidden md:block absolute top-7 -left-[80px] w-[80px] h-px bg-[#0066ff]/40 group-hover:bg-[#0066ff] transition-colors" />
                            <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-[#0066ff] group-hover:bg-[#0066ff]/20 group-hover:scale-110 transition-all relative z-10">
                                {item.icon}
                            </div>
                            <p className="text-white/80 text-sm whitespace-pre-line leading-relaxed relative z-10">{item.title}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Specs Grid */}
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 border-t border-b border-white/5 divide-x divide-white/5">
                {bottomSpecs.map((spec, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex flex-col items-center md:items-start md:flex-row gap-4 group p-8 ${i < 4 ? 'border-b border-white/5' : ''}`}
                    >
                        <div className="text-[#0066ff] mt-1 group-hover:scale-110 transition-transform bg-[#0066ff]/10 p-3 rounded-xl">
                            {spec.icon}
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-white font-bold text-sm mb-1">{spec.title}</h4>
                            <p className="text-white/40 text-xs tracking-wider">{spec.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
