"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
    ArrowLeft,
    Bookmark,
    Share2,
    Heart,
    MessageCircle,
    Star,
    Copy,
    Download,
    User,
    Calendar,
    Eye,
    CheckCircle,
    Send,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { sampleWorks } from "@/lib/data";
import { literatureTypeNames, styleNames, moodNames, formatRelativeTime } from "@/lib/utils";

export default function WorkDetailPage() {
    const params = useParams();
    const workId = params.id as string;

    const work = sampleWorks.find((w) => w.id === workId);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState("");
    const [copied, setCopied] = useState(false);

    if (!work) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-batik-cream via-white to-batik-warm-beige">
                <Navbar />
                <div className="pt-32 text-center">
                    <h1 className="text-2xl font-serif font-bold text-primary-800">
                        Karya tidak ditemukan
                    </h1>
                    <Link href="/gallery" className="text-batik-terracotta hover:underline mt-4 inline-block">
                        Kembali ke Galeri
                    </Link>
                </div>
            </main>
        );
    }

    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(`${work.title}\n\n${work.content}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    const downloadContent = () => {
        const content = `${work.title}\noleh @${work.author?.username}\n\n${work.content}\n\n---\nDari Sastrafy - Platform Sastra Indonesia dengan AI`;
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${work.title.replace(/\s+/g, "-").toLowerCase()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: work.title,
                    text: work.excerpt || work.content.substring(0, 100),
                    url: window.location.href,
                });
            } catch (err) {
                console.error("Share failed:", err);
            }
        } else {
            copyContent();
        }
    };

    // Related works
    const relatedWorks = sampleWorks
        .filter((w) => w.id !== workId && w.literatureType === work.literatureType)
        .slice(0, 3);

    return (
        <main className="min-h-screen bg-gradient-to-br from-batik-cream via-white to-batik-warm-beige">
            <Navbar />

            <div className="pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link
                            href="/gallery"
                            className="inline-flex items-center space-x-2 text-primary-600 hover:text-batik-terracotta transition-colors mb-6"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Kembali ke Galeri</span>
                        </Link>
                    </motion.div>

                    {/* Main Content */}
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl border border-primary-100 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-primary-100">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-batik-terracotta/10 text-batik-terracotta rounded-full text-sm font-medium">
                                    {literatureTypeNames[work.literatureType]}
                                </span>
                                {work.style && (
                                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                                        {styleNames[work.style]}
                                    </span>
                                )}
                                {work.mood && (
                                    <span className="px-3 py-1 bg-batik-gold/20 text-batik-terracotta rounded-full text-sm">
                                        {moodNames[work.mood]}
                                    </span>
                                )}
                                {work.isFeatured && (
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                                        ⭐ Featured
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-4">
                                {work.title}
                            </h1>

                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-batik-terracotta to-batik-gold rounded-full flex items-center justify-center">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-primary-800">
                                            @{work.author?.username || "Anonim"}
                                        </p>
                                        <p className="text-sm text-primary-500 flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {formatRelativeTime(work.createdAt)}
                                        </p>
                                    </div>
                                </div>

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
                                        <Star className="w-4 h-4 mr-1 text-batik-gold fill-batik-gold" />
                                        {work.averageRating.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8">
                            <div className="bg-gradient-to-br from-batik-cream/50 to-white rounded-xl p-6 md:p-8 border border-batik-gold/30 mb-6">
                                <div className="font-elegant text-xl leading-relaxed text-primary-800 whitespace-pre-wrap">
                                    {work.content}
                                </div>
                            </div>

                            {/* Tags */}
                            {work.tags && work.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {work.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${isBookmarked
                                            ? "bg-batik-terracotta text-white border-batik-terracotta"
                                            : "border-primary-200 text-primary-700 hover:border-batik-terracotta"
                                        }`}
                                >
                                    <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
                                    <span>{isBookmarked ? "Tersimpan" : "Simpan"}</span>
                                </button>

                                <button
                                    onClick={copyContent}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-primary-200 text-primary-700 hover:border-batik-terracotta transition-all"
                                >
                                    {copied ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Copy className="w-5 h-5" />
                                    )}
                                    <span>{copied ? "Tersalin!" : "Salin"}</span>
                                </button>

                                <button
                                    onClick={downloadContent}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-primary-200 text-primary-700 hover:border-batik-terracotta transition-all"
                                >
                                    <Download className="w-5 h-5" />
                                    <span>Unduh</span>
                                </button>

                                <button
                                    onClick={handleShare}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-primary-200 text-primary-700 hover:border-batik-terracotta transition-all"
                                >
                                    <Share2 className="w-5 h-5" />
                                    <span>Bagikan</span>
                                </button>
                            </div>
                        </div>

                        {/* Rating Section */}
                        <div className="p-6 md:p-8 bg-primary-50 border-t border-primary-100">
                            <h3 className="font-semibold text-primary-800 mb-4">
                                Beri Rating untuk Karya Ini
                            </h3>
                            <div className="flex items-center space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setUserRating(star)}
                                        className="p-1 transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${star <= userRating
                                                    ? "text-batik-gold fill-batik-gold"
                                                    : "text-primary-300"
                                                }`}
                                        />
                                    </button>
                                ))}
                                {userRating > 0 && (
                                    <span className="ml-2 text-primary-600">
                                        Anda memberikan {userRating} bintang
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="p-6 md:p-8 border-t border-primary-100">
                            <h3 className="font-semibold text-primary-800 mb-4 flex items-center space-x-2">
                                <MessageCircle className="w-5 h-5" />
                                <span>Komentar ({work.commentCount})</span>
                            </h3>

                            {/* Comment Form */}
                            <div className="mb-6">
                                <div className="flex space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary-300 to-primary-500 rounded-full flex-shrink-0" />
                                    <div className="flex-1">
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Tulis komentar Anda..."
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-primary-200 focus:border-batik-terracotta focus:ring-4 focus:ring-batik-terracotta/20 transition-all resize-none"
                                        />
                                        <button
                                            disabled={!comment.trim()}
                                            className="mt-2 flex items-center space-x-2 px-4 py-2 bg-batik-terracotta text-white rounded-lg hover:bg-batik-terracotta/90 transition-colors disabled:opacity-50"
                                        >
                                            <Send className="w-4 h-4" />
                                            <span>Kirim</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Sample Comments */}
                            <div className="space-y-4">
                                {[
                                    { author: "penyair_muda", content: "Karya yang sangat menyentuh! Diksi yang digunakan sangat indah.", time: "2 jam yang lalu" },
                                    { author: "budayawan_nusantara", content: "Struktur puisinya bagus, mengalir dengan natural. Terus berkarya!", time: "5 jam yang lalu" },
                                ].map((c, i) => (
                                    <div key={i} className="flex space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-batik-terracotta to-batik-gold rounded-full flex-shrink-0" />
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium text-primary-800">@{c.author}</span>
                                                <span className="text-xs text-primary-500">{c.time}</span>
                                            </div>
                                            <p className="text-primary-700 mt-1">{c.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.article>

                    {/* Related Works */}
                    {relatedWorks.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-12"
                        >
                            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">
                                Karya Serupa
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedWorks.map((rw) => (
                                    <Link
                                        key={rw.id}
                                        href={`/gallery/${rw.id}`}
                                        className="bg-white rounded-xl shadow-md p-4 border border-primary-100 hover:shadow-lg transition-shadow"
                                    >
                                        <h3 className="font-serif font-semibold text-primary-800 mb-2 line-clamp-1">
                                            {rw.title}
                                        </h3>
                                        <p className="text-sm text-primary-600 line-clamp-2 mb-3">
                                            {rw.content.substring(0, 80)}...
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-primary-500">
                                            <span>@{rw.author?.username}</span>
                                            <span className="flex items-center">
                                                <Star className="w-3 h-3 mr-1 text-batik-gold fill-batik-gold" />
                                                {rw.averageRating.toFixed(1)}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
