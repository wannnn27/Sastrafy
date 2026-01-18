"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { literatureInfoData } from "@/lib/data";
import {
    Sparkles,
    Wand2,
    BookOpen,
    PenTool,
    Users,
    Zap,
    ArrowRight,
    Star,
    TrendingUp,
    Award,
    ChevronRight,
    FileText,
    Search,
    MessageSquare,
} from "lucide-react";

const features = [
    {
        icon: <Wand2 className="w-6 h-6" />,
        title: "AI Generator Studio",
        description: "Hasilkan puisi, pantun, cerpen, dan karya sastra lainnya dengan AI. Sesuaikan tema, gaya, dan suasana sesuai keinginan.",
        color: "from-amber-500 to-orange-500",
        href: "/create",
    },
    {
        icon: <Search className="w-6 h-6" />,
        title: "AI Analyzer",
        description: "Dapatkan feedback mendalam tentang karya sastra Anda. Skor kualitas, kekuatan, dan saran perbaikan.",
        color: "from-violet-500 to-purple-500",
        href: "/analyze",
    },
    {
        icon: <MessageSquare className="w-6 h-6" />,
        title: "AI Writing Assistant",
        description: "Asisten AI yang selalu siap membantu Anda belajar, berkarya, dan mengembangkan kemampuan menulis.",
        color: "from-blue-500 to-cyan-500",
        href: "/create",
    },
    {
        icon: <BookOpen className="w-6 h-6" />,
        title: "Pembelajaran Interaktif",
        description: "Materi lengkap tentang sastra Indonesia dengan contoh dari penulis-penulis terkenal dan kuis interaktif.",
        color: "from-emerald-500 to-teal-500",
        href: "/learn",
    },
];

const stats = [
    { value: "6", label: "Jenis Sastra" },
    { value: "∞", label: "Karya Unik" },
    { value: "AI", label: "Powered" },
    { value: "Gratis", label: "Untuk Semua" },
];

const testimonials = [
    {
        quote: "Sastrafy membantu saya menulis puisi pertama yang bermakna. AI-nya sangat memahami nuansa sastra Indonesia!",
        author: "Sarah A.",
        role: "Mahasiswa Sastra",
        avatar: "S",
    },
    {
        quote: "Platform yang luar biasa untuk belajar dan berkarya. Fitur analisis AI-nya sangat membantu untuk meningkatkan kualitas tulisan.",
        author: "Budi K.",
        role: "Penulis Pemula",
        avatar: "B",
    },
    {
        quote: "Sebagai guru, saya sering menggunakan Sastrafy untuk memperkenalkan sastra Indonesia kepada murid-murid.",
        author: "Ibu Dewi",
        role: "Guru Bahasa Indonesia",
        avatar: "D",
    },
];

export default function HomePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <main ref={containerRef} className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50" />

                {/* Decorative Elements */}
                <motion.div
                    style={{ y, opacity }}
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                >
                    <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-amber-100/20 to-orange-100/20 rounded-full blur-3xl" />
                </motion.div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-gray-900 leading-tight mb-6">
                            Ciptakan Karya Sastra
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-500 to-red-500">
                                dengan Keajaiban AI
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                            Pelajari, ciptakan, dan analisis puisi, pantun, cerpen, serta karya sastra lainnya
                            dengan bantuan kecerdasan buatan terdepan.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="/create"
                                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                            >
                                <Wand2 className="w-5 h-5" />
                                Mulai Berkarya dengan AI
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/learn"
                                className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
                            >
                                <BookOpen className="w-5 h-5" />
                                Pelajari Sastra
                            </Link>
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-sm text-center"
                                >
                                    <div className="text-2xl md:text-3xl font-bold text-gray-900">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-500">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* AI Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                            Fitur AI untuk{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">
                                Karya Anda
                            </span>
                        </h2>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            Teknologi AI terdepan yang memahami nuansa sastra Indonesia untuk membantu Anda berkarya
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={feature.href}>
                                    <div className="group h-full bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all">
                                        <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                            {feature.title}
                                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                        </h3>
                                        <p className="text-gray-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Literature Types */}
            <section className="py-20 bg-gradient-to-b from-white to-amber-50/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                            Jenis Sastra Indonesia
                        </h2>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            Pelajari dan ciptakan berbagai bentuk sastra Indonesia,
                            dari puisi klasik hingga prosa modern
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {literatureInfoData.map((lit, index) => (
                            <motion.div
                                key={lit.type}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/learn#${lit.type}`}>
                                    <div className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all h-full">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                                                {lit.name}
                                            </h3>
                                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                            {lit.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {lit.characteristics.slice(0, 2).map((char, i) => (
                                                <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">
                                                    {char.split(' ').slice(0, 3).join(' ')}...
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                            Mudah Digunakan
                        </h2>
                        <p className="text-gray-600">
                            Tiga langkah sederhana untuk menciptakan karya sastra Anda
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {[
                            {
                                step: "1",
                                title: "Pilih Jenis Sastra",
                                description: "Tentukan bentuk sastra yang ingin Anda ciptakan: puisi, pantun, cerpen, gurindam, syair, atau prosa.",
                                color: "from-amber-500 to-orange-500",
                            },
                            {
                                step: "2",
                                title: "Masukkan Tema & Deskripsi",
                                description: "Tuliskan tema yang diinginkan dan jelaskan secara detail karya seperti apa yang Anda bayangkan.",
                                color: "from-orange-500 to-red-500",
                            },
                            {
                                step: "3",
                                title: "Hasilkan Karya dengan AI",
                                description: "AI akan menghasilkan karya sastra yang unik berdasarkan preferensi Anda. Simpan atau bagikan hasilnya.",
                                color: "from-red-500 to-pink-500",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-6 items-start"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg`}>
                                    {item.step}
                                </div>
                                <div className="flex-1 bg-gray-50 rounded-xl p-5">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                            Apa Kata Mereka
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-lg"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 italic">
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.author}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span className="text-sm font-medium text-white/90">Mulai sekarang, gratis!</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                            Siap Memulai Perjalanan{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
                                Sastra
                            </span>{" "}
                            Anda?
                        </h2>
                        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
                            Bergabunglah dengan ribuan penulis yang sudah menggunakan Sastrafy untuk menciptakan karya sastra yang menginspirasi.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/create"
                                className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                            >
                                <Wand2 className="w-5 h-5" />
                                Ciptakan Karya Pertama Anda
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/analyze"
                                className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                            >
                                <Search className="w-5 h-5" />
                                Atau Analisis Karya Anda
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
