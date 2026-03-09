"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Gauge, Plane, Headphones, Car } from "lucide-react";

export default function AboutUs() {
    return (
        <section className="py-24 px-8 bg-[#fafcff]">
            <div className="max-w-7xl mx-auto text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-extrabold text-[#0a111f] mb-6"
                >
                    About Us
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed"
                >
                    Experience the new standard of quality with Oriental. Discover why we're the trusted
                    choice for Car and achieve your goals with confidence.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-8">
                {/* Top Row */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="md:col-span-8 relative h-[300px] md:h-[450px]"
                >
                    <Image
                        src="/cars/jetour.png"
                        alt="Oriental SUV"
                        fill
                        className="object-contain bg-gray-100 drop-shadow-xl"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="md:col-span-4 flex items-center relative"
                >
                    {/* The Blue Rectangle touching the right side of the image */}
                    <div className="w-12 md:w-16 h-full md:h-1/2 bg-[#008cff] absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10"></div>

                    <div className="pl-12 md:pl-16 py-8 relative z-20">
                        <h3 className="text-2xl font-bold text-[#0a111f] mb-4 tracking-wide uppercase leading-tight">
                            ORIENTAL CAR<br />RENTAL
                        </h3>
                        <a href="#" className="text-[#008cff] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                            Follow us for more <ArrowRight size={16} />
                        </a>
                    </div>
                </motion.div>

                {/* Bottom Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="md:col-span-6 flex flex-col justify-center md:pr-12 pt-8"
                >
                    <h3 className="text-3xl font-bold text-[#0a111f] mb-6">Luxury car rental ORIENTAL</h3>

                    <div className="border-l-4 border-[#008cff]/50 pl-6 mb-12">
                        <p className="text-gray-500 text-[15px] leading-relaxed">
                            At Oriental, we offer reliable premium selection of luxury vehicles.
                            Whether for business, leisure, or special occasions, our diverse
                            and exceptional service ensure a smooth, stylish ride every time.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 text-center md:text-left">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#dbeafe] flex items-center justify-center shrink-0">
                                <Gauge size={22} className="text-[#008cff]" />
                            </div>
                            <span className="text-xs md:text-sm font-semibold text-[#0a111f] leading-tight">Unlimited<br className="hidden md:block" />Kilometer</span>
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 text-center md:text-left">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#dbeafe] flex items-center justify-center shrink-0 relative">
                                <Plane size={18} className="text-[#008cff] absolute top-2.5 md:top-3 left-2.5 md:left-3" />
                                <Car size={14} className="text-[#008cff] absolute bottom-2.5 md:bottom-3 right-2.5 md:right-3" />
                            </div>
                            <span className="text-xs md:text-sm font-semibold text-[#0a111f] leading-tight">Pickup &<br className="hidden md:block" />Drop Service</span>
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 text-center md:text-left">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#dbeafe] flex items-center justify-center shrink-0">
                                <Headphones size={22} className="text-[#008cff]" />
                            </div>
                            <span className="text-xs md:text-sm font-semibold text-[#0a111f] leading-tight flex items-center">
                                24 / 7 Customer<br className="hidden md:block" />Support
                            </span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="md:col-span-6 relative h-[300px] md:h-[400px] mt-8 md:-mt-16 z-10"
                >
                    <Image
                        src="/cars/porsche-v2.png"
                        alt="Luxury Porsche"
                        fill
                        className="object-contain bg-gray-100 drop-shadow-2xl border"
                    />
                </motion.div>
            </div>
        </section>
    );
}
