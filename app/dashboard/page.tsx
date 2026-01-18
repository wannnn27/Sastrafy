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
        <main className="min-h-screen bg-gradient-to-br from-batik-cream via-white to-batik-warm-beige">
            <Navbar />

            <div className="pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <motion.aside
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:w-64 flex-shrink-0"
                        >
                            {/* Profile Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-primary-100 mb-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-batik-terracotta to-batik-gold rounded-full flex items-center justify-center">
                                        <User className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-primary-800">{user.name}</h2>
                                        <p className="text-sm text-primary-500">@{user.username}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-primary-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>Bergabung {formatRelativeTime(user.joinedDate)}</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-primary-100">
                                    <span className="inline-block px-3 py-1 bg-batik-gold/20 text-batik-terracotta rounded-full text-xs font-medium capitalize">
                                        {user.subscription} Plan
                                    </span>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="bg-white rounded-2xl shadow-lg border border-primary-100 overflow-hidden">
                                {sidebarItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id as DashboardTab)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${activeTab === item.id
                                                ? "bg-batik-terracotta/10 text-batik-terracotta border-l-4 border-batik-terracotta"
                                                : "text-primary-700 hover:bg-primary-50"
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                ))}
                                <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors border-t border-primary-100">
                                    <LogOut className="w-5 h-5" />
                                    <span className="font-medium">Keluar</span>
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
                                <div className="space-y-6">
                                    <h1 className="text-2xl font-serif font-bold text-primary-800">
                                        Selamat Datang, {user.name}! 👋
                                    </h1>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { label: "Total Karya", value: user.stats.totalWorks, icon: PenTool, color: "from-blue-500 to-blue-600" },
                                            { label: "Total Dilihat", value: user.stats.totalViews, icon: Eye, color: "from-green-500 to-green-600" },
                                            { label: "Bookmark", value: user.stats.totalBookmarks, icon: Bookmark, color: "from-purple-500 to-purple-600" },
                                            { label: "Progress", value: `${user.stats.learningProgress}%`, icon: Trophy, color: "from-batik-terracotta to-batik-gold" },
                                        ].map((stat, i) => (
                                            <div
                                                key={i}
                                                className="bg-white rounded-xl shadow-md p-4 border border-primary-100"
                                            >
                                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                                                    <stat.icon className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="text-2xl font-bold text-primary-800">{stat.value}</div>
                                                <div className="text-sm text-primary-600">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recent Works */}
                                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-primary-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-lg font-semibold text-primary-800">Karya Terbaru</h2>
                                            <Link href="/create" className="flex items-center space-x-1 text-batik-terracotta hover:underline text-sm">
                                                <Plus className="w-4 h-4" />
                                                <span>Buat Baru</span>
                                            </Link>
                                        </div>
                                        <div className="space-y-4">
                                            {userWorks.slice(0, 3).map((work) => (
                                                <div
                                                    key={work.id}
                                                    className="flex items-center justify-between p-4 bg-primary-50 rounded-xl"
                                                >
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-primary-800">{work.title}</h3>
                                                        <div className="flex items-center space-x-4 text-sm text-primary-500 mt-1">
                                                            <span>{literatureTypeNames[work.literatureType]}</span>
                                                            <span className="flex items-center">
                                                                <Eye className="w-3 h-3 mr-1" />
                                                                {work.viewCount}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Star className="w-3 h-3 mr-1" />
                                                                {work.averageRating}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-primary-400" />
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => setActiveTab("works")}
                                            className="w-full mt-4 text-center text-batik-terracotta hover:underline text-sm"
                                        >
                                            Lihat Semua Karya →
                                        </button>
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
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-2xl font-serif font-bold text-primary-800">Karya Saya</h1>
                                        <Link
                                            href="/create"
                                            className="flex items-center space-x-2 px-4 py-2 bg-batik-terracotta text-white rounded-lg hover:bg-batik-terracotta/90 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>Buat Karya Baru</span>
                                        </Link>
                                    </div>

                                    <div className="grid gap-4">
                                        {userWorks.map((work) => (
                                            <div
                                                key={work.id}
                                                className="bg-white rounded-xl shadow-md p-6 border border-primary-100"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                                                                {literatureTypeNames[work.literatureType]}
                                                            </span>
                                                            {work.isPublic ? (
                                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                                                    Publik
                                                                </span>
                                                            ) : (
                                                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                                                    Privat
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h3 className="text-lg font-semibold text-primary-800 mb-2">
                                                            {work.title}
                                                        </h3>
                                                        <p className="text-sm text-primary-600 line-clamp-2">
                                                            {truncateText(work.content, 150)}
                                                        </p>
                                                        <div className="flex items-center space-x-4 mt-3 text-sm text-primary-500">
                                                            <span className="flex items-center">
                                                                <Eye className="w-4 h-4 mr-1" />
                                                                {work.viewCount} views
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Bookmark className="w-4 h-4 mr-1" />
                                                                {work.bookmarkCount}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Star className="w-4 h-4 mr-1 text-batik-gold fill-batik-gold" />
                                                                {work.averageRating}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Clock className="w-4 h-4 mr-1" />
                                                                {formatRelativeTime(work.createdAt)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2 ml-4">
                                                        <button className="p-2 hover:bg-primary-50 rounded-lg transition-colors">
                                                            <Edit className="w-4 h-4 text-primary-600" />
                                                        </button>
                                                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                                            <Trash2 className="w-4 h-4 text-red-500" />
                                                        </button>
                                                        <button className="p-2 hover:bg-primary-50 rounded-lg transition-colors">
                                                            <MoreHorizontal className="w-4 h-4 text-primary-600" />
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
                                <div className="space-y-6">
                                    <h1 className="text-2xl font-serif font-bold text-primary-800">Progress Belajar</h1>

                                    {/* Overall Progress */}
                                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-primary-100">
                                        <h2 className="text-lg font-semibold text-primary-800 mb-4">Progress Keseluruhan</h2>
                                        <div className="flex items-center space-x-4">
                                            <div className="relative w-24 h-24">
                                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="40"
                                                        fill="none"
                                                        stroke="#E8D5C4"
                                                        strokeWidth="10"
                                                    />
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="40"
                                                        fill="none"
                                                        stroke="#C15C37"
                                                        strokeWidth="10"
                                                        strokeLinecap="round"
                                                        strokeDasharray={`${user.stats.learningProgress * 2.51} 251`}
                                                        transform="rotate(-90 50 50)"
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-2xl font-bold text-primary-800">
                                                        {user.stats.learningProgress}%
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-lg font-medium text-primary-800">
                                                    {user.stats.modulesCompleted} dari 6 modul selesai
                                                </p>
                                                <p className="text-sm text-primary-600">
                                                    Lanjutkan belajar untuk membuka lebih banyak fitur
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Module Progress */}
                                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-primary-100">
                                        <h2 className="text-lg font-semibold text-primary-800 mb-4">Modul Pembelajaran</h2>
                                        <div className="space-y-4">
                                            {learningProgress.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className={`p-4 rounded-xl border ${item.completed
                                                            ? "bg-green-50 border-green-200"
                                                            : item.progress > 0
                                                                ? "bg-batik-cream/30 border-batik-terracotta/20"
                                                                : "bg-gray-50 border-gray-200"
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center space-x-3">
                                                            {item.completed ? (
                                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                                    <Trophy className="w-4 h-4 text-white" />
                                                                </div>
                                                            ) : (
                                                                <div className="w-8 h-8 bg-primary-200 rounded-full flex items-center justify-center">
                                                                    <BookOpen className="w-4 h-4 text-primary-600" />
                                                                </div>
                                                            )}
                                                            <span className="font-medium text-primary-800">{item.module}</span>
                                                        </div>
                                                        <span className={`text-sm font-medium ${item.completed ? "text-green-600" : "text-primary-600"}`}>
                                                            {item.progress}%
                                                        </span>
                                                    </div>
                                                    <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all ${item.completed ? "bg-green-500" : "bg-batik-terracotta"
                                                                }`}
                                                            style={{ width: `${item.progress}%` }}
                                                        />
                                                    </div>
                                                    {!item.completed && item.progress > 0 && (
                                                        <Link
                                                            href="/learn"
                                                            className="mt-3 inline-block text-sm text-batik-terracotta hover:underline"
                                                        >
                                                            Lanjutkan Belajar →
                                                        </Link>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
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
