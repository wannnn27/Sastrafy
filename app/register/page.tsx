"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, BookOpen, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Password tidak cocok");
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert("Fitur registrasi akan tersedia setelah database dikonfigurasi");
        }, 1000);
    };

    const benefits = [
        "Akses ke generator AI sastra",
        "Simpan dan kelola karya Anda",
        "Bergabung dengan komunitas",
        "Materi pembelajaran gratis",
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-batik-cream via-white to-batik-warm-beige">
            <Navbar />

            <div className="pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden lg:block"
                    >
                        <h2 className="text-4xl font-serif font-bold text-primary-800 mb-6">
                            Bergabung dengan{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-batik-terracotta to-batik-gold">
                                Sastrafy
                            </span>
                        </h2>
                        <p className="text-lg text-primary-600 mb-8">
                            Mulai perjalanan Anda dalam dunia sastra Indonesia dengan teknologi AI
                        </p>

                        <div className="space-y-4">
                            {benefits.map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center space-x-3"
                                >
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    </div>
                                    <span className="text-primary-700">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 p-6 bg-white/60 rounded-2xl border border-primary-100">
                            <div className="flex items-center space-x-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 bg-gradient-to-br from-batik-terracotta to-batik-gold rounded-full border-2 border-white"
                                        />
                                    ))}
                                </div>
                                <div>
                                    <div className="font-semibold text-primary-800">500+ Penulis</div>
                                    <div className="text-sm text-primary-500">sudah bergabung</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-primary-100">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-batik-terracotta to-batik-gold rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-2xl font-serif font-bold text-primary-800">
                                    Buat Akun Baru
                                </h1>
                                <p className="text-primary-600 mt-2">
                                    Gratis untuk memulai
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-primary-700 mb-1">
                                        Nama Lengkap
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary-200 focus:border-batik-terracotta focus:ring-4 focus:ring-batik-terracotta/20 transition-all"
                                            placeholder="Nama Anda"
                                            required
                                        />
                                    </div>
                                </div>

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
                                            className="w-full pl-12 pr-4 py-3 rounds-xl border-2 border-primary-200 focus:border-batik-terracotta focus:ring-4 focus:ring-batik-terracotta/20 transition-all"
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
                                            placeholder="Minimal 8 karakter"
                                            minLength={8}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-primary-700 mb-1">
                                        Konfirmasi Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary-200 focus:border-batik-terracotta focus:ring-4 focus:ring-batik-terracotta/20 transition-all"
                                            placeholder="Ulangi password"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Terms */}
                                <div className="flex items-start space-x-2">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="mt-1 w-4 h-4 rounded border-primary-300 text-batik-terracotta focus:ring-batik-terracotta"
                                        required
                                    />
                                    <label htmlFor="terms" className="text-sm text-primary-600">
                                        Saya setuju dengan{" "}
                                        <Link href="/terms" className="text-batik-terracotta hover:underline">
                                            Syarat & Ketentuan
                                        </Link>{" "}
                                        dan{" "}
                                        <Link href="/privacy" className="text-batik-terracotta hover:underline">
                                            Kebijakan Privasi
                                        </Link>
                                    </label>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 bg-gradient-to-r from-batik-terracotta to-primary-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Daftar Sekarang</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <p className="text-center mt-6 text-primary-600">
                                Sudah punya akun?{" "}
                                <Link
                                    href="/login"
                                    className="text-batik-terracotta font-medium hover:underline"
                                >
                                    Masuk
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
