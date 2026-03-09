"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react";

const steps = [
    {
        icon: <MapPin size={32} className="text-primary" />,
        title: "Choose Location",
        description: "Choose your pickup and drop-off points to find rental options.",
        bgPrimary: false,
    },
    {
        icon: <Calendar size={32} className="text-primary" />,
        title: "Pick Date",
        description: "Set your desired rental period to see available vehicles.",
        bgPrimary: false,
    },
    {
        icon: <CheckCircle2 size={32} className="text-white" fill="#0066ff" />,
        title: "Book Car",
        description: "Browse and pick the perfect car for your journey.",
        bgPrimary: true, // Indicates the final step has a different icon style
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 px-8 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-extrabold text-[#0a111f] mb-6"
                >
                    How It Works
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed"
                >
                    Understanding how our system operates is crucial for maximizing the benefits
                    you receive. Here's why:
                </motion.p>
            </div>

            <div className="max-w-5xl mx-auto relative mt-16">

                {/* Dashed Connecting Lines (Visible only on desktop) */}
                <div className="hidden md:block absolute top-[28px] md:top-[38px] left-[20%] w-[25%] h-12 z-0 text-[#0066ff]/40">
                    <svg className="w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none">
                        <path d="M0,24 Q50,0 100,24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                    </svg>
                </div>
                <div className="hidden md:block absolute top-[28px] md:top-[38px] left-[55%] w-[25%] h-12 z-0 text-[#0066ff]/40">
                    <svg className="w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none">
                        <path d="M0,0 Q50,24 100,0" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                    </svg>
                </div>

                {/* Steps Array */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-4 relative z-10">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="flex flex-col items-center text-center max-w-[280px]"
                        >
                            <div className="w-24 h-24 bg-[#ebf5ff] rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                                {step.icon}
                            </div>
                            <p className="text-gray-500 leading-relaxed text-[15px]">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
