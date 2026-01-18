"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, BookOpen } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => {
            setIsLoading(false);
            alert("Fitur login akan tersedia setelah database dikonfigurasi");
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-batik-cream via-white to-batik-warm-beige">
            <Navbar />

            <div className="pt-24 pb-16 flex items-center justify-center min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md px-4"
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-primary-100">
                        {/* Logo */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-batik-terracotta to-batik-gold rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-serif font-bold text-primary-800">
                                Selamat Datang Kembali
                            </h1>
                            <p className="text-primary-600 mt-2">
                                Masuk ke akun Sastrafy Anda
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-1">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary-200 focus:border-batik-terracotta focus:ring-4 focus:ring-batik-terracotta/20 transition-all"
                                        placeholder="email@contoh.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary-200 focus:border-batik-terracotta focus:ring-4 focus:ring-batik-terracotta/20 transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="text-right">
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-batik-terracotta hover:underline"
                                >
                                    Lupa password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-batik-terracotta to-primary-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Masuk</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-1 h-px bg-primary-200"></div>
                            <span className="px-4 text-sm text-primary-500">atau</span>
                            <div className="flex-1 h-px bg-primary-200"></div>
                        </div>

                        {/* Social Login */}
                        <button className="w-full py-3 border-2 border-primary-200 rounded-xl font-medium text-primary-700 hover:bg-primary-50 transition-colors flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            <span>Masuk dengan Google</span>
                        </button>

                        {/* Register Link */}
                        <p className="text-center mt-6 text-primary-600">
                            Belum punya akun?{" "}
                            <Link
                                href="/register"
                                className="text-batik-terracotta font-medium hover:underline"
                            >
                                Daftar sekarang
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
