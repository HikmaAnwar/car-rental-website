"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info, Bell } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
}

interface NotificationContextType {
    showNotification: (type: NotificationType, title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const showNotification = useCallback((type: NotificationType, title: string, message: string) => {
        const id = Math.random().toString(36).substring(2, 9);
        setNotifications((prev) => [...prev, { id, type, title, message }]);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 5000);
    }, []);

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}

            {/* Notification Container */}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-4 w-full max-w-sm pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {notifications.map((n) => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            layout
                            className="pointer-events-auto"
                        >
                            <div className="ios-glass rounded-3xl p-5 border border-white/10 shadow-2xl relative overflow-hidden group">
                                {/* Progress Bar Background */}
                                <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full" />
                                <motion.div
                                    initial={{ width: '100%' }}
                                    animate={{ width: '0%' }}
                                    transition={{ duration: 5, ease: 'linear' }}
                                    className={`absolute bottom-0 left-0 h-1 ${n.type === 'success' ? 'bg-green-500' :
                                            n.type === 'error' ? 'bg-red-500' :
                                                n.type === 'warning' ? 'bg-orange-500' : 'bg-primary'
                                        }`}
                                />

                                <div className="flex gap-4">
                                    <div className={`p-2.5 rounded-2xl shrink-0 ${n.type === 'success' ? 'bg-green-500/10 text-green-400' :
                                            n.type === 'error' ? 'bg-red-500/10 text-red-400' :
                                                n.type === 'warning' ? 'bg-orange-500/10 text-orange-400' : 'bg-primary/10 text-primary'
                                        }`}>
                                        {n.type === 'success' && <CheckCircle2 size={24} />}
                                        {n.type === 'error' && <AlertCircle size={24} />}
                                        {n.type === 'warning' && <AlertCircle size={24} />}
                                        {n.type === 'info' && <Info size={24} />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-white text-base mb-0.5">{n.title}</h4>
                                        <p className="text-white/60 text-sm leading-relaxed">{n.message}</p>
                                    </div>

                                    <button
                                        onClick={() => removeNotification(n.id)}
                                        className="p-1 rounded-lg text-white/20 hover:text-white transition-colors self-start"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    );
};
