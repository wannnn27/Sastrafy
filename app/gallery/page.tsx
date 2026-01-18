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
    Sparkles,
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
        <main className="min-h-screen bg-gradient-to-br from-batik-cream via-white to-batik-warm-beige">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-batik-gold/20 rounded-full mb-6">
                            <Sparkles className="w-5 h-5 text-batik-terracotta" />
                            <span className="text-sm font-medium text-batik-terracotta">
                                Galeri Karya
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                            Karya-Karya{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-batik-terracotta via-batik-gold to-primary-600">
                                Inspiratif
                            </span>
                        </h1>
                        <p className="text-lg text-primary-700 max-w-2xl mx-auto">
                            Temukan dan apresiasi karya sastra dari komunitas Sastrafy.
                            Baca, bookmark, dan bagikan karya favorit Anda.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filter */}
            <section className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-y border-primary-100 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                            <input
                                type="text"
                                placeholder="Cari karya berdasarkan judul atau konten..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary-200 focus:border-batik-terracotta focus:ring-4 focus:ring-batik-terracotta/20 transition-all bg-white"
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
                        <div className="hidden md:flex items-center gap-3">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value as LiteratureType | "all")}
                                className="px-4 py-3 rounded-xl border-2 border-primary-200 focus:border-batik-terracotta transition-colors bg-white"
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
                                className="px-4 py-3 rounded-xl border-2 border-primary-200 focus:border-batik-terracotta transition-colors bg-white"
                            >
                                <option value="newest">Terbaru</option>
                                <option value="popular">Terpopuler</option>
                                <option value="rating">Rating Tertinggi</option>
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
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-primary-600">
                            Menampilkan{" "}
                            <span className="font-semibold text-primary-800">
                                {filteredWorks.length}
                            </span>{" "}
                            karya
                        </p>
                        <div className="flex items-center space-x-2">
                            <span className="flex items-center text-sm text-primary-500">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                Diurutkan berdasarkan:{" "}
                                <span className="font-medium ml-1">
                                    {sortBy === "newest"
                                        ? "Terbaru"
                                        : sortBy === "popular"
                                            ? "Terpopuler"
                                            : "Rating"}
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* Works Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredWorks.map((work, index) => (
                            <motion.article
                                key={work.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary-100 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
                            >
                                {/* Header */}
                                <div className="p-6 pb-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-batik-terracotta to-batik-gold rounded-full flex items-center justify-center">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-primary-800">
                                                    {work.author?.username || "Anonim"}
                                                </p>
                                                <p className="text-xs text-primary-500 flex items-center">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {formatRelativeTime(work.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                        {work.isFeatured && (
                                            <span className="px-2 py-1 bg-batik-gold/20 text-batik-terracotta rounded-full text-xs font-medium">
                                                ⭐ Featured
                                            </span>
                                        )}
                                    </div>

                                    {/* Title & Type */}
                                    <Link href={`/gallery/${work.id}`}>
                                        <h3 className="font-serif font-bold text-xl text-primary-800 mb-2 group-hover:text-batik-terracotta transition-colors">
                                            {work.title}
                                        </h3>
                                    </Link>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                                            {literatureTypeNames[work.literatureType]}
                                        </span>
                                        {work.style && (
                                            <span className="px-2 py-1 bg-batik-cream text-primary-600 rounded-full text-xs">
                                                {styleNames[work.style]}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Content Preview */}
                                <div className="px-6 py-4 bg-gradient-to-br from-batik-cream/30 to-white border-y border-primary-100">
                                    <p className="font-elegant text-primary-700 leading-relaxed whitespace-pre-line line-clamp-4">
                                        {truncateText(work.content, 200)}
                                    </p>
                                </div>

                                {/* Footer Stats */}
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-sm text-primary-500">
                                        <span className="flex items-center">
                                            <Eye className="w-4 h-4 mr-1" />
                                            {work.viewCount}
                                        </span>
                                        <span className="flex items-center">
                                            <Heart className="w-4 h-4 mr-1" />
                                            {work.bookmarkCount}
                                        </span>
                                        <span className="flex items-center">
                                            <MessageCircle className="w-4 h-4 mr-1" />
                                            {work.commentCount}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 text-batik-gold fill-batik-gold" />
                                        <span className="font-medium text-primary-800">
                                            {work.averageRating.toFixed(1)}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="px-4 pb-4 flex gap-2">
                                    <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors text-sm">
                                        <Bookmark className="w-4 h-4" />
                                        <span>Simpan</span>
                                    </button>
                                    <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors text-sm">
                                        <Share2 className="w-4 h-4" />
                                        <span>Bagikan</span>
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredWorks.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-12 h-12 text-primary-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-primary-800 mb-2">
                                Tidak ada karya ditemukan
                            </h3>
                            <p className="text-primary-600 mb-6">
                                Coba ubah filter atau kata kunci pencarian Anda
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedType("all");
                                }}
                                className="px-6 py-3 bg-batik-terracotta text-white rounded-lg hover:bg-batik-terracotta/90 transition-colors"
                            >
                                Reset Filter
                            </button>
                        </motion.div>
                    )}

                    {/* Load More */}
                    {filteredWorks.length > 0 && (
                        <div className="mt-12 text-center">
                            <button className="px-8 py-3 border-2 border-batik-terracotta text-batik-terracotta rounded-lg font-medium hover:bg-batik-terracotta hover:text-white transition-all">
                                Muat Lebih Banyak
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-batik-deep-brown via-batik-terracotta to-primary-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                        Ingin Karya Anda Ditampilkan di Sini?
                    </h2>
                    <p className="text-lg text-white/90 mb-8">
                        Buat karya sastra dengan bantuan AI dan bagikan ke komunitas
                    </p>
                    <Link
                        href="/create"
                        className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-batik-terracotta rounded-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all"
                    >
                        <Sparkles className="w-5 h-5" />
                        <span>Mulai Berkarya Sekarang</span>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
