"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
        <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-serif font-bold text-gray-900">
                            Sastrafy
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? "text-amber-700 bg-amber-50"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-3">
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            Masuk
                        </Link>
                        <Link
                            href="/register"
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            Daftar
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-4 py-4 space-y-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${isActive
                                        ? "text-amber-700 bg-amber-50"
                                        : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                        <div className="pt-4 border-t border-gray-100 space-y-2">
                            <Link
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full px-4 py-3 text-center text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                                Masuk
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full px-4 py-3 text-center bg-gray-900 text-white rounded-lg font-medium"
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
