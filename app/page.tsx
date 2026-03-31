"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { literatureInfoData } from "@/lib/data";
import {
    BookOpen,
    PenTool,
    Users,
    Activity,
    ArrowRight,
    Star,
    TrendingUp,
    Award,
    ChevronRight,
    FileText,
    Search,
    MessageSquare,
    Feather,
} from "lucide-react";

const features = [
    {
        icon: <PenTool className="w-6 h-6" />,
        title: "Generator Studio",
        description: "Hasilkan puisi, pantun, cerpen, dan karya sastra lainnya dengan mudah. Sesuaikan tema, gaya, dan suasana sesuai keinginan.",
        color: "from-amber-500 to-orange-500",
        href: "/create",
    },
    {
        icon: <Search className="w-6 h-6" />,
        title: "Literature Analyzer",
        description: "Dapatkan feedback mendalam tentang karya sastra Anda. Skor kualitas, kekuatan, dan saran perbaikan.",
        color: "from-violet-500 to-purple-500",
        href: "/analyze",
    },
    {
        icon: <MessageSquare className="w-6 h-6" />,
        title: "Writing Assistant",
        description: "Asisten yang selalu siap membantu Anda belajar, berkarya, dan mengembangkan kemampuan menulis.",
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
    { value: "Sastra", label: "Pelopor" },
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
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-batik-50/50" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-batik-200 to-transparent" />

                {/* Decorative Elements */}
                <motion.div
                    style={{ y, opacity }}
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                >
                    <div className="absolute top-20 left-10 w-72 h-72 bg-batik-200/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-batik-300/20 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-batik-100/10 to-batik-200/10 rounded-full blur-3xl" />
                </motion.div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        {/* Heading */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-batik-950 leading-[1.1] mb-8">
                            Ciptakan Karya Sastra
                            <br />
                            <span className="text-batik-400">
                                Berjiwa Nusantara
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-batik-700 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                            Platform cerdas untuk mempelajari, menyusun, dan menganalisis karya sastra Indonesia
                            dengan sentuhan teknologi masa kini.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-24">
                            <Link
                                href="/create"
                                className="group px-12 py-5 bg-batik-900 text-batik-50 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-batik-800 transition-all flex items-center justify-center gap-4 shadow-xl shadow-batik-950/20"
                            >
                                <Feather className="w-4 h-4" />
                                Mulai Berkarya
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/learn"
                                className="px-12 py-5 bg-white text-batik-900 border border-batik-100 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-batik-50 transition-all flex items-center justify-center gap-4"
                            >
                                <BookOpen className="w-4 h-4" />
                                Pelajari Sastra
                            </Link>
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto border-y border-batik-100 py-12"
                        >
                            {stats.map((stat, i) => (
                                <div
                                    key={i}
                                    className="text-center"
                                >
                                    <div className="text-4xl font-serif font-bold text-batik-950 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] uppercase tracking-widest text-batik-400 font-bold">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* AI Features Section */}
            <section className="py-20 bg-batik-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-batik-950 mb-4">
                            Fitur Unggulan
                        </h2>
                        <div className="w-20 h-1 bg-batik-600 mx-auto mb-6" />
                        <p className="text-batik-600 max-w-xl mx-auto font-light">
                            Teknologi terdepan yang memahami kedalaman sastra Indonesia.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-batik-100">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={feature.href}>
                                    <div className="group h-full bg-white p-12 hover:bg-batik-50 transition-all">
                                        <div className="w-12 h-12 bg-batik-900 text-batik-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-batik-950 mb-4 flex items-center justify-between">
                                            {feature.title}
                                            <ArrowRight className="w-4 h-4 text-batik-200 group-hover:text-batik-900 transition-all" />
                                        </h3>
                                        <p className="text-batik-600 leading-loose font-light text-sm italic">
                                            "{feature.description}"
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Literature Types */}
            <section className="py-20 bg-gradient-to-b from-batik-50 to-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-batik-950 mb-4">
                            Ragam Sastra
                        </h2>
                        <div className="w-20 h-1 bg-batik-600 mx-auto mb-6" />
                        <p className="text-batik-600 max-w-xl mx-auto font-light">
                            Dari puisi klasik hingga prosa modern, pelajari keindahannya.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {literatureInfoData.map((lit, index) => (
                            <motion.div
                                key={lit.type}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/learn/${lit.type}`}>
                                    <div className="group bg-white rounded-2xl p-8 border border-batik-100 hover:border-batik-400 hover:shadow-sm transition-all h-full flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-start justify-between mb-6">
                                                <h3 className="text-2xl font-serif font-bold text-batik-900 group-hover:text-batik-600 transition-colors">
                                                    {lit.name}
                                                </h3>
                                                <div className="p-2 rounded-full bg-batik-50 text-batik-400 group-hover:bg-batik-900 group-hover:text-white transition-all">
                                                    <ArrowRight className="w-5 h-5" />
                                                </div>
                                            </div>
                                            <p className="text-sm text-batik-600 line-clamp-3 mb-8 leading-relaxed font-light">
                                                {lit.description}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {lit.characteristics.slice(0, 2).map((char, i) => (
                                                <span key={i} className="px-3 py-1 bg-batik-50 text-batik-700 text-[10px] uppercase tracking-wider font-semibold rounded-full border border-batik-100">
                                                    {char.split(' ').slice(0, 3).join(' ')}
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
            <section className="py-20 bg-white shadow-inner shadow-batik-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-batik-950 mb-4">
                            Langkah Sederhana
                        </h2>
                        <div className="w-20 h-1 bg-batik-600 mx-auto mb-6" />
                        <p className="text-batik-600 font-light">
                            Mulailah perjalanan literasi Anda hanya dalam tiga tahap mudah.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                step: "01",
                                title: "Pilih Bentuk",
                                description: "Tentukan genre yang ingin Anda eksplorasi, dari puisi klasik hingga cerpen modern.",
                            },
                            {
                                step: "02",
                                title: "Ekspresikan",
                                description: "Tuangkan tema dan perasaan Anda. AI kami akan membantu merangkai kata dengan indah.",
                            },
                            {
                                step: "03",
                                title: "Abadikan",
                                description: "Simpan karya Anda di galeri pribadi atau bagikan ke komunitas pecinta sastra.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center group"
                            >
                                <div className="text-5xl font-serif font-bold text-batik-100 group-hover:text-batik-200 transition-colors mb-6">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-batik-900 mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-batik-600 font-light leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-batik-50/30">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-batik-950 mb-4">
                            Suara Komunitas
                        </h2>
                        <div className="w-20 h-1 bg-batik-600 mx-auto" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-10 border border-batik-100 hover:border-batik-300 transition-all shadow-sm"
                            >
                                <p className="text-batik-700 mb-8 italic font-light leading-relaxed">
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-batik-900 text-batik-50 rounded-full flex items-center justify-center font-serif text-xl border-4 border-batik-50">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-batik-900">{testimonial.author}</div>
                                        <div className="text-xs uppercase tracking-widest text-batik-500 font-medium">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 bg-batik-950 relative overflow-hidden">
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">
                            Mulailah Jejak <span className="text-batik-400">Sastra</span> Anda
                        </h2>
                        <p className="text-lg text-batik-300 mb-12 max-w-2xl mx-auto font-light">
                            Bergabunglah dengan ribuan penulis untuk melestarikan keindahan bahasa Indonesia melalui inovasi teknologi.
                        </p>
                        <div className="flex justify-center">
                            <Link
                                href="/create"
                                className="group px-12 py-5 bg-batik-50 text-batik-950 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-batik-100 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-black/40"
                            >
                                <Feather className="w-4 h-4" />
                                Ciptakan Karya Pertama
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
                {/* Subtle Texture/Gradient */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-batik-600" />
            </section>

            <Footer />
        </main>
    );
}
