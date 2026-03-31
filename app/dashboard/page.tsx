"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    User,
    BookOpen,
    Bookmark,
    Trophy,
    Settings,
    LogOut,
    PenTool,
    Eye,
    Star,
    Clock,
    TrendingUp,
    Calendar,
    ChevronRight,
    Plus,
    Edit,
    Trash2,
    MoreHorizontal,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { sampleWorks } from "@/lib/data";
import { literatureTypeNames, formatRelativeTime, truncateText } from "@/lib/utils";

type DashboardTab = "overview" | "works" | "bookmarks" | "progress" | "settings";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<DashboardTab>("overview");

    // Mock user data
    const user = {
        name: "Penulis Budaya",
        username: "penulis_budaya",
        email: "penulis@example.com",
        avatar: null,
        joinedDate: new Date("2025-06-15"),
        subscription: "free" as const,
        stats: {
            totalWorks: 12,
            totalViews: 1245,
            totalBookmarks: 89,
            totalComments: 34,
            learningProgress: 65,
            modulesCompleted: 4,
        },
    };

    // Mock user works (subset of sample works)
    const userWorks = sampleWorks.slice(0, 3);

    // Mock bookmarks
    const bookmarks = sampleWorks.slice(2, 5);

    // Mock learning progress
    const learningProgress = [
        { module: "Dasar-Dasar Puisi Indonesia", progress: 100, completed: true },
        { module: "Menguasai Seni Pantun", progress: 75, completed: false },
        { module: "Menulis Cerpen yang Memikat", progress: 30, completed: false },
        { module: "Memahami Gurindam", progress: 0, completed: false },
    ];

    const sidebarItems = [
        { id: "overview", label: "Ikhtisar", icon: TrendingUp },
        { id: "works", label: "Karya Saya", icon: PenTool },
        { id: "bookmarks", label: "Bookmark", icon: Bookmark },
        { id: "progress", label: "Progress Belajar", icon: Trophy },
        { id: "settings", label: "Pengaturan", icon: Settings },
    ];

    return (
        <main className="min-h-screen bg-batik-50">
            <Navbar />

            <div className="pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <motion.aside
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:w-72 flex-shrink-0"
                        >
                            {/* Profile Card */}
                            <div className="bg-white border border-batik-100 p-8 mb-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-batik-900 border border-batik-100 flex items-center justify-center">
                                        <User className="w-8 h-8 text-batik-50" />
                                    </div>
                                    <div>
                                        <h2 className="font-serif font-bold text-batik-950">{user.name}</h2>
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-batik-400">@{user.username}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-batik-600 mb-6">
                                    <Calendar className="w-3 h-3" />
                                    <span>Sejak {formatRelativeTime(user.joinedDate)}</span>
                                </div>
                                <div className="pt-6 border-t border-batik-50">
                                    <span className="inline-block px-3 py-1 bg-batik-900 text-batik-50 text-[10px] uppercase tracking-widest font-bold border border-batik-900">
                                        {user.subscription} Plan
                                    </span>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="bg-white border border-batik-100 overflow-hidden">
                                {sidebarItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id as DashboardTab)}
                                        className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-all ${activeTab === item.id
                                                ? "bg-batik-900 text-batik-50"
                                                : "text-batik-600 hover:bg-batik-50"
                                            }`}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        <span className="text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
                                    </button>
                                ))}
                                <button className="w-full flex items-center gap-4 px-6 py-4 text-left text-red-600 hover:bg-red-50 transition-all border-t border-batik-50">
                                    <LogOut className="w-4 h-4" />
                                    <span className="text-[10px] uppercase tracking-widest font-bold">Keluar</span>
                                </button>
                            </nav>
                        </motion.aside>

                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex-1"
                        >
                            {/* Overview Tab */}
                            {activeTab === "overview" && (
                                <div className="space-y-12">
                                    <div>
                                        <h1 className="text-4xl font-serif font-bold text-batik-950 mb-2">
                                            Rahayu, {user.name.split(" ")[0]}
                                        </h1>
                                        <p className="text-batik-600 font-light italic">Selamat datang kembali di ruang kreatif Anda.</p>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {[
                                            { label: "Karya", value: user.stats.totalWorks, icon: PenTool },
                                            { label: "Bacaan", value: user.stats.totalViews, icon: Eye },
                                            { label: "Simpanan", value: user.stats.totalBookmarks, icon: Bookmark },
                                            { label: "Kemajuan", value: `${user.stats.learningProgress}%`, icon: Trophy },
                                        ].map((stat, i) => (
                                            <div
                                                key={i}
                                                className="bg-white border border-batik-100 p-8 text-center"
                                            >
                                                <div className="text-2xl font-serif font-bold text-batik-950 mb-1">{stat.value}</div>
                                                <div className="text-[10px] uppercase tracking-widest font-bold text-batik-400">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recent Works */}
                                    <div className="bg-white border border-batik-100 p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <h2 className="text-[10px] uppercase tracking-widest font-bold text-batik-900">Karya Terbaru</h2>
                                            <Link href="/create" className="text-[10px] uppercase tracking-widest font-bold text-batik-400 hover:text-batik-900 transition-colors">
                                                + Buat Baru
                                            </Link>
                                        </div>
                                        <div className="space-y-4">
                                            {userWorks.slice(0, 3).map((work) => (
                                                <Link
                                                    key={work.id}
                                                    href={`/gallery/${work.id}`}
                                                    className="group flex items-center justify-between p-6 bg-batik-50/50 border border-transparent hover:border-batik-100 hover:bg-white transition-all"
                                                >
                                                    <div className="flex-1">
                                                        <h3 className="font-serif font-bold text-batik-950 group-hover:text-batik-600 transition-colors">{work.title}</h3>
                                                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-batik-400 mt-2">
                                                            <span>{literatureTypeNames[work.literatureType]}</span>
                                                            <span className="flex items-center gap-1">
                                                                <Eye className="w-3 h-3" />
                                                                {work.viewCount}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-batik-200 group-hover:text-batik-900 transition-colors" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Learning Progress */}
                                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-primary-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-lg font-semibold text-primary-800">Progress Belajar</h2>
                                            <Link href="/learn" className="text-batik-terracotta hover:underline text-sm">
                                                Lanjutkan Belajar →
                                            </Link>
                                        </div>
                                        <div className="space-y-4">
                                            {learningProgress.slice(0, 3).map((item, i) => (
                                                <div key={i}>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm font-medium text-primary-700">{item.module}</span>
                                                        <span className="text-sm text-primary-500">{item.progress}%</span>
                                                    </div>
                                                    <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all ${item.completed ? "bg-green-500" : "bg-batik-terracotta"
                                                                }`}
                                                            style={{ width: `${item.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Works Tab */}
                            {activeTab === "works" && (
                                <div className="space-y-12">
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-4xl font-serif font-bold text-batik-950">Karya Saya</h1>
                                        <Link
                                            href="/create"
                                            className="px-6 py-3 bg-batik-900 text-batik-50 font-bold text-xs uppercase tracking-widest hover:bg-batik-800 transition-all"
                                        >
                                            + Tulis Baru
                                        </Link>
                                    </div>

                                    <div className="grid gap-6">
                                        {userWorks.map((work) => (
                                            <div
                                                key={work.id}
                                                className="bg-white border border-batik-100 p-8 hover:border-batik-300 transition-all"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-4 mb-4">
                                                            <span className="text-[10px] uppercase tracking-widest font-bold text-batik-400">
                                                                {literatureTypeNames[work.literatureType]}
                                                            </span>
                                                            {work.isPublic ? (
                                                                <span className="text-[10px] uppercase tracking-widest font-bold text-green-600">Publik</span>
                                                            ) : (
                                                                <span className="text-[10px] uppercase tracking-widest font-bold text-batik-300">Privat</span>
                                                            )}
                                                        </div>
                                                        <h3 className="text-2xl font-serif font-bold text-batik-950 mb-4">{work.title}</h3>
                                                        <p className="text-batik-600 font-light text-sm line-clamp-2 italic mb-6">
                                                            "{truncateText(work.content, 150)}"
                                                        </p>
                                                        <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-batik-400">
                                                            <span className="flex items-center gap-1">
                                                                <Eye className="w-3 h-3" />
                                                                {work.viewCount} views
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Star className="w-3 h-3 text-batik-600" />
                                                                {work.averageRating}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {formatRelativeTime(work.createdAt)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 ml-8">
                                                        <button className="p-2 text-batik-400 hover:text-batik-900 transition-colors">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 text-batik-200 hover:text-red-600 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Bookmarks Tab */}
                            {activeTab === "bookmarks" && (
                                <div className="space-y-6">
                                    <h1 className="text-2xl font-serif font-bold text-primary-800">Bookmark Saya</h1>
                                    <div className="grid gap-4">
                                        {bookmarks.map((work) => (
                                            <div
                                                key={work.id}
                                                className="bg-white rounded-xl shadow-md p-6 border border-primary-100"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                                                            {literatureTypeNames[work.literatureType]}
                                                        </span>
                                                        <h3 className="text-lg font-semibold text-primary-800 mt-2 mb-1">
                                                            {work.title}
                                                        </h3>
                                                        <p className="text-sm text-primary-500 mb-2">
                                                            oleh @{work.author?.username}
                                                        </p>
                                                        <p className="text-sm text-primary-600 line-clamp-2">
                                                            {truncateText(work.content, 150)}
                                                        </p>
                                                    </div>
                                                    <button className="p-2 text-batik-terracotta hover:bg-batik-terracotta/10 rounded-lg transition-colors">
                                                        <Bookmark className="w-5 h-5 fill-current" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Progress Tab */}
                            {activeTab === "progress" && (
                                <div className="space-y-12">
                                    <h1 className="text-4xl font-serif font-bold text-batik-950">Pencapaian</h1>

                                    {/* Overall Progress */}
                                    <div className="bg-white border border-batik-100 p-10 flex flex-col md:flex-row items-center gap-12">
                                        <div className="relative w-32 h-32 flex-shrink-0">
                                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f1f1" strokeWidth="4" />
                                                <circle
                                                    cx="50" cy="50" r="45" fill="none" stroke="#2D241E" strokeWidth="4"
                                                    strokeDasharray={`${user.stats.learningProgress * 2.82} 282`}
                                                    transform="rotate(-90 50 50)"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-2xl font-serif font-bold text-batik-950">{user.stats.learningProgress}%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-serif font-bold text-batik-950 mb-3">Guru {user.stats.modulesCompleted >= 4 ? "Linuwih" : "Muda"}</h2>
                                            <p className="text-batik-600 font-light text-sm italic mb-4">"Ilmu itu seperti air, ia mengalir ke tempat yang lebih rendah untuk memberi kehidupan."</p>
                                            <p className="text-[10px] uppercase tracking-widest font-bold text-batik-400">{user.stats.modulesCompleted} dari 6 Modul Terselesaikan</p>
                                        </div>
                                    </div>

                                    {/* Module list */}
                                    <div className="grid gap-4">
                                        {learningProgress.map((item, i) => (
                                            <div key={i} className="bg-white border border-batik-100 p-8 flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-serif font-bold text-batik-950 text-lg mb-1">{item.module}</h3>
                                                    <div className="text-[10px] uppercase tracking-widest font-bold text-batik-400">
                                                        {item.completed ? "Selesai" : `${item.progress}% Selesai`}
                                                    </div>
                                                </div>
                                                <div className={`w-8 h-8 ${item.completed ? "text-batik-900" : "text-batik-100"}`}>
                                                    <Trophy className="w-6 h-6" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Settings Tab */}
                            {activeTab === "settings" && (
                                <div className="space-y-6">
                                    <h1 className="text-2xl font-serif font-bold text-primary-800">Pengaturan</h1>

                                    {/* Profile Settings */}
                                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-primary-100">
                                        <h2 className="text-lg font-semibold text-primary-800 mb-4">Profil</h2>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-primary-700 mb-1">
                                                    Nama Lengkap
                                                </label>
                                                <input
                                                    type="text"
                                                    defaultValue={user.name}
                                                    className="w-full px-4 py-2 rounded-lg border-2 border-primary-200 focus:border-batik-terracotta focus:ring-4 focus:ring-batik-terracotta/20 transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-primary-700 mb-1">
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    defaultValue={user.username}
                                                    className="w-full px-4 py-2 rounded-lg border-2 border-primary-200 focus:border-batik-terracotta focus:ring-4 focus:ring-batik-terracotta/20 transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-primary-700 mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    defaultValue={user.email}
                                                    className="w-full px-4 py-2 rounded-lg border-2 border-primary-200 focus:border-batik-terracotta focus:ring-4 focus:ring-batik-terracotta/20 transition-all"
                                                />
                                            </div>
                                            <button className="px-6 py-2 bg-batik-terracotta text-white rounded-lg hover:bg-batik-terracotta/90 transition-colors">
                                                Simpan Perubahan
                                            </button>
                                        </div>
                                    </div>

                                    {/* Subscription */}
                                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-primary-100">
                                        <h2 className="text-lg font-semibold text-primary-800 mb-4">Langganan</h2>
                                        <div className="p-4 bg-batik-cream/30 rounded-xl border border-batik-gold/30">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-primary-800">Paket Free</p>
                                                    <p className="text-sm text-primary-600">
                                                        Akses terbatas ke fitur generator AI
                                                    </p>
                                                </div>
                                                <button className="px-4 py-2 bg-batik-gold text-white rounded-lg hover:bg-batik-gold/90 transition-colors">
                                                    Upgrade ke Premium
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
