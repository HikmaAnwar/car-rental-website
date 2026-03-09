"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    type?: "danger" | "info";
    isLoading?: boolean;
}

export default function Modal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "info",
    isLoading = false
}: ModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
                    />

                    {/* Modal Contest */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative z-10 w-full max-w-md ios-glass rounded-[40px] border border-white/10 p-8 shadow-2xl overflow-hidden"
                    >
                        {/* Decorative background glow */}
                        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] ${type === 'danger' ? 'bg-red-500/20' : 'bg-primary/20'}`} />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 rounded-2xl ${type === 'danger' ? 'bg-red-500/10 text-red-400' : 'bg-primary/10 text-primary'}`}>
                                    {type === 'danger' ? <AlertTriangle size={24} /> : <AlertTriangle size={24} />}
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-xl text-white/20 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                            <p className="text-white/60 mb-8 leading-relaxed">
                                {description}
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all disabled:opacity-50"
                                >
                                    {cancelText}
                                </button>
                                <button
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className={`flex-1 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 ${type === 'danger'
                                        ? 'bg-red-500 text-white shadow-red-500/20 hover:bg-red-600'
                                        : 'bg-primary text-white shadow-primary/20 hover:bg-primary/90'
                                        }`}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        confirmText
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
