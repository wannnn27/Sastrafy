"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Search,
    Filter,
    Heart,
    MessageCircle,
    Eye,
    Star,
    Bookmark,
    Share2,
    User,
    Calendar,
    TrendingUp,
    Clock,
    Feather,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { sampleWorks } from "@/lib/data";
import { LiteratureType } from "@/types";
import {
    literatureTypeNames,
    styleNames,
    formatRelativeTime,
    truncateText,
} from "@/lib/utils";

type SortOption = "newest" | "popular" | "rating";

export default function GalleryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<LiteratureType | "all">("all");
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [showFilters, setShowFilters] = useState(false);

    const filteredWorks = sampleWorks
        .filter((work) => {
            if (selectedType !== "all" && work.literatureType !== selectedType) {
                return false;
            }
            if (
                searchQuery &&
                !work.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !work.content.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                return false;
            }
            return true;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "popular":
                    return b.viewCount - a.viewCount;
                case "rating":
                    return b.averageRating - a.averageRating;
                case "newest":
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });

    return (
        <main className="min-h-screen bg-batik-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-batik-950 mb-6">
                            Ruang <span className="text-batik-600">Apresiasi</span>
                        </h1>
                        <p className="text-lg text-batik-700 max-w-2xl mx-auto font-light">
                            Jelajahi keindahan kata dari para pujangga modern Sastrafy.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filter */}
            <section className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-y border-batik-100 py-6">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-batik-400" />
                            <input
                                type="text"
                                placeholder="Cari karya..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-batik-200 rounded-xl focus:border-batik-600 focus:ring-0 transition-all placeholder:text-batik-300 text-batik-900"
                            />
                        </div>

                        {/* Filter Toggle (mobile) */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center justify-center space-x-2 px-4 py-3 border-2 border-primary-200 rounded-xl hover:bg-primary-50 transition-colors"
                        >
                            <Filter className="w-5 h-5" />
                            <span>Filter</span>
                        </button>

                        {/* Desktop Filters */}
                        <div className="hidden md:flex items-center gap-4">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value as LiteratureType | "all")}
                                className="px-4 py-3 bg-white border border-batik-200 rounded-xl focus:border-batik-600 transition-all text-sm text-batik-700"
                            >
                                <option value="all">Semua Genre</option>
                                {(
                                    ["puisi", "pantun", "cerpen", "gurindam", "syair", "prosa"] as LiteratureType[]
                                ).map((type) => (
                                    <option key={type} value={type}>
                                        {literatureTypeNames[type]}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="px-4 py-3 bg-white border border-batik-200 rounded-xl focus:border-batik-600 transition-all text-sm text-batik-700"
                            >
                                <option value="newest">Terbaru</option>
                                <option value="popular">Terpopuler</option>
                            </select>
                        </div>
                    </div>

                    {/* Mobile Filters */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="md:hidden mt-4 space-y-3"
                        >
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value as LiteratureType | "all")}
                                className="w-full px-4 py-3 rounded-xl border-2 border-primary-200 bg-white"
                            >
                                <option value="all">Semua Jenis</option>
                                {(
                                    ["puisi", "pantun", "cerpen", "gurindam", "syair", "prosa"] as LiteratureType[]
                                ).map((type) => (
                                    <option key={type} value={type}>
                                        {literatureTypeNames[type]}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-primary-200 bg-white"
                            >
                                <option value="newest">Terbaru</option>
                                <option value="popular">Terpopuler</option>
                                <option value="rating">Rating Tertinggi</option>
                            </select>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Works Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results Info */}
                    <div className="flex items-center justify-between mb-12">
                        <p className="text-batik-500 text-sm font-medium uppercase tracking-widest">
                            {filteredWorks.length} Karya Ditemukan
                        </p>
                    </div>

                    {/* Works Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredWorks.map((work, index) => (
                            <motion.article
                                key={work.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white border border-batik-100 hover:border-batik-300 transition-all duration-300 group flex flex-col"
                            >
                                {/* Header */}
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 bg-batik-900 text-batik-50 rounded-full flex items-center justify-center font-serif text-sm">
                                            {work.author?.username?.[0] || "A"}
                                        </div>
                                        <div className="text-[10px] uppercase tracking-widest font-bold text-batik-400">
                                            {work.author?.username || "Anonim"} • {formatRelativeTime(work.createdAt)}
                                        </div>
                                    </div>

                                    <Link href={`/gallery/${work.id}`}>
                                        <h3 className="font-serif font-bold text-2xl text-batik-950 mb-4 group-hover:text-batik-600 transition-colors line-clamp-2">
                                            {work.title}
                                        </h3>
                                    </Link>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-batik-50 text-batik-700 text-[10px] uppercase tracking-wider font-bold border border-batik-100">
                                            {literatureTypeNames[work.literatureType]}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Preview */}
                                <div className="px-8 py-8 bg-batik-50/30 border-y border-batik-50 italic font-serif text-batik-800 leading-relaxed text-sm">
                                    "{truncateText(work.content, 150)}"
                                </div>

                                {/* Footer Stats */}
                                <div className="p-8 mt-auto flex items-center justify-between">
                                    <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-batik-400">
                                        <span className="flex items-center gap-1.5">
                                            <Eye className="w-4 h-4" />
                                            {work.viewCount}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Heart className="w-4 h-4" />
                                            {work.bookmarkCount}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-batik-400 fill-batik-400" />
                                        <span className="text-xs font-bold text-batik-900">{work.averageRating.toFixed(1)}</span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredWorks.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24"
                        >
                            <div className="w-20 h-20 bg-batik-50 rounded-full flex items-center justify-center mx-auto mb-8 text-batik-200">
                                <Search className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-batik-900 mb-2">
                                Tidak ada karya ditemukan
                            </h3>
                            <p className="text-batik-600 font-light mb-10">
                                Coba ubah filter atau kata kunci pencarian Anda.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedType("all");
                                }}
                                className="px-8 py-4 bg-batik-900 text-batik-50 rounded-xl hover:bg-batik-800 transition-all font-bold"
                            >
                                Reset Filter
                            </button>
                        </motion.div>
                    )}

                    {/* Load More */}
                    {filteredWorks.length > 0 && (
                        <div className="mt-20 text-center">
                            <button className="px-10 py-4 border border-batik-200 text-batik-900 font-bold hover:bg-batik-50 transition-all">
                                Muat Lebih Banyak
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-32 bg-batik-950">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
                        Karya Anda Layak <span className="text-batik-400">Dikenal</span>
                    </h2>
                    <p className="text-lg text-batik-300 mb-12 font-light">
                        Jadilah bagian dari generasi baru pujangga Indonesia.
                    </p>
                    <Link
                        href="/create"
                        className="inline-flex items-center space-x-3 px-10 py-5 bg-batik-50 text-batik-950 rounded-xl font-bold hover:bg-batik-100 transition-all shadow-xl"
                    >
                        <Feather className="w-5 h-5" />
                        <span>Mulai Menulis</span>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
