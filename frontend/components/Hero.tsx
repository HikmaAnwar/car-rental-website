"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Search, Car, Wallet } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full pt-40 px-8 flex flex-col items-center justify-center overflow-hidden bg-background">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-primary/10 rounded-full blur-[200px] -z-10" />

            {/* Text Overlay Group */}
            <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden z-0 select-none pointer-events-none">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white text-sm md:text-xl font-bold tracking-[0.4em] uppercase z-30 mb-[-20px] md:mb-[-40px] relative"
                >
                    CAR RENTAL
                </motion.h2>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[140px] md:text-[320px] font-black tracking-tighter leading-none text-white/[0.03] whitespace-nowrap mt-4 md:mt-8"
                >
                    RENTAL
                </motion.h1>
            </div>

            {/* Hero Car Image Container */}
            <div className="relative w-full max-w-[1400px] flex flex-col items-center justify-center z-20 transition-all duration-1000">
                <motion.div
                    initial={{ x: 400, opacity: 0, scale: 0.95 }}
                    animate={{ x: 0, opacity: 1, scale: 1.25 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    className="w-full relative h-[300px] md:h-[500px] mt-12 md:mt-20"
                >
                    <Image
                        src="/cars/porsche-v2.png"
                        alt="Porsche 911"
                        fill
                        className="object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
                        priority
                    />
                </motion.div>

                {/* Sub-car Previews */}
                <div className="flex gap-8 md:gap-16 mt-8">
                    <CarSmallPreview src="/cars/jetour.png" name="Jetour" delay={1.8} />
                    <CarSmallPreview src="/cars/byd.png" name="BYD" delay={2.0} />
                    <CarSmallPreview src="/cars/hyundai.png" name="Hyundai" delay={2.2} />
                </div>
            </div>

            {/* Premium Search Bar Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.5 }}
                className="relative z-30 w-full max-w-6xl mt-20 glass-dark p-2 rounded-2xl border border-white/5 shadow-2xl"
            >
                <div className="flex flex-col md:flex-row items-center justify-between divide-y md:divide-y-0 md:divide-x divide-white/10">
                    <SearchItem
                        icon={<Search className="text-primary" size={20} />}
                        title="Search"
                        subtitle="Enter Keyword..."
                    />
                    <SearchItem
                        icon={<MapPin className="text-primary" size={20} />}
                        title="Location"
                        subtitle="Enter Location..."
                    />
                    <SearchItem
                        icon={<Car className="text-primary" size={20} />}
                        title="Car Type"
                        subtitle="Select Car Type"
                    />
                    <SearchItem
                        icon={<Wallet className="text-primary" size={20} />}
                        title="Price"
                        subtitle="Enter Your Budget"
                    />

                    {/* Search Action Button */}
                    <div className="w-full md:w-auto p-4 md:p-2">
                        <button className="w-full md:w-auto bg-primary hover:bg-primary/80 text-white font-bold py-4 px-8 rounded-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(0,102,255,0.4)]">
                            Search
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

function SearchItem({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) {
    return (
        <div className="flex-1 w-full flex items-center gap-4 px-8 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer group">
            <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-white font-bold text-sm tracking-wide">{title}</span>
                <span className="text-white/40 text-xs mt-0.5">{subtitle}</span>
            </div>
        </div>
    );
}

function CarSmallPreview({ src, name, delay }: { src: string, name: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay }}
            className="relative w-24 md:w-40 aspect-video group cursor-pointer"
        >
            <Image
                src={src}
                alt={name}
                fill
                className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-125 group-hover:scale-150 translate-z-0"
            />
        </motion.div>
    );
}
