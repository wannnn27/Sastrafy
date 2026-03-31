"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, ArrowRight, BookOpen } from "lucide-react";

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
        <main className="min-h-screen bg-batik-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                    <div className="bg-white border border-batik-100 p-12">
                        {/* Logo */}
                        <div className="text-center mb-12">
                            <div className="w-16 h-16 bg-batik-900 border border-batik-100 flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="w-8 h-8 text-batik-50" />
                            </div>
                            <h1 className="text-3xl font-serif font-bold text-batik-950 mb-2">
                                Rahayu
                            </h1>
                            <p className="text-xs uppercase tracking-widest font-bold text-batik-400">
                                Selamat datang kembali di Sastrafy
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-batik-900">
                                    Alamat Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-batik-300" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-8 pr-4 py-4 bg-transparent border-b border-batik-100 focus:border-batik-900 outline-none transition-all text-sm font-light italic"
                                        placeholder="nama@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-batik-900">
                                    Kata Sandi
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-batik-300" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-8 pr-4 py-4 bg-transparent border-b border-batik-100 focus:border-batik-900 outline-none transition-all text-sm font-light italic"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-5 bg-batik-900 text-batik-50 font-bold text-xs uppercase tracking-widest hover:bg-batik-800 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-batik-50 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Masuk Sastrafy</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Register Link */}
                        <div className="mt-12 pt-8 border-t border-batik-50 text-center">
                            <p className="text-[10px] uppercase tracking-widest font-bold text-batik-400">
                                Belum bergabung?{" "}
                                <Link
                                    href="/register"
                                    className="text-batik-900 hover:text-batik-600 transition-colors"
                                >
                                    Daftar Sini
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
        </main>
    );
}
