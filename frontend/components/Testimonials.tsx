"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Sharma",
        location: "London",
        text: "Excellent service at Oriental. The team went above and beyond to secure a great deal on my new car. I'm very satisfied and will return.",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        name: "Alex Carry",
        location: "Toronto",
        text: "The service at Oriental was exceptional from start to finish. They kept me informed and satisfied throughout. Highly recommend for anyone renting car!",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        name: "Sophia",
        location: "Germany",
        text: "I was impressed by the wide vehicle selection and the team's expertise. They made finding and buying my car smooth and enjoyable. Thank you, Oriental!",
        image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 px-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-extrabold text-[#0a111f] mb-6"
                >
                    Testimonials
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed"
                >
                    Discover the appropriate property that is most acceptable for you, ranging from houses to rental cars.
                </motion.p>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 mb-16 relative">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="text-center px-4 md:px-10 relative group"
                        >
                            {/* Vertical Line Dividers for middle item */}
                            {index === 1 && (
                                <>
                                    <div className="hidden md:block absolute left-0 bottom-0 top-36 w-px bg-gray-200"></div>
                                    <div className="hidden md:block absolute right-0 bottom-0 top-36 w-px bg-gray-200"></div>
                                </>
                            )}

                            <div className="w-28 h-28 relative mx-auto mb-8">
                                {/* Blue arc */}
                                <div className="absolute inset-[-10px] border-[3px] border-transparent border-b-[#008cff] border-l-[#008cff] rounded-full -rotate-45 transition-transform duration-700 group-hover:rotate-[315deg]"></div>
                                {/* Image */}
                                <div className="w-full h-full rounded-full overflow-hidden relative bg-gray-100 shadow-md">
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-[#0a111f] mb-1">{t.name}</h3>
                            <p className="text-gray-600 font-medium text-sm mb-6">-{t.location}</p>
                            <p className="text-gray-400 text-[15px] leading-relaxed">
                                "{t.text}"
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4">
                    <button className="w-12 h-12 rounded-full bg-[#0a111f] text-white flex items-center justify-center hover:bg-[#008cff] transition-all hover:-translate-y-1 shadow-lg hover:shadow-[#008cff]/30">
                        <ChevronLeft size={24} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-[#0a111f] text-white flex items-center justify-center hover:bg-[#008cff] transition-all hover:-translate-y-1 shadow-lg hover:shadow-[#008cff]/30">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}
