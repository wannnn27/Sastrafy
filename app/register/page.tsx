"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, BookOpen, CheckCircle } from "lucide-react";

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
        <main className="min-h-screen bg-batik-50 font-sans text-batik-950 flex items-center justify-center p-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    {/* Left - Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden lg:block space-y-12"
                    >
                        <div>
                            <h2 className="text-5xl font-serif font-bold text-batik-950 mb-6 leading-tight">
                                Mulai Perjalanan <br />
                                <span className="text-batik-600">Literasi Anda</span>
                            </h2>
                            <p className="text-lg text-batik-700 font-light max-w-md italic">
                                "Menulis adalah bekerja untuk keabadian."
                            </p>
                        </div>

                        <div className="space-y-6">
                            {benefits.map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-6 h-6 border border-batik-200 flex items-center justify-center">
                                        <CheckCircle className="w-3.5 h-3.5 text-batik-900" />
                                    </div>
                                    <span className="text-sm font-light text-batik-800">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-12 border-t border-batik-100">
                            <div className="flex items-center gap-6">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-12 h-12 bg-batik-200 border-2 border-batik-50 flex items-center justify-center"
                                        >
                                            <User className="w-6 h-6 text-batik-400" />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="text-xl font-serif font-bold text-batik-950">800+ Pujangga</div>
                                    <div className="text-[10px] uppercase tracking-widest font-bold text-batik-400">Telah bergabung bersama kami</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="bg-white border border-batik-100 p-12">
                            <div className="text-center mb-12">
                                <div className="w-16 h-16 bg-batik-900 border border-batik-100 flex items-center justify-center mx-auto mb-6">
                                    <BookOpen className="w-8 h-8 text-batik-50" />
                                </div>
                                <h1 className="text-3xl font-serif font-bold text-batik-950 mb-2">
                                    Daftar Baru
                                </h1>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-batik-400">
                                    Masuk ke semesta Sastrafy
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-batik-900">
                                        Nama Lengkap
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-batik-300" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-8 pr-4 py-4 bg-transparent border-b border-batik-100 focus:border-batik-900 outline-none transition-all text-sm font-light italic"
                                            placeholder="Nama Lengkap Anda"
                                            required
                                        />
                                    </div>
                                </div>

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
                                            minLength={8}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Terms */}
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="mt-1 w-4 h-4 border-batik-200 text-batik-900 focus:ring-batik-900"
                                        required
                                    />
                                    <label htmlFor="terms" className="text-[10px] uppercase tracking-widest font-bold text-batik-400 leading-relaxed">
                                        Saya setuju dengan{" "}
                                        <Link href="/terms" className="text-batik-900 hover:underline">Syarat</Link> &{" "}
                                        <Link href="/privacy" className="text-batik-900 hover:underline">Kebijakan</Link> kami.
                                    </label>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-5 bg-batik-900 text-batik-50 font-bold text-xs uppercase tracking-widest hover:bg-batik-800 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                >
                                    {isLoading ? (
                                        <div className="w-4 h-4 border-2 border-batik-50 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Bergabung Sastrafy</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-12 pt-8 border-t border-batik-50 text-center">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-batik-400">
                                    Sudah punya akun?{" "}
                                    <Link
                                        href="/login"
                                        className="text-batik-900 hover:text-batik-600 transition-colors"
                                    >
                                        Masuk Di Sini
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
        </main>
    );
}
