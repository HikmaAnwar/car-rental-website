"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { User, Shield, ShieldCheck, ShieldAlert, Key, CheckCircle2, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import { useNotification } from "@/context/NotificationContext";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [twoFAShowVerify, setTwoFAShowVerify] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [showDisableModal, setShowDisableModal] = useState(false);
    const { showNotification } = useNotification();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                window.location.href = "/login";
                return;
            }

            // Using the frontend proxy for consistent auth and avoiding CORS
            const response = await fetch("/api/auth/profile", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                // Try refresh token if expired
                handleRefresh();
            }
        } catch (err) {
            console.error("Failed to fetch profile", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = async () => {
        try {
            const refreshToken = localStorage.getItem("refresh_token");
            const response = await fetch("/api/auth/refresh", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh_token: refreshToken })
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("access_token", data.access_token);
                fetchProfile();
            } else {
                localStorage.clear();
                window.location.href = "/login";
            }
        } catch (err) {
            localStorage.clear();
            window.location.href = "/login";
        }
    };

    const handleEnable2FA = async () => {
        setIsActionLoading(true);
        setStatusMessage({ type: "", text: "" });
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch("/api/auth/2fa/enable", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setTwoFAShowVerify(true);
                setStatusMessage({ type: "success", text: "Code sent to your email!" });
                showNotification('info', 'Verification Sent', 'Please check your email for the 6-digit code.');
            } else {
                const errMsg = data.error || "Failed to enable 2FA";
                setStatusMessage({ type: "error", text: errMsg });
                showNotification('error', 'Setup Error', errMsg);
            }
        } catch (err) {
            setStatusMessage({ type: "error", text: "Network error" });
            showNotification('error', 'Connection Error', 'Please check your network.');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleVerify2FA = async () => {
        setIsActionLoading(true);
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch("/api/auth/2fa/verify", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code: verificationCode })
            });
            const data = await response.json();
            if (response.ok) {
                setTwoFAShowVerify(false);
                setStatusMessage({ type: "success", text: "2FA enabled successfully!" });
                showNotification('success', 'Security Updated', '2FA is now enabled on your account.');
                fetchProfile();
            } else {
                const errMsg = data.error || "Invalid code";
                setStatusMessage({ type: "error", text: errMsg });
                showNotification('error', 'Verification Failed', errMsg);
            }
        } catch (err) {
            setStatusMessage({ type: "error", text: "Network error" });
            showNotification('error', 'Connection Error', 'Please check your network.');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleDisable2FA = async () => {
        setIsActionLoading(true);
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch("/api/auth/2fa/disable", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                setStatusMessage({ type: "success", text: "2FA disabled successfully" });
                showNotification('warning', 'Security Updated', '2FA has been disabled.');
                fetchProfile();
                setShowDisableModal(false);
            } else {
                setStatusMessage({ type: "error", text: "Failed to disable 2FA" });
                showNotification('error', 'Action Failed', 'Could not disable 2FA.');
            }
        } catch (err) {
            setStatusMessage({ type: "error", text: "Network error" });
            showNotification('error', 'Connection Error', 'Please check your network.');
        } finally {
            setIsActionLoading(false);
        }
    };

    if (isLoading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0a111f] text-white">
            <Navbar />

            <main className="max-w-4xl mx-auto pt-32 px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col md:flex-row gap-10 items-start">
                        {/* Profile Header */}
                        <div className="w-full md:w-1/3 space-y-6">
                            <div className="ios-glass rounded-[32px] p-8 text-center border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] -mr-16 -mt-16" />
                                <div className="relative w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-xl shadow-primary/20">
                                    <User size={48} className="text-white" />
                                </div>
                                <h2 className="text-2xl font-bold mb-1">{user?.username || "Member"}</h2>
                                <p className="text-text-muted text-sm mb-6">{user?.email}</p>
                                <button className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium">
                                    Edit Profile
                                </button>
                            </div>

                            <div className="ios-glass rounded-[32px] p-6 space-y-4 border-white/5">
                                <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider px-2">Account Details</h3>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-colors group">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-muted group-hover:text-primary transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] text-text-muted font-bold uppercase overflow-hidden text-ellipsis">Email</p>
                                            <p className="text-sm font-medium">{user?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-colors group">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-muted group-hover:text-primary transition-colors">
                                            <Phone size={18} />
                                        </div>
                                        <div className="flex-1 text-ellipsis overflow-hidden">
                                            <p className="text-[10px] text-text-muted font-bold uppercase">Phone</p>
                                            <p className="text-sm font-medium">+1 234 567 890</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Settings */}
                        <div className="w-full md:w-2/3 space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-4xl font-black tracking-tight">Settings</h1>
                                <p className="text-text-muted">Manage your security and account preferences.</p>
                            </div>

                            {statusMessage.text && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`p-4 rounded-2xl flex items-center gap-3 border ${statusMessage.type === "success"
                                        ? "bg-green-500/10 border-green-500/30 text-green-400"
                                        : "bg-red-500/10 border-red-500/30 text-red-400"
                                        }`}
                                >
                                    {statusMessage.type === "success" ? <CheckCircle2 size={20} /> : <ShieldAlert size={20} />}
                                    <p className="text-sm font-medium">{statusMessage.text}</p>
                                </motion.div>
                            )}

                            <div className="ios-glass rounded-[40px] p-8 md:p-10 border-white/5 space-y-8">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Shield className="text-primary" size={20} />
                                            <h3 className="text-xl font-bold">Two-Factor Authentication</h3>
                                        </div>
                                        <p className="text-text-muted text-sm leading-relaxed">
                                            Add an extra layer of security to your account. We'll send a code to your email if we see a login from a new device.
                                        </p>
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${user?.two_fa ? "bg-green-500/10 text-green-400 border border-green-500/30" : "bg-red-500/10 text-red-400 border border-red-500/30"
                                        }`}>
                                        {user?.two_fa ? "Enabled" : "Disabled"}
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {!twoFAShowVerify ? (
                                        <motion.div
                                            key="action"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="space-y-6 pt-6 border-t border-white/5"
                                        >
                                            <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${user?.two_fa ? "bg-red-500/10 text-red-400" : "bg-primary/10 text-primary"}`}>
                                                        {user?.two_fa ? <ShieldCheck size={24} /> : <Key size={24} />}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">{user?.two_fa ? "Disable 2FA" : "Enable 2FA via Email"}</p>
                                                        <p className="text-xs text-text-muted">Highly recommended for luxury collectors</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={user?.two_fa ? () => setShowDisableModal(true) : handleEnable2FA}
                                                    disabled={isActionLoading}
                                                    className={`p-3 rounded-xl transition-all ${user?.two_fa
                                                        ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                                                        : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                                                        }`}
                                                >
                                                    {isActionLoading ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <ChevronRight size={20} />}
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="verify"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="space-y-6 pt-6 border-t border-white/5"
                                        >
                                            <div className="bg-primary/5 border border-primary/20 rounded-[32px] p-8 text-center space-y-6">
                                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                                                    <ShieldAlert size={32} />
                                                </div>
                                                <div className="space-y-2">
                                                    <h4 className="text-lg font-bold text-ellipsis overflow-hidden">Verify Identity</h4>
                                                    <p className="text-sm text-text-muted">We've sent a 6-digit code to <span className="text-white font-medium">{user?.email}</span></p>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="000000"
                                                    maxLength={6}
                                                    className="w-full max-w-[200px] mx-auto block bg-white/5 border border-white/10 rounded-2xl py-4 text-center text-3xl font-black tracking-[0.4em] focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                                                    value={verificationCode}
                                                    onChange={(e) => setVerificationCode(e.target.value)}
                                                />
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={() => setTwoFAShowVerify(false)}
                                                        className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-sm font-bold transition-all"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleVerify2FA}
                                                        disabled={isActionLoading || verificationCode.length !== 6}
                                                        className="flex-1 py-4 rounded-2xl bg-primary hover:bg-primary/90 text-sm font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                                                    >
                                                        {isActionLoading ? "Verifying..." : "Verify & Enable"}
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="ios-glass rounded-[40px] p-8 border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Shield size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold">Password & Security</p>
                                        <p className="text-xs text-text-muted">Last changed 3 months ago</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-text-muted group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>

            <Modal
                isOpen={showDisableModal}
                onClose={() => setShowDisableModal(false)}
                onConfirm={handleDisable2FA}
                title="Disable 2FA?"
                description="Are you sure you want to disable Two-Factor Authentication? This will significantly make your account less secure."
                confirmText="Yes, Disable"
                cancelText="Keep Protected"
                type="danger"
                isLoading={isActionLoading}
            />
        </div>
    );
}
