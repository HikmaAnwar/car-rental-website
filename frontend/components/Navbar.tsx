"use client";

import Link from "next/link";
import { LogIn, UserPlus, Search, Menu, LogOut, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNotification } from "@/context/NotificationContext";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { showNotification } = useNotification();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("access_token");
            await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            setIsLoggedIn(false);
            showNotification('info', 'Logged Out', 'You have been successfully logged out.');
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed", error);
            showNotification('error', 'Logout Error', 'Could not complete logout.');
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
            {/* Logo */}
            <Link href="/" className="text-3xl font-black tracking-tighter text-white">
                Oriental
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-10 text-white/70 font-medium">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <Link href="#" className="hover:text-white transition-colors">Car</Link>
                <Link href="#" className="hover:text-white transition-colors">Job</Link>
                <Link href="#" className="hover:text-white transition-colors">Pages</Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-6 mr-6">
                    <button className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                        <Search size={20} />
                    </button>
                    {isLoggedIn && (
                        <Link href="/profile" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                            <Settings size={20} />
                        </Link>
                    )}
                </div>

                {!isLoggedIn ? (
                    <>
                        <Link
                            href="/login"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full glass border-white/5 text-white/90 hover:bg-white/10 transition-all font-medium text-sm"
                        >
                            <LogIn size={16} />
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-all font-bold text-sm shadow-xl shadow-primary/20"
                        >
                            <UserPlus size={16} />
                            Join
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full glass border-white/5 text-white/90 hover:bg-white/20 transition-all font-bold text-sm"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                )}
                <button className="md:hidden text-white ml-2">
                    <Menu size={24} />
                </button>
            </div>
        </nav>
    );
}
