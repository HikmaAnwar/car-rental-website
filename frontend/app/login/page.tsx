"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { useNotification } from "@/context/NotificationContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFACode, setTwoFACode] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (show2FA) {
        // Handle 2FA verification
        const response = await fetch("/api/auth/login/2fa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: twoFACode }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          showNotification('success', 'Logged In', 'Welcome back to Oriental Cars!');
          window.location.href = "/"; // Redirect to home
        } else {
          const errMsg = data.error || "Invalid 2FA code.";
          setError(errMsg);
          showNotification('error', 'Login Failed', errMsg);
        }
      } else {
        // Normal login attempt
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          if (data.message === "2FA_REQUIRED") {
            setShow2FA(true);
            setIsLoading(false);
            showNotification('info', 'Security Check', 'Please enter the code sent to your email.');
            return;
          }
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          showNotification('success', 'Logged In', 'Welcome back to Oriental Cars!');
          window.location.href = "/";
        } else {
          const errMsg = data.error || "Invalid email or password.";
          setError(errMsg);
          showNotification('error', 'Login Failed', errMsg);
        }
      }
    } catch (err) {
      setError("Network error. Please try again.");
      showNotification('error', 'Connection Error', 'Please check your network connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login-bg.png"
          alt="Luxury Car Background"
          fill
          className="object-cover opacity-60 scale-105"
          priority
        />
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Floating Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse delay-75" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 w-full max-w-md px-4"
      >
        <div className="ios-glass rounded-[40px] p-8 md:p-10 relative overflow-hidden group">
          {/* Subtle light sweep */}
          <div className="absolute -inset-x-full top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
              {show2FA ? "Security Check" : "Welcome back"}
            </h1>
            <p className="text-text-muted">
              {show2FA
                ? "Enter the 6-digit code sent to your email."
                : "Enter your details to drive your dream car."}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-2xl mb-6 text-sm text-center font-medium"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {!show2FA ? (
                <>
                  {/* Email Input */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary transition-colors">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-hidden focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-white/20"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary transition-colors">
                      <Lock size={20} />
                    </div>
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-hidden focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-white/20"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              ) : (
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Verification code"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-hidden focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-white/20 text-center text-xl tracking-[0.5em] font-bold"
                    value={twoFACode}
                    onChange={(e) => setTwoFACode(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>
              )}
            </div>

            {!show2FA && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 accent-primary" />
                  <span className="text-white/60">Remember me</span>
                </label>
                <button type="button" className="text-primary hover:underline transition-all">Forgot password?</button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group relative overflow-hidden active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {show2FA ? "Verify" : "Sign in"}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {show2FA && (
              <button
                type="button"
                onClick={() => setShow2FA(false)}
                className="w-full text-white/40 hover:text-white text-sm transition-all text-center"
              >
                Back to login
              </button>
            )}
          </form>

          <p className="text-center mt-8 text-white/60 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-white font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
