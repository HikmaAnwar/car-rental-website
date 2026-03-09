import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0a111f] pt-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-8">
                {/* Top Section - Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/5">
                    {/* Call */}
                    <div className="flex items-center gap-6 justify-center md:justify-start">
                        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                            <Phone size={24} className="text-white/80" />
                        </div>
                        <div>
                            <h4 className="text-[#008cff] font-bold tracking-wider text-sm mb-1 uppercase">Call</h4>
                            <p className="text-gray-400 text-sm">(702) 555-0122</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-6 justify-center md:justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                            <Mail size={24} className="text-white/80" />
                        </div>
                        <div>
                            <h4 className="text-[#008cff] font-bold tracking-wider text-sm mb-1 uppercase">Email</h4>
                            <p className="text-gray-400 text-sm">general.info@gmail.com</p>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-6 justify-center md:justify-end">
                        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                            <MapPin size={24} className="text-white/80" />
                        </div>
                        <div>
                            <h4 className="text-[#008cff] font-bold tracking-wider text-sm mb-1 uppercase">Location</h4>
                            <p className="text-gray-400 text-sm">Ahmedabad, India</p>
                        </div>
                    </div>
                </div>

                {/* Middle Section - Links & Brand */}
                <div className="py-16 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
                    {/* Brand Info */}
                    <div className="flex flex-col pr-0 lg:pr-12 lg:border-r border-white/5">
                        <div className="mb-8">
                            <h2 className="text-white text-5xl font-bold tracking-widest relative inline-block">
                                ORIENTAL
                                <div className="absolute -bottom-2 left-0 w-8 h-[3px] bg-[#008cff]"></div>
                            </h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-[15px] mb-10 max-w-sm">
                            Find your ideal car with personalized support, together.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-[#008cff] hover:border-[#008cff] hover:text-white transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-[#008cff] hover:border-[#008cff] hover:text-white transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-[#008cff] hover:border-[#008cff] hover:text-white transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-sm relative inline-block">
                                Location
                                <div className="absolute -bottom-2 left-0 w-6 h-[2px] bg-[#008cff]/50"></div>
                            </h4>
                            <ul className="space-y-4">
                                {['India', 'London', 'Prague', 'Canada', 'Singapore'].map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-gray-400 hover:text-white text-[15px] transition-colors">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-sm relative inline-block">
                                Quick Links
                                <div className="absolute -bottom-2 left-0 w-6 h-[2px] bg-[#008cff]/50"></div>
                            </h4>
                            <ul className="space-y-4">
                                {['Saved Rides', 'Profile', 'Post Cars', 'Privacy'].map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-gray-400 hover:text-white text-[15px] transition-colors">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-sm relative inline-block">
                                Resources
                                <div className="absolute -bottom-2 left-0 w-6 h-[2px] bg-[#008cff]/50"></div>
                            </h4>
                            <ul className="space-y-4">
                                {['Portfolio', 'Blog', 'Pricing', 'Register', 'Review'].map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-gray-400 hover:text-white text-[15px] transition-colors">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-sm relative inline-block">
                                About
                                <div className="absolute -bottom-2 left-0 w-6 h-[2px] bg-[#008cff]/50"></div>
                            </h4>
                            <ul className="space-y-4">
                                {['About Us', 'Service', 'FAQs', 'Teams', 'Contact Us'].map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-gray-400 hover:text-white text-[15px] transition-colors">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-white/5 py-8 text-center bg-[#0a111f]">
                    <p className="text-gray-400 text-sm">@ 2025 All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
}
