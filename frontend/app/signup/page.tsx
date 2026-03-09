"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, UserPlus, ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useNotification } from "@/context/NotificationContext";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { showNotification } = useNotification();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                showNotification('success', 'Welcome!', 'Your account has been created successfully.');
            } else {
                const errMsg = data.error || "Something went wrong. Please try again.";
                setError(errMsg);
                showNotification('error', 'Registration Failed', errMsg);
            }
        } catch (err) {
            setError("Network error. Please check your connection.");
            showNotification('error', 'Connection Error', 'Please check your network connection.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0 opacity-60">
                    <Image src="/login-bg.png" alt="Luxury Car" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/70" />
                </div>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="ios-glass rounded-[40px] p-12 text-center max-w-md z-10"
                >
                    <div className="flex justify-center mb-6">
                        <CheckCircle2 size={64} className="text-primary animate-bounce shadow-primary/50" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Welcome Aboard!</h1>
                    <p className="text-white/60 mb-8">Your account has been created successfully. Ready to hit the road?</p>
                    <Link href="/login" className="block w-full bg-primary py-4 rounded-xl text-white font-bold hover:bg-primary/90 transition-all active:scale-95">
                        Go to login
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Cinematic Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/login-bg.png"
                    alt="Luxury Car Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/30 to-transparent" />
            </div>

            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse delay-75" />

            {/* Signup Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="z-10 w-full max-w-md px-4"
            >
                <div className="ios-glass rounded-[40px] p-8 md:p-10 relative">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-white">
                            Join the Club
                        </h1>
                        <p className="text-text-muted">Unlock exclusive access to luxury car rentals.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-2xl mb-6 text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
                            {/* Full Name Input */}
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Full name"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-hidden focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-hidden focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white outline-hidden focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="text-xs text-white/40 px-2 leading-relaxed">
                            By signing up, you agree to our <span className="text-white/60 cursor-pointer">Terms of Service</span> and <span className="text-white/60 cursor-pointer">Privacy Policy</span>.
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-black font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create account
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-10 text-white/60 text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
