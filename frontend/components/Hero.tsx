"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Play } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full pt-40 px-8 flex flex-col items-center justify-center overflow-hidden bg-background">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-primary/10 rounded-full blur-[200px] -z-10" />

            {/* Location Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-8 glass px-6 py-2 rounded-full border-white/5 shadow-xl"
            >
                <MapPin size={16} className="text-primary" />
                <span className="text-white/80 font-medium text-sm">Explore Premium Cars</span>
            </motion.div>

            {/* Main Heading Text */}
            <div className="text-center relative mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[120px] md:text-[180px] font-black tracking-tighter leading-[0.8] text-white/5 select-none pointer-events-none absolute left-1/2 -translate-x-1/2 top-10 whitespace-nowrap"
                >
                    RENTAL
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white text-7xl md:text-8xl font-black relative tracking-tight"
                >
                    CAR RENTAL
                </motion.h2>
            </div>

            {/* Hero Car Image Container */}
            <div className="relative w-full max-w-6xl aspect-[21/9] flex items-center justify-center -mt-10">
                <motion.div
                    initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                    className="w-full relative h-[400px] md:h-[600px]"
                >
                    <Image
                        src="/cars/porsche-v2.png"
                        alt="Porsche 911"
                        fill
                        className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
                        priority
                    />
                </motion.div>

                {/* Play Button Overlay */}
                <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="absolute bottom-20 right-1/4 w-20 h-20 bg-primary/20 backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-white group cursor-pointer"
                >
                    <Play fill="currentColor" size={24} className="group-hover:scale-125 transition-transform" />
                </motion.button>
            </div>

            {/* Stats/Action Bar */}
            <div className="flex flex-col md:flex-row gap-10 mt-10 w-full max-w-6xl justify-between items-center text-white/60 font-medium">
                <div className="flex gap-12">
                    <div>
                        <p className="text-white text-3xl font-bold">12k+</p>
                        <span className="text-sm">Premium Cars</span>
                    </div>
                    <div>
                        <p className="text-white text-3xl font-bold">24/7</p>
                        <span className="text-sm">Support Service</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button className="text-white font-bold flex items-center gap-2 hover:text-primary transition-colors group">
                        Browse Collection
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <div className="h-px w-20 bg-white/10" />
                    <p className="text-sm">Starting at $299/day</p>
                </div>
            </div>
        </section>
    );
}
