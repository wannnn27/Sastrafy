"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/learn", label: "Pembelajaran" },
    { href: "/create", label: "Buat Karya" },
    { href: "/analyze", label: "Analisis AI" },
    { href: "/gallery", label: "Galeri" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-batik-50/90 backdrop-blur-sm border-b border-batik-100">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-serif font-bold text-batik-950 tracking-tight">
                            Sastrafy
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative ${isActive
                                        ? "text-batik-950"
                                        : "text-batik-400 hover:text-batik-800"
                                        }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute -bottom-1 left-0 right-0 h-px bg-batik-950"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/login"
                            className="text-[10px] uppercase tracking-widest font-bold text-batik-400 hover:text-batik-950 transition-all"
                        >
                            Masuk
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-2.5 bg-batik-950 text-batik-50 text-[10px] uppercase tracking-widest font-bold hover:bg-batik-800 transition-all border border-batik-950 shadow-lg shadow-batik-950/10"
                        >
                            Daftar
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-batik-950"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 8h16M4 16h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-batik-50 p-6">
                    <div className="space-y-6">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block text-xs uppercase tracking-widest font-bold ${isActive ? "text-batik-900" : "text-batik-400"}`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                        <div className="pt-6 border-t border-batik-50 flex flex-col gap-4">
                            <Link
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full py-3 text-center text-xs uppercase tracking-widest font-bold text-batik-900 border border-batik-900"
                            >
                                Masuk
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full py-3 text-center text-xs uppercase tracking-widest font-bold bg-batik-900 text-batik-50"
                            >
                                Daftar
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
